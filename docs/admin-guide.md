# Admin Guide: How to Update Products

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
     "slug": "product-name",
     "category": "category-name",
     "image": "/images/products/image-name.jpg",
     "price": "100",
     "currency": "Rs",
     "description": "Product description",
     "benefits": "",
     "ingredients": "",
     "whatsappLink": "https://wa.me/919846981231?text=Hi,%20i%20would%20like%20to%20order%20Product%20Name"
   }
   ```

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

1. Open `new-products.json`
2. Copy the product's entire JSON object from `products.json`
3. Add it to the `newProducts` array
4. Save changes

## Troubleshooting

If you get error messages:

1. Check for missing commas between products
2. Make sure all quotes are straight quotes `"` not curly quotes `"`
3. Verify image path matches exactly
4. Ensure price only contains numbers

Need help? Contact the development team.
