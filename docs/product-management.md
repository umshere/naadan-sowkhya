# Product Management Guide

This guide explains how to manage product information in the system.

## Overview

Products are managed through JSON files in the `src/data` directory:

1. `products.json` - Main product catalog
2. `config.json` - Common settings and categories
3. `new-products.json` - Featured products list

## Quick Start

1. Go to GitHub repository
2. Navigate to `src/data/products.json` (or `new-products.json`)
3. Click edit button (✏️)
4. Make changes following this format:

```json
{
  "id": "product-id",
  "name": "Product Name",
  "category": ["natural-cosmetics"],
  "price": "100",
  "weight": "100GM",
  "description": "Product description",
  "image": "product-image-name.jpg"
}
```

5. Commit changes with a description
6. Pull request will be created automatically

## Validation Rules

- `id`: Lowercase letters, numbers, and hyphens only
- `name`: Cannot be empty
- `category`: One or more from:
  - natural-cosmetics
  - food-products
  - natural-hair-care
  - herbal-products
- `price`: Numbers only, as string (e.g., "100")
- `weight`: Optional. Must end with GM or ML (e.g., "100GM" or "30ML")
- `description`: Cannot be empty
- `image`: Filename only (.jpg, .jpeg, or .png)

The system automatically adds:

- Currency symbol
- WhatsApp link
- Image base path
- Default benefits/ingredients

## Common Tasks

### Add New Product

1. Open `products.json`
2. Add new entry following the format above
3. Ensure image exists in `/public/images/products/`
4. Commit changes

### Update Prices

1. Find product in `products.json`
2. Update "price" value (keep quotes)
3. Commit changes

### Feature Products

1. Open `new-products.json`
2. Add product ID to "featured" array
3. Commit changes

### Bulk Updates

1. Edit `products.json`
2. Copy entire content
3. Make changes in text editor
4. Paste back and commit

## Best Practices

1. Keep descriptions concise and accurate
2. Double-check prices and weights
3. Verify image files exist before updating
4. Use correct category names
5. Test on website after updates merge

## Troubleshooting

If you get errors:

1. Check validation error messages
2. Verify JSON format (commas, quotes)
3. Confirm image path matches exactly
4. Ensure categories are from allowed list

## Auto-deployment

After approval and merge:

1. Website updates automatically
2. Changes live within minutes
3. No additional action needed

Note: Make changes on a branch other than main.
