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
  status?: "active" | "discontinued";
}

interface ProductData {
  products: Product[];
}

interface ProductUpdate {
  type: "new" | "updated" | "removed";
  product: Product;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}

class ProductSync {
  private existingProducts: Map<string, Product>;
  private updates: ProductUpdate[] = [];
  private readonly dataDir: string;

  constructor() {
    this.dataDir = path.resolve(__dirname, "../src/data");
    this.existingProducts = new Map();
    this.loadExistingProducts();
  }

  private loadExistingProducts() {
    const productsPath = path.join(this.dataDir, "products.json");
    try {
      const data: ProductData = JSON.parse(readFileSync(productsPath, "utf-8"));
      data.products.forEach((product) => {
        this.existingProducts.set(product.id, product);
      });
      console.log(`Loaded ${this.existingProducts.size} existing products`);
    } catch (error) {
      console.error("Error loading existing products:", error);
      process.exit(1);
    }
  }

  private compareProducts(
    existing: Product,
    scraped: Product
  ): {
    hasChanges: boolean;
    changes: { field: string; oldValue: any; newValue: any }[];
  } {
    const changes = [];
    const fields: (keyof Product)[] = [
      "name",
      "price",
      "description",
      "image",
      "category",
      "benefits",
      "ingredients",
    ];

    for (const field of fields) {
      if (existing[field] !== scraped[field]) {
        changes.push({
          field,
          oldValue: existing[field],
          newValue: scraped[field],
        });
      }
    }

    return {
      hasChanges: changes.length > 0,
      changes,
    };
  }

  public processScrapedData(
    categoryName: string,
    scrapedProducts: Product[]
  ): void {
    // Track which existing products we've seen
    const seenProducts = new Set<string>();

    // Process each scraped product
    scrapedProducts.forEach((scraped) => {
      seenProducts.add(scraped.id);
      const existing = this.existingProducts.get(scraped.id);

      if (!existing) {
        // New product
        this.updates.push({
          type: "new",
          product: scraped,
        });
      } else {
        // Check for updates
        const { hasChanges, changes } = this.compareProducts(existing, scraped);
        if (hasChanges) {
          this.updates.push({
            type: "updated",
            product: scraped,
            changes,
          });
        }
      }
    });

    // Check for removed products in this category
    this.existingProducts.forEach((product) => {
      if (product.category === categoryName && !seenProducts.has(product.id)) {
        this.updates.push({
          type: "removed",
          product,
        });
      }
    });
  }

  public generateUpdateReport(): string {
    let report = "Product Update Report\n";
    report += "===================\n\n";

    // New Products
    const newProducts = this.updates.filter((u) => u.type === "new");
    report += `New Products (${newProducts.length}):\n`;
    report += "------------------------\n";
    newProducts.forEach((update) => {
      report += `- ${update.product.name} (${update.product.category})\n`;
    });
    report += "\n";

    // Updated Products
    const updatedProducts = this.updates.filter((u) => u.type === "updated");
    report += `Updated Products (${updatedProducts.length}):\n`;
    report += "------------------------\n";
    updatedProducts.forEach((update) => {
      report += `- ${update.product.name}:\n`;
      update.changes?.forEach((change) => {
        report += `  * ${change.field}: "${change.oldValue}" → "${change.newValue}"\n`;
      });
    });
    report += "\n";

    // Removed Products
    const removedProducts = this.updates.filter((u) => u.type === "removed");
    report += `Potentially Removed Products (${removedProducts.length}):\n`;
    report += "------------------------\n";
    removedProducts.forEach((update) => {
      report += `- ${update.product.name} (${update.product.category})\n`;
    });

    return report;
  }

  public updateProductsJson(): void {
    // Start with existing products
    const finalProducts = new Map(this.existingProducts);

    // Apply updates
    this.updates.forEach((update) => {
      switch (update.type) {
        case "new":
          finalProducts.set(update.product.id, update.product);
          break;
        case "updated":
          finalProducts.set(update.product.id, update.product);
          break;
        case "removed":
          // Keep removed products for now, but mark them
          const product = finalProducts.get(update.product.id);
          if (product) {
            product.status = "discontinued";
          }
          break;
      }
    });

    // Convert to array and sort by category
    const sortedProducts = Array.from(finalProducts.values()).sort((a, b) =>
      a.category.localeCompare(b.category)
    );

    // Write updated products.json
    const productsPath = path.join(this.dataDir, "products.json");
    writeFileSync(
      productsPath,
      JSON.stringify({ products: sortedProducts }, null, 4)
    );

    // Write update report
    const reportPath = path.join(this.dataDir, "product-update-report.txt");
    writeFileSync(reportPath, this.generateUpdateReport());
  }
}

// Export the class for use in other scripts
export default ProductSync;
