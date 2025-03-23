import ProductSync from "./product-sync";
import { writeFileSync } from "fs";
import * as path from "path";

interface ScrapedProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  sku?: string;
}

// Log file setup
const logPath = path.resolve(__dirname, "../src/data/firecrawl-log.txt");
let logContent = "Firecrawl Log\n===========\n\n";

function log(message: string) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  logContent += entry;
  console.log(message);
}

async function crawlCategory(
  url: string,
  categoryName: string
): Promise<ScrapedProduct[]> {
  log(`Crawling category: ${categoryName} (${url})`);

  try {
    const result = await useMcpTool({
      serverName: "github.com/mendableai/firecrawl-mcp-server",
      toolName: "firecrawl_scrape",
      arguments: {
        url,
        formats: ["extract"],
        onlyMainContent: true,
        waitFor: 2000,
        extract: {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              price: { type: "string" },
              description: { type: "string" },
              sku: { type: "string" },
              imageUrl: { type: "string" },
              category: { type: "string" },
            },
          },
          systemPrompt:
            "Extract product information from this page. For each product, get the name, price, description, SKU if available, and image URL. Ensure prices are in the format of just numbers without currency symbols.",
          prompt:
            "Please extract all products from this category page, capturing their names, prices, descriptions, SKUs, and image URLs. If no SKU is available, use the product name converted to lowercase with spaces replaced by dashes as the ID.",
        },
      },
    });

    if (typeof result === "string") {
      return [JSON.parse(result)];
    }

    return Array.isArray(result) ? result : [result];
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error scraping ${url}: ${errorMessage}`);
    return [];
  }
}

async function main() {
  const categories = [
    {
      name: "food-products",
      url: "https://sowkhyaproducts.com/product_category/food-products/",
    },
    {
      name: "herbal-products",
      url: "https://sowkhyaproducts.com/product_category/herbal-products/",
    },
    {
      name: "natural-cosmetics",
      url: "https://sowkhyaproducts.com/product_category/natural-cosmetics/",
    },
    {
      name: "natural-hair-care",
      url: "https://sowkhyaproducts.com/product_category/natural-hair-care/",
    },
  ];

  log("Starting product sync process...");
  const productSync = new ProductSync();

  for (const category of categories) {
    try {
      log(`Processing category: ${category.name}`);

      // Attempt to crawl category
      const scrapedProducts = await crawlCategory(category.url, category.name);

      if (scrapedProducts.length > 0) {
        // Transform scraped products to match our Product interface
        const formattedProducts = scrapedProducts.map((scraped) => ({
          id: scraped.id,
          name: scraped.name,
          slug: scraped.id.toLowerCase().replace(/\s+/g, "-"),
          category: category.name,
          image: scraped.imageUrl,
          price: scraped.price,
          currency: "Rs",
          description: scraped.description,
          benefits: "",
          ingredients: "",
          whatsappLink: `https://wa.me/919846981231?text=Hi,%20i%20would%20like%20to%20order%20${encodeURIComponent(
            scraped.name
          )}`,
          status: "active" as const,
        }));

        // Process the products through our sync system
        productSync.processScrapedData(category.name, formattedProducts);
      } else {
        log(`No products found for category: ${category.name}`);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      log(`Error processing category ${category.name}: ${errorMessage}`);
    }
  }

  // Update products.json and generate report
  try {
    productSync.updateProductsJson();
    log("Successfully updated products.json and generated update report");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error updating products: ${errorMessage}`);
  }

  // Write log file
  writeFileSync(logPath, logContent);
}

main().catch((error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error("Fatal error:", errorMessage);
  process.exit(1);
});
