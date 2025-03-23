"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_sync_1 = require("./product-sync");
var fs_1 = require("fs");
var path = require("path");
// Log file setup
var logPath = path.resolve(__dirname, "../src/data/firecrawl-log.txt");
var logContent = "Firecrawl Log\n===========\n\n";
function log(message) {
    var timestamp = new Date().toISOString();
    var entry = "[".concat(timestamp, "] ").concat(message, "\n");
    logContent += entry;
    console.log(message);
}
function crawlCategory(url, categoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log("Crawling category: ".concat(categoryName, " (").concat(url, ")"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, useMcpTool({
                            serverName: "github.com/mendableai/firecrawl-mcp-server",
                            toolName: "firecrawl_scrape",
                            arguments: {
                                url: url,
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
                                    systemPrompt: "Extract product information from this page. For each product, get the name, price, description, SKU if available, and image URL. Ensure prices are in the format of just numbers without currency symbols.",
                                    prompt: "Please extract all products from this category page, capturing their names, prices, descriptions, SKUs, and image URLs. If no SKU is available, use the product name converted to lowercase with spaces replaced by dashes as the ID.",
                                },
                            },
                        })];
                case 2:
                    result = _a.sent();
                    if (typeof result === "string") {
                        return [2 /*return*/, [JSON.parse(result)]];
                    }
                    return [2 /*return*/, Array.isArray(result) ? result : [result]];
                case 3:
                    error_1 = _a.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                    log("Error scraping ".concat(url, ": ").concat(errorMessage));
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var categories, productSync, _loop_1, _i, categories_1, category, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categories = [
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
                    productSync = new product_sync_1.default();
                    _loop_1 = function (category) {
                        var scrapedProducts, formattedProducts, error_2, errorMessage;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    log("Processing category: ".concat(category.name));
                                    return [4 /*yield*/, crawlCategory(category.url, category.name)];
                                case 1:
                                    scrapedProducts = _b.sent();
                                    if (scrapedProducts.length > 0) {
                                        formattedProducts = scrapedProducts.map(function (scraped) { return ({
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
                                            whatsappLink: "https://wa.me/919846981231?text=Hi,%20i%20would%20like%20to%20order%20".concat(encodeURIComponent(scraped.name)),
                                            status: "active",
                                        }); });
                                        // Process the products through our sync system
                                        productSync.processScrapedData(category.name, formattedProducts);
                                    }
                                    else {
                                        log("No products found for category: ".concat(category.name));
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _b.sent();
                                    errorMessage = error_2 instanceof Error ? error_2.message : String(error_2);
                                    log("Error processing category ".concat(category.name, ": ").concat(errorMessage));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, categories_1 = categories;
                    _a.label = 1;
                case 1:
                    if (!(_i < categories_1.length)) return [3 /*break*/, 4];
                    category = categories_1[_i];
                    return [5 /*yield**/, _loop_1(category)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    // Update products.json and generate report
                    try {
                        productSync.updateProductsJson();
                        log("Successfully updated products.json and generated update report");
                    }
                    catch (error) {
                        errorMessage = error instanceof Error ? error.message : String(error);
                        log("Error updating products: ".concat(errorMessage));
                    }
                    // Write log file
                    (0, fs_1.writeFileSync)(logPath, logContent);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    var errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Fatal error:", errorMessage);
    process.exit(1);
});
