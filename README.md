# Naadan Sowkhya - Next.js Website

Modern Next.js implementation of the Naadan Sowkhya e-commerce website, migrated from WordPress for enhanced performance and user experience. This migration focuses on delivering a faster, more reliable, and user-friendly experience while maintaining the rich content and functionality of the original WordPress site.

## WordPress to Next.js Migration Benefits

```mermaid
graph LR
    subgraph "WordPress"
        WP[WordPress CMS] --> WPD[(Database)]
        WP --> WPP[PHP Processing]
        WP --> WPPlugins[Plugins]
    end
    
    subgraph "Next.js"
        NJ[Next.js] --> SSR[Server-Side Rendering]
        NJ --> SSG[Static Generation]
        NJ --> JSON[JSON Data]
        NJ --> IMG[Image Optimization]
    end
    
    WP -->|Migration| NJ
    
    style WordPress fill:#f9f9f9,stroke:#333,stroke-width:2px
    style Next.js fill:#f0f0ff,stroke:#333,stroke-width:2px
    style WP fill:#f5d8a3,stroke:#333,stroke-width:1px
    style NJ fill:#a3d1f5,stroke:#333,stroke-width:1px
```

### Before (WordPress)

- Slower page loads due to database queries and PHP processing
- Limited mobile responsiveness
- Complex plugin dependencies
- Higher hosting costs
- Maintenance overhead with plugins and updates
- Basic image optimization
- Limited control over performance optimization

### After (Next.js)

- Fast page loads with static generation and server-side rendering
- Built-in image optimization with next/image
- No database queries - optimized JSON data
- Reduced hosting costs
- Zero plugin dependencies
- Full control over codebase and optimizations
- Modern development practices with TypeScript

## Major Improvements from WordPress Version

### 🚀 Performance Enhancements

- Migrated to Next.js 14 for improved page load times and SEO
- Implemented optimized image loading with next/image
- Reduced time-to-interactive with client-side routing
- Improved Core Web Vitals scores

### 💅 UI/UX Improvements

- Completely redesigned responsive interface
- Enhanced product browsing with categorized views
- Added image lightbox for better product visualization
- Smooth animations and transitions for better user engagement
- Improved mobile navigation experience

### 🛠️ Technical Improvements

- Typescript implementation for better code reliability
- Modular component architecture
- Structured data management with JSON
- Improved SEO with Next.js metadata
- Better asset organization and management

### 📱 Mobile Experience

- Mobile-first responsive design
- Touch-friendly navigation
- Optimized images for mobile devices
- Improved load times on mobile networks

### 🔄 Content Management

- Simplified content updates through JSON files
- Structured product data management
- Easy-to-maintain testimonials system
- Organized media assets

## Guide for Administrators (Non-Technical)

### First-Time Setup (One-Time Process)

```mermaid
flowchart TD
    A[Start Setup] --> B[Install Git for Windows]
    B --> C[Install Visual Studio Code]
    C --> D[Install Node.js]
    D --> E[Restart Computer]
    E --> F[Create naadan-website folder]
    F --> G[Open with VS Code]
    G --> H[Open Terminal with Ctrl+`]
    H --> I[Clone Repository]
    I --> J[Run npm install]
    J --> K[Setup Complete]
    
    style A fill:#a3f5b9,stroke:#333,stroke-width:1px
    style K fill:#a3f5b9,stroke:#333,stroke-width:1px
```

1. Install Required Software (Windows):

   - Download and install Git for Windows: https://git-scm.com/download/win
     - During installation, click "Next" for all options (use default settings)
   - Download and install Visual Studio Code: https://code.visualstudio.com/
     - During installation, make sure "Add to PATH" is checked
   - Download and install Node.js: https://nodejs.org/ (Click on "LTS" version)
     - During installation, check "Automatically install necessary tools"
   - After installation, restart your computer

2. Get the Website Files (Windows):
   - Create a new folder on your desktop named "naadan-website"
   - Right-click on the folder and select "Open with Code"
   - In Visual Studio Code, press Ctrl+` (the key above Tab) to open terminal
   - If you see "Select Default Profile", choose "Git Bash"
   - Copy and paste these commands one by one:
     ```
     git clone https://github.com/umshere/naadan-sowkhya.git .
     ```
     ```
     npm install
     ```
   - Wait for installation to complete (this may take a few minutes)

### Running the Website Locally (Windows)

```mermaid
flowchart LR
    A[Open VS Code] --> B[Start Terminal]
    B --> C[Run npm run dev]
    C --> D[Wait for Ready]
    D --> E[Open Browser]
    E --> F[http://localhost:3000]
    
    style A fill:#f5d8a3,stroke:#333,stroke-width:1px
    style F fill:#a3d1f5,stroke:#333,stroke-width:1px
```

