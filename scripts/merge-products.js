"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
// Paths to JSON files
var files = [
    "../src/data/hair-care.json",
    "../src/data/cosmetics.json",
    "../src/data/food.json",
];
try {
    // Read and merge all products
    var allProducts_1 = [];
    var seenIds_1 = new Set();
    files.forEach(function (file) {
        var filePath = path.resolve(__dirname, file);
        var fileContent = (0, fs_1.readFileSync)(filePath, "utf-8");
        var data = JSON.parse(fileContent);
        data.products.forEach(function (product) {
            if (!seenIds_1.has(product.id)) {
                allProducts_1.push(product);
                seenIds_1.add(product.id);
            }
        });
    });
    // Sort products by category
    allProducts_1.sort(function (a, b) { return a.category.localeCompare(b.category); });
    // Create the final products object
    var finalData = {
        products: allProducts_1,
    };
    // Write the merged data to products.json
    var outputPath = path.resolve(__dirname, "../src/data/products.json");
    (0, fs_1.writeFileSync)(outputPath, JSON.stringify(finalData, null, 4));
    console.log("Successfully merged product files into products.json");
    console.log("Total products: ".concat(allProducts_1.length));
}
catch (error) {
    console.error("Error merging product files:", error);
    process.exit(1);
}
