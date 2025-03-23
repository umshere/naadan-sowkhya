import { readFileSync, writeFileSync } from "fs";
import * as path from "path";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  currency: string;
  description: string;
  benefits: string;
  ingredients: string;
  whatsappLink: string;
}

interface ProductData {
  products: Product[];
}

// Paths to JSON files
const files = [
  "../src/data/hair-care.json",
  "../src/data/cosmetics.json",
  "../src/data/food.json",
];

try {
  // Read and merge all products
  const allProducts: Product[] = [];
  const seenIds = new Set<string>();

  files.forEach((file) => {
    const filePath = path.resolve(__dirname, file);
    const fileContent = readFileSync(filePath, "utf-8");
    const data: ProductData = JSON.parse(fileContent);

    data.products.forEach((product) => {
      if (!seenIds.has(product.id)) {
        allProducts.push(product);
        seenIds.add(product.id);
      }
    });
  });

  // Sort products by category
  allProducts.sort((a, b) => a.category.localeCompare(b.category));

  // Create the final products object
  const finalData: ProductData = {
    products: allProducts,
  };

  // Write the merged data to products.json
  const outputPath = path.resolve(__dirname, "../src/data/products.json");
  writeFileSync(outputPath, JSON.stringify(finalData, null, 4));

  console.log("Successfully merged product files into products.json");
  console.log(`Total products: ${allProducts.length}`);
} catch (error) {
  console.error("Error merging product files:", error);
  process.exit(1);
}