1. Opening the Website:

   - Double-click the "naadan-website" folder on your Desktop
   - Right-click inside the folder and select "Open with Code"
   - If you don't see "Open with Code", reinstall Visual Studio Code and restart your computer

2. Starting the Website:

   - Press Ctrl+` (key above Tab) to open terminal
   - If terminal shows "PowerShell", click the dropdown (▼) next to the + icon and select "Git Bash"
   - Type this command and press Enter:
     ```
     npm run dev
     ```
   - Wait until you see "Ready" in green text
   - Open your web browser and go to: http://localhost:3000

3. Stopping the Website:
   - Go back to Visual Studio Code
   - Click inside the terminal
   - Press Ctrl+C
   - Type 'y' and press Enter if asked to terminate

### Making Content Updates (Windows)

```mermaid
flowchart TD
    A[Open VS Code] --> B[Find Content Files]
    B --> C{Choose File}
    C -->|Products| D[Edit products.json]
    C -->|Gallery| E[Edit gallery.json]
    C -->|Testimonials| F[Edit testimonial-images.json]
    
    G[Adding Images] --> H[Open public/images folder]
    H --> I{Choose Folder}
    I -->|Products| J[Add to products folder]
    I -->|Gallery| K[Add to gallery folder]
    I -->|Testimonials| L[Add to testimonials folder]
    
    D --> M[Save Changes Ctrl+S]
    E --> M
    F --> M
    J --> M
    K --> M
    L --> M
    M --> N[View Changes on localhost:3000]
    
    style A fill:#f5d8a3,stroke:#333,stroke-width:1px
    style N fill:#a3d1f5,stroke:#333,stroke-width:1px
```

1. Finding Content Files:

   - In Visual Studio Code, look at the left sidebar
   - Click on the "Explorer" icon (first icon)
   - Open the "src" folder, then "data" folder
   - Choose the file to edit:
     - `products.json` - For products
     - `gallery.json` - For gallery
     - `testimonial-images.json` - For testimonials

2. Adding New Images:

   - Open Windows Explorer to your "naadan-website" folder
   - Go to the "public" folder, then "images"
   - Choose the right folder:
     - "products" - For product images
     - "gallery" - For gallery images
     - "testimonials" - For testimonial images
   - Copy your new images into the correct folder
   - Use simple names without spaces (example: black-seed-oil.jpg)

3. Saving Changes:
   - After editing any file, press Ctrl+S to save
   - Check your changes on the website (http://localhost:3000)
   - If the page shows errors:
     - Make sure all commas and quotes are in the right places
     - Check that image filenames exactly match what's in your JSON files
     - Try stopping and restarting the website

### Common Issues & Solutions (Windows)

1. "Command not found" Error:

   - Close Visual Studio Code completely
   - Restart your computer
   - Try opening the folder and running commands again

2. Terminal Shows PowerShell Instead of Git Bash:

   - Click the dropdown (▼) next to + in terminal
   - Select "Git Bash"
   - If Git Bash is not listed, reinstall Git for Windows

3. Changes Not Showing Up:

   - Press Ctrl+S to save all files
   - Refresh your browser page
   - If still not working, stop and restart the website

4. Images Not Loading:
   - Check image filenames for exact spelling and case
   - Make sure images are in the correct folders
   - Verify image formats are .jpg, .jpeg, or .png

### When to Ask for Help

Contact the development team when:

- You see error messages you don't understand
- The website won't start after following all steps
- You need to make design changes
- You need to add new features or sections
- Your changes aren't showing up after trying the solutions above

## Context Management System

The project includes a sophisticated context management system that helps maintain continuity across development sessions and ensures efficient handling of complex tasks.

### Task Handoff System

This project uses a `.clinerules`-based task handoff system that:

- Monitors context window usage
- Manages task continuity
- Preserves development context
- Ensures smooth transitions between sessions

### When Task Handoffs Occur

The system initiates task handoffs when:

1. Context window usage exceeds 50%
2. Completing major components/features
3. Switching between project areas
4. Before complex operations
5. When accumulating significant context

### Context Structure

Each task handoff includes:

- Completed work summary
- Current project state
- Next steps and implementation details
- Reference information and documentation
- Clear continuation instructions

For detailed implementation, refer to the `.clinerules` file in the project root.

## Project Structure

```mermaid
graph TD
    A[naadan-sowkhya] --> B[src]
    A --> C[public]
    A --> D[styles]
    
    B --> E[app]
    B --> F[components]
    B --> G[data]
    
    E --> E1[Pages and Routing]
    F --> F1[Reusable Components]
    G --> G1[JSON Data Files]
    
    C --> H[images]
    H --> H1[products]
    H --> H2[gallery]
    H --> H3[testimonials]
    
    D --> D1[Global Styles]
    D --> D2[CSS Modules]
    
    style A fill:#f5f5f5,stroke:#333,stroke-width:2px
    style B fill:#e6f7ff,stroke:#333,stroke-width:1px
    style C fill:#e6f7ff,stroke:#333,stroke-width:1px
    style D fill:#e6f7ff,stroke:#333,stroke-width:1px
