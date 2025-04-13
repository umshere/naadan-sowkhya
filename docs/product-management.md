# Product Management Guide

This guide explains how to manage product information in the system.

## Overview

Products are managed through JSON files in the `src/data` directory:

1. `products.json` - Main product catalog
2. `config.json` - Common settings and categories
3. `new-products.json` - Featured products list

## Adding/Updating Products

### Step 1: Create a New Branch

```bash
git checkout -b product-update-[description]
# Example:
git checkout -b product-update-new-soap
```

### Step 2: Update Product Files

Edit `src/data/products.json` following this format:

```json
{
  "id": "natural-soap-lavender", // lowercase, hyphenated
  "name": "Natural Lavender Soap", // display name
  "category": ["natural-cosmetics"], // from allowed categories
  "price": "150", // as string
  "weight": "100GM", // must end with GM or ML
  "description": "Handmade natural soap with lavender essential oil",
  "image": "natural-soap-lavender.jpg" // .jpg, .jpeg, or .png
}
```

### Step 3: Commit and Push Changes

```bash
git add src/data/products.json
git commit -m "add: new lavender soap product"
git push origin product-update-new-soap
```

## Automated Validation & PR Creation

When you push changes to product files, GitHub Actions automatically:

1. Validates JSON structure
2. Checks product data format
3. Creates a pull request

### Testing the Automation

To test the GitHub Actions workflow:

1. Make a test product change:

```json
{
  "id": "test-product-1",
  "name": "Test Product",
  "category": ["natural-cosmetics"],
  "price": "100",
  "weight": "50GM",
  "description": "Test product description",
  "image": "test-product-1.jpg"
}
```

2. Push to trigger automation:

```bash
git add src/data/products.json
git commit -m "test: add test product"
git push origin product-update-test
```

3. Watch the automation:

- Go to repository's "Actions" tab
- Find your workflow run
- Review validation results
- Check auto-created PR

### Common Validation Errors

1. Invalid JSON format:

```json
{
  "id": "test-product", // Missing comma
  "name": "Test"
  "price": "100"
}
```

2. Wrong category:

```json
{
  "category": ["invalid-category"] // Must be from allowed list
}
```

3. Invalid price format:

```json
{
  "price": 100 // Must be string: "100"
}
```

4. Wrong weight format:

```json
{
  "weight": "100g" // Must be "100GM" or "100ML"
}
```

## Pull Request Review

The automated PR includes:

1. Validation status
2. Changed files list
3. Review checklist:

```markdown
- [ ] Prices are correct
- [ ] Product descriptions are accurate
- [ ] Images are properly linked
- [ ] Categories are valid
```

## Featured Products

To feature products:

1. Edit `src/data/new-products.json`:

```json
{
  "featured": ["product-id-1", "product-id-2"]
}
```

2. Push changes to trigger automation

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

## Troubleshooting

If validation fails:

1. Check GitHub Actions error log
2. Verify JSON formatting
3. Confirm all required fields
4. Check category names
5. Validate image paths

## Auto-deployment

After PR approval and merge:

1. Changes deploy automatically
2. Live within 5 minutes
3. No manual deployment needed

Note: Always create changes on a new branch, never directly on main.
