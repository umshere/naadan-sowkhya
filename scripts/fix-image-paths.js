const fs = require("fs");
const path = require("path");

// Load the products data
const productsFilePath = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "products.json"
);
const productsData = require(productsFilePath);

// Directory where product images should be
const imagesDir = path.join(__dirname, "..", "public", "images", "products");

// Check if the directory exists
if (!fs.existsSync(imagesDir)) {
  console.log("Creating products image directory:", imagesDir);
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Fix image paths
let fixedCount = 0;
productsData.products = productsData.products.map((product) => {
  if (!product.image) {
    console.log(`Product "${product.name}" has no image defined`);
    product.image = "/images/placeholder.jpg";
    fixedCount++;
    return product;
  }

  // If the path is already structured correctly, leave it alone
  if (
    product.image.startsWith("/images/products/") ||
    product.image.startsWith("http")
  ) {
    return product;
  }

  // Fix the path to use the correct structure
  console.log(`Fixing path for "${product.name}": ${product.image}`);
  product.image = `/images/products/${product.image}`;
  fixedCount++;

  return product;
});

// Save the updated products data
if (fixedCount > 0) {
  fs.writeFileSync(productsFilePath, JSON.stringify(productsData, null, 2));
  console.log(`Fixed ${fixedCount} image paths in products.json`);
} else {
  console.log("No image paths needed fixing");
}

console.log("Done!");
