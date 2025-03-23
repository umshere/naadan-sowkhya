"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = require("path");
var ProductSync = /** @class */ (function () {
    function ProductSync() {
        this.updates = [];
        this.dataDir = path.resolve(__dirname, "../src/data");
        this.existingProducts = new Map();
        this.loadExistingProducts();
    }
    ProductSync.prototype.loadExistingProducts = function () {
        var _this = this;
        var productsPath = path.join(this.dataDir, "products.json");
        try {
            var data = JSON.parse((0, fs_1.readFileSync)(productsPath, "utf-8"));
            data.products.forEach(function (product) {
                _this.existingProducts.set(product.id, product);
            });
            console.log("Loaded ".concat(this.existingProducts.size, " existing products"));
        }
        catch (error) {
            console.error("Error loading existing products:", error);
            process.exit(1);
        }
    };
    ProductSync.prototype.compareProducts = function (existing, scraped) {
        var changes = [];
        var fields = [
            "name",
            "price",
            "description",
            "image",
            "category",
            "benefits",
            "ingredients",
        ];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            if (existing[field] !== scraped[field]) {
                changes.push({
                    field: field,
                    oldValue: existing[field],
                    newValue: scraped[field],
                });
            }
        }
        return {
            hasChanges: changes.length > 0,
            changes: changes,
        };
    };
    ProductSync.prototype.processScrapedData = function (categoryName, scrapedProducts) {
        var _this = this;
        // Track which existing products we've seen
        var seenProducts = new Set();
        // Process each scraped product
        scrapedProducts.forEach(function (scraped) {
            seenProducts.add(scraped.id);
            var existing = _this.existingProducts.get(scraped.id);
            if (!existing) {
                // New product
                _this.updates.push({
                    type: "new",
                    product: scraped,
                });
            }
            else {
                // Check for updates
                var _a = _this.compareProducts(existing, scraped), hasChanges = _a.hasChanges, changes = _a.changes;
                if (hasChanges) {
                    _this.updates.push({
                        type: "updated",
                        product: scraped,
                        changes: changes,
                    });
                }
            }
        });
        // Check for removed products in this category
        this.existingProducts.forEach(function (product) {
            if (product.category === categoryName && !seenProducts.has(product.id)) {
                _this.updates.push({
                    type: "removed",
                    product: product,
                });
            }
        });
    };
    ProductSync.prototype.generateUpdateReport = function () {
        var report = "Product Update Report\n";
        report += "===================\n\n";
        // New Products
        var newProducts = this.updates.filter(function (u) { return u.type === "new"; });
        report += "New Products (".concat(newProducts.length, "):\n");
        report += "------------------------\n";
        newProducts.forEach(function (update) {
            report += "- ".concat(update.product.name, " (").concat(update.product.category, ")\n");
        });
        report += "\n";
        // Updated Products
        var updatedProducts = this.updates.filter(function (u) { return u.type === "updated"; });
        report += "Updated Products (".concat(updatedProducts.length, "):\n");
        report += "------------------------\n";
        updatedProducts.forEach(function (update) {
            var _a;
            report += "- ".concat(update.product.name, ":\n");
            (_a = update.changes) === null || _a === void 0 ? void 0 : _a.forEach(function (change) {
                report += "  * ".concat(change.field, ": \"").concat(change.oldValue, "\" \u2192 \"").concat(change.newValue, "\"\n");
            });
        });
        report += "\n";
        // Removed Products
        var removedProducts = this.updates.filter(function (u) { return u.type === "removed"; });
        report += "Potentially Removed Products (".concat(removedProducts.length, "):\n");
        report += "------------------------\n";
        removedProducts.forEach(function (update) {
            report += "- ".concat(update.product.name, " (").concat(update.product.category, ")\n");
        });
        return report;
    };
    ProductSync.prototype.updateProductsJson = function () {
        // Start with existing products
        var finalProducts = new Map(this.existingProducts);
        // Apply updates
        this.updates.forEach(function (update) {
            switch (update.type) {
                case "new":
                    finalProducts.set(update.product.id, update.product);
                    break;
                case "updated":
                    finalProducts.set(update.product.id, update.product);
                    break;
                case "removed":
                    // Keep removed products for now, but mark them
                    var product = finalProducts.get(update.product.id);
                    if (product) {
                        product.status = "discontinued";
                    }
                    break;
            }
        });
        // Convert to array and sort by category
        var sortedProducts = Array.from(finalProducts.values()).sort(function (a, b) {
            return a.category.localeCompare(b.category);
        });
        // Write updated products.json
        var productsPath = path.join(this.dataDir, "products.json");
        (0, fs_1.writeFileSync)(productsPath, JSON.stringify({ products: sortedProducts }, null, 4));
        // Write update report
        var reportPath = path.join(this.dataDir, "product-update-report.txt");
        (0, fs_1.writeFileSync)(reportPath, this.generateUpdateReport());
    };
    return ProductSync;
}());
// Export the class for use in other scripts
exports.default = ProductSync;
