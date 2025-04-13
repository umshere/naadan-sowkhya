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
  "slug": "product-slug",
  "category": "product-category",
  "image": "/images/products/image-name.jpg",
  "price": "100",
  "currency": "Rs",
  "description": "Product description",
  "benefits": "",
  "ingredients": "",
  "whatsappLink": "https://wa.me/919846981231?text=Hi,%20i%20would%20like%20to%20order%20Product%20Name"
}
```

5. Commit your changes
6. A pull request will be created automatically

## Validation Rules

- `id`: Lowercase letters, numbers, and hyphens only
- `slug`: Lowercase letters, numbers, and hyphens only
- `category`: Lowercase letters and hyphens only
- `price`: Numbers only
- `image`: Must be in `/images/products/` directory with .jpg, .jpeg, .png, or .svg extension
- `description`: Cannot be empty
- `whatsappLink`: Must start with "https://wa.me/" followed by phone number and message

## Bulk Updates

For multiple product updates:

1. Edit the JSON file
2. Copy the entire content
3. Make your changes in a text editor
4. Paste the updated content back
5. Commit changes

The system will automatically:

- Validate your changes
- Create a pull request
- Notify reviewers

## Best Practices

1. Keep descriptions concise and accurate
2. Double-check prices and weights
3. Ensure product images exist in the correct directory
4. Use proper category names from the existing list
5. Test WhatsApp links after updating

## Need Help?

If you encounter any issues or have questions:

1. Check the validation error messages
2. Review the format examples
3. Contact the development team for assistance

## Auto-deployment

Once your changes are approved and merged:

- The website will automatically update
- New products will be live within minutes
- No additional action required