```

- `/src/app/*` - Next.js pages and routing
- `/src/components/*` - Reusable React components
- `/src/data/*` - JSON data files for content
- `/public/images/*` - Optimized image assets
- `/styles/*` - Global styles and CSS modules
- `/docs/*` - Project documentation
- `/scripts/*` - Utility scripts
- `/.github/workflows/*` - GitHub Actions workflows

## Product Updates

For detailed instructions on updating product information, please refer to the [Product Updates Guide](docs/product-updates.md). The guide includes:

- Step-by-step instructions for making updates
- JSON format guidelines
- Validation rules
- Best practices
- Troubleshooting tips

### Automated Validation System

The project includes an automated product validation system that:

1. Validates JSON structure and data types
2. Ensures product categories are valid
3. Verifies product images exist
4. Cross-validates featured products

Run validation locally:

```bash
npm run validate:products
```

### GitHub Actions Workflow

Product updates are protected by an automated GitHub Actions workflow that:

1. Triggers when changes are made to:
   - `src/data/products.json`
   - `src/data/new-products.json`
2. Runs the validation script
3. Creates a pull request if validation passes
4. Adds validation status and checklist
5. Assigns reviewers automatically

This ensures all product updates are validated and reviewed before going live.

## Tech Stack

```mermaid
graph LR
    A[Next.js 14] --> E[Website]
    B[TypeScript] --> E
    C[Tailwind CSS] --> E
    D[React 18] --> E
    
    style A fill:#a3d1f5,stroke:#333,stroke-width:1px
    style B fill:#f5d8a3,stroke:#333,stroke-width:1px
    style C fill:#d9a3f5,stroke:#333,stroke-width:1px
    style D fill:#a3f5b9,stroke:#333,stroke-width:1px
    style E fill:#f5f5f5,stroke:#333,stroke-width:2px
```

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18

## Content Update Guide for Developers

### Updating Products

```mermaid
flowchart LR
    A[Edit products.json] --> B[Add Product Images]
    B --> C[Update categories.json]
    C --> D[Test Locally]
    D --> E[Commit & Push]
    
    style A fill:#f5d8a3,stroke:#333,stroke-width:1px
    style E fill:#a3d1f5,stroke:#333,stroke-width:1px
```

1. Navigate to `src/data/products.json`
2. Add/modify product entries following this structure:

```json
{
  "id": "unique-product-id",
  "name": "Product Name",
  "description": "Product description",
  "price": "₹XX",
  "category": "AYURVEDIC/GLITTER/WELLNESS",
  "image": "/images/products/product-image.jpg"
}
```

3. Add product images to `public/images/products/`
4. Product categories can be updated in `src/data/categories.json`

### Updating Gallery

1. Add new gallery images to `public/images/gallery/`
2. Update `src/data/gallery.json`:

```json
{
  "images": [
    {
      "src": "/images/gallery/image-name.jpg",
      "alt": "Image description",
      "category": "events/manufacturing/team/product-display"
    }
  ]
}
```

### Updating Testimonials

1. Add testimonial images to `public/images/testimonials/`
2. Update `src/data/testimonial-images.json`:

```json
{
  "testimonials": [
    {
      "image": "/images/testimonials/testimonial-1.jpeg",
      "alt": "Customer testimonial"
    }
  ]
}
```

### Image Guidelines

- Product images: 800x800px recommended, JPG/PNG format
- Gallery images: 1200x800px recommended, JPG/PNG format
- Testimonial images: 800x600px recommended, JPG/PNG format
- Compress images before uploading to maintain performance
- Use meaningful file names (e.g., `black-seed-oil-30ml.jpg`)

### After Updates

```mermaid
flowchart LR
    A[Make Changes] --> B[Test Locally]
    B --> C[Verify at localhost:3000]
    C --> D[Git Add]
    D --> E[Git Commit]
    E --> F[Git Push]
    
    style A fill:#f5d8a3,stroke:#333,stroke-width:1px
    style F fill:#a3d1f5,stroke:#333,stroke-width:1px
```

1. Test locally:

```bash
# Start the development server
npm run dev

# In another terminal, validate your changes
npm run validate:products
```

2. Verify changes at http://localhost:3000
3. Commit and push changes to a new branch:

```bash
git checkout -b product-updates
git add .
git commit -m "Update content: [describe changes]"
git push origin product-updates
```

4. The GitHub Actions workflow will:

   - Validate your changes
   - Create a pull request
   - Add validation status
   - Request reviews

5. After approval and merge, your changes will go live
