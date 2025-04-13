# JSON Structure Optimization (Implemented)

This document outlines the optimized JSON structure implemented for managing product data, aimed at reducing redundancy and improving maintainability.

## Issues Addressed

1. Repeated common values (currency, benefits, ingredients) across product entries.
2. Redundant WhatsApp message format construction.
3. Duplicate product information between `products.json` and `new-products.json`.

## Implemented Structure

### 1. Centralized Configuration (`src/data/config.json`)

Common default values and category definitions are now stored centrally:

```json
{
  "defaults": {
    "currency": "Rs",
    "whatsappNumber": "919846981231",
    "imageBasePath": "/images/products/",
    "benefits": "",
    "ingredients": ""
  },
  "categories": {
    "natural-cosmetics": "Natural Cosmetics",
    "food-products": "Food Products",
    "natural-hair-care": "Natural Hair Care",
    "herbal-products": "Herbal Products"
  }
}
```

### 2. Simplified Product Catalog (`src/data/products.json`)

The main product list now contains only essential, unique information per product:

```json
{
  "products": [
    {
      "id": "product-id",
      "name": "Product Name",
      "category": ["category-id-1", "category-id-2"],
      "price": "100",
      "weight": "100GM", // Optional weight/volume
      "description": "Product description",
      "image": "product-image-filename.jpg" // Filename only
    }
    // ... more products
  ]
}
```

- `category` is now an array of category IDs from `config.json`.
- `currency`, `benefits`, `ingredients`, `whatsappLink`, and `slug` are derived dynamically.
- `image` only stores the filename; the base path comes from `config.json`.

### 3. Featured Products References (`src/data/new-products.json`)

This file now only lists the IDs of featured products, referencing the main catalog:

```json
{
  "featured": [
    "product-id-1",
    "product-id-2",
    "product-id-3"
    // ... more featured product IDs
  ]
}
```

## Utility Functions (`src/lib/productUtils.ts`)

A dedicated utility module (`productUtils.ts`) was created to:

- Reconstruct full product details by combining data from `products.json` and `config.json`.
- Provide functions like `getAllProducts`, `getFeaturedProducts`, `getProductBySlug`, `getProductsByCategory`, `getCategoryName`, etc., for components to use.

## Validation

- JSON schemas (`src/data/schemas/`) were created for `config.json`, `products.json`, and `new-products.json`.
- A validation script (`scripts/validate-products.js`) uses these schemas and performs cross-validation (e.g., checks if featured product IDs exist, validates categories, checks image file existence).
- The GitHub workflow (`.github/workflows/product-updates.yml`) runs this validation script automatically on changes to product data files.

## Achieved Benefits

1. **Reduced Redundancy:** Common values are defined once in `config.json`.
2. **Simplified Updates:** Changes to defaults (like WhatsApp number or currency) only need to be made in one place. Product updates involve editing fewer fields.
3. **Improved Consistency:** Centralized categories and defaults minimize inconsistencies. Featured products list directly references the main catalog, eliminating data duplication.
4. **Enhanced Maintainability:** The structure is cleaner and easier to manage. Utility functions encapsulate the logic for reconstructing product data.
5. **Robust Validation:** Automated schema and cross-validation checks ensure data integrity before changes are merged.
