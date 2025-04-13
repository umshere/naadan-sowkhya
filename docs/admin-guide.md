# Admin Guide: How to Update Products

## Overview

Products are managed through three main files:

1. `src/data/products.json` - Main product catalog
2. `src/data/config.json` - Common settings and categories
3. `src/data/new-products.json` - List of featured product IDs

All updates are automatically validated to ensure data consistency.

## Quick Start Guide

### 1. Access the Repository

1. Go to GitHub: https://github.com/umshere/naadan-sowkhya
2. Log in to your GitHub account
3. You should see the project files listed

### 2. Update Product Information

1. Navigate to product files:

   - Click on `src` folder
   - Click on `data` folder
   - Click on `products.json` for main catalog
   - Click on `new-products.json` for featured products

2. Edit the file:

   - Click the pencil icon (✏️) in the top right
   - Find the product you want to update
   - Update the information
   - Follow the format exactly:

   ```json
   {
     "id": "product-name",
     "name": "Product Name",
     "category": ["category-name"],
     "price": "100",
     "weight": "100GM",
     "description": "Product description",
     "image": "image-name.jpg"
   }
   ```

   Note: The following values are automatically added:

   - Currency (Rs)
   - WhatsApp link
   - Benefits and ingredients
   - Full image path

### 3. Save Your Changes

1. Scroll to the bottom of the page
2. Under "Commit changes":
   - Write a brief description like "Update product prices" or "Add new product"
   - Select "Create a new branch for this commit and start a pull request"
   - Click "Propose changes"

### 4. Create Pull Request

1. You'll see a "Comparing changes" page
2. Click "Create pull request"
3. Leave any additional comments if needed
4. Click "Create pull request" again

### 5. Wait for Review

- Your changes will be automatically checked
- A reviewer will approve the changes
- Once approved, changes will go live automatically

## Common Tasks

### Valid Categories

The following categories are available:

- `natural-cosmetics` - Natural Cosmetics
- `food-products` - Food Products
- `natural-hair-care` - Natural Hair Care
- `herbal-products` - Herbal Products

Products can belong to multiple categories.

### Image Guidelines

- All product images must be in `/public/images/products/`
- Use lowercase letters, numbers, and hyphens in filenames
- Supported formats: jpg, jpeg, png
- Image size: 800x800px recommended

### Add a New Product

1. Open `products.json`
2. Find the last product in the list
3. Add a comma after its closing `}`
4. Copy an existing product's format
5. Paste after the comma
6. Update all the information
7. Make sure image file exists in `/public/images/products/`

### Update Prices

1. Open `products.json`
2. Find the product using browser search (Ctrl+F or ⌘+F)
3. Locate the "price" field
4. Update the number (keep the quotes)
5. Save changes as described above

### Update Description

1. Find the product in `products.json`
2. Locate the "description" field
3. Update the text between quotes
4. Keep any weight/volume information

### Add to Featured Products

1. Open `src/data/new-products.json`.
2. Find the `"featured"` array.
3. Add the `id` of the product you want to feature as a new string in the array. Make sure to add a comma after the previous ID if it's not the last one. Example:
   ```json
   {
     "featured": ["product-id-1", "product-id-2", "newly-featured-product-id"]
   }
   ```
4. Save changes as described above. The product details will be automatically pulled from `products.json`.

## Troubleshooting

If you get error messages:

1. Check for missing commas between products
2. Make sure all quotes are straight quotes `"` not curly quotes `"`
3. Verify image path matches exactly
4. Ensure price only contains numbers

Need help? Contact the development team.
