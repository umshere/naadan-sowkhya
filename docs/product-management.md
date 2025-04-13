# Content Management Guide

This guide explains how to manage all site content, including products, gallery, and testimonials.

---

## Overview

Content is managed through JSON files and images in the `src/data` and `public/images` directories:

- `products.json` - Main product catalog
- `new-products.json` - Featured products list
- `gallery.json` - Gallery image metadata
- `testimonial-images.json` - Testimonial image metadata
- `config.json` - Common settings and categories
- `public/images/gallery/` - Gallery images
- `public/images/testimonials/` - Testimonial images

---

## Automated Update Flow

When you push changes to any content files (products, gallery, testimonials, or related images), GitHub Actions will:

1. Validate all JSON files and content structure
2. Optimize images (gallery/testimonials)
3. Create a pull request with a detailed review checklist
4. Deploy changes automatically after PR merge

### Triggering Automation

- Edit any of the following:
  - `src/data/products.json`
  - `src/data/new-products.json`
  - `src/data/gallery.json`
  - `src/data/testimonial-images.json`
  - Any image in `public/images/gallery/` or `public/images/testimonials/`
- Push to a new branch (never directly to main)

### Review Checklist

The automated PR will include a checklist for all content types:

#### Products

- [ ] Prices are correct
- [ ] Product descriptions are accurate
- [ ] Images are properly linked
- [ ] Categories are valid

#### Gallery

- [ ] Images are high quality
- [ ] Images are correctly sized (max 2MB)
- [ ] Image descriptions are accurate
- [ ] All images are relevant to content

#### Testimonials

- [ ] Content is appropriate
- [ ] Customer names are correct
- [ ] Images are optimized
- [ ] All required fields are filled

---

## Manual Update Flow

Manual updates may be needed for:

- Emergency fixes
- Bulk content/image updates
- Bypassing automation (not recommended)

**Steps:**

1. Create a new branch:  
   `git checkout -b content-update-[description]`
2. Make changes to relevant files/images
3. Commit and push:  
   `git add .`  
   `git commit -m "manual: [describe changes]"`  
   `git push origin content-update-[description]`
4. Open a pull request and request review

---

## Adding/Updating Products

1. Edit `src/data/products.json` using this format:
   ```json
   {
     "id": "natural-soap-lavender",
     "name": "Natural Lavender Soap",
     "category": ["natural-cosmetics"],
     "price": "150",
     "weight": "100GM",
     "description": "Handmade natural soap with lavender essential oil",
     "image": "natural-soap-lavender.jpg"
   }
   ```
2. Commit and push changes as described above.

---

## Adding/Updating Gallery

1. Add images to `public/images/gallery/` (JPG, JPEG, PNG, max 2MB, high quality)
2. Edit `src/data/gallery.json` to include metadata:
   ```json
   {
     "filename": "event-1.jpg",
     "title": "Event 1",
     "description": "Product launch event"
   }
   ```
3. Commit and push changes.

---

## Adding/Updating Testimonials

1. Add images to `public/images/testimonials/` (JPG, JPEG, PNG, max 2MB)
2. Edit `src/data/testimonial-images.json`:
   ```json
   {
     "filename": "testimonial-1.jpeg",
     "name": "Customer Name",
     "testimonial": "This is a testimonial."
   }
   ```
3. Commit and push changes.

---

## Validation Rules

- **Products**

  - `id`: Lowercase, hyphens, numbers only
  - `name`: Required
  - `category`: Must be from allowed list
  - `price`: String, numbers only
  - `weight`: Optional, ends with GM or ML
  - `description`: Required
  - `image`: Filename only (.jpg, .jpeg, .png)

- **Gallery**

  - `filename`: Must match file in `public/images/gallery/`
  - `title`: Required
  - `description`: Required
  - Image: JPG, JPEG, PNG, max 2MB

- **Testimonials**
  - `filename`: Must match file in `public/images/testimonials/`
  - `name`: Required
  - `testimonial`: Required
  - Image: JPG, JPEG, PNG, max 2MB

---

## Troubleshooting

If validation fails:

1. Check GitHub Actions error log
2. Verify JSON formatting and required fields
3. Confirm image file exists and is correct format/size
4. Check category names (for products)

---

## Auto-deployment

After PR approval and merge:

- Changes deploy automatically
- Live within 5 minutes
- No manual deployment needed

---

**Note:** Always create changes on a new branch, never directly on main.
