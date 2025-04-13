# Product Updates Guide

This guide explains how to update product information in the system.

## Overview

The product catalog is managed through JSON files in the `src/data` directory:

- `products.json`: Main product catalog
- `new-products.json`: Featured/new products list

## How to Update Products

1. Fork the repository on GitHub
2. Navigate to the file you want to update (`src/data/products.json` or `src/data/new-products.json`)
3. Click the edit button (pencil icon)
4. Make your changes, following the format:

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

5. Commit your changes
6. A pull request will be created automatically

## Validation Rules

- `id`: Lowercase letters, numbers, and hyphens only
- `name`: Cannot be empty
- `category`: Must be one or more of the following:
  - natural-cosmetics
  - food-products
  - natural-hair-care
  - herbal-products
- `price`: Numbers only as string (e.g., "100")
- `weight`: Optional. Must end with GM (grams) or ML (milliliters) (e.g., "100GM" or "30ML")
- `description`: Cannot be empty
- `image`: Just the filename with .jpg, .jpeg, or .png extension (files must be placed in `/public/images/products/`)

## Bulk Updates

For multiple product updates:

1. Edit the JSON file
2. Copy the entire content
3. Make your changes in a text editor
4. Paste the updated content back
5. Commit changes

The system will automatically:

- Validate your changes against the schema
- Create a pull request
- Add the repository owner as reviewer

## Best Practices

1. Keep descriptions concise and accurate
2. Double-check prices and weights
3. Ensure product images exist in the `/public/images/products/` directory
4. Use proper category names from the allowed list
5. Test the product display on the website after updates are merged

## Need Help?

If you encounter any issues or have questions:

1. Check the validation error messages
2. Review the format examples in existing products
3. Contact the development team for assistance

## Auto-deployment

When your changes are approved and merged:

1. The website will automatically update
2. New products will be live within minutes
3. No additional action required

Note: Changes must be made on a branch other than main to trigger the automated workflow.
