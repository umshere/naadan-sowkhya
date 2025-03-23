const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// Base directory setup
const imagesDir = path.join(__dirname, "../public/images");

// Create directories
[
  "products",
  "slider",
  "categories",
  "about",
  "certifications",
  "gallery",
].forEach((category) => {
  const dir = path.join(imagesDir, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Download function
const downloadImage = async (url, filepath) => {
  if (fs.existsSync(filepath)) {
    console.log(`File exists: ${filepath}`);
    return;
  }

  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(filepath);
          res.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            console.log(`Downloaded: ${filepath}`);
            resolve();
          });
        } else if ([301, 302].includes(res.statusCode)) {
          downloadImage(res.headers.location, filepath)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error(`Download failed: ${res.statusCode}`));
        }
      })
      .on("error", reject);
  });
};

// Image mappings with shortened URLs for better readability
const baseUrl = "https://sowkhyaproducts.com/wp-content/uploads";
const images = {
  // Format: [local filename, remote filename, year/month]
  products: [
    ["carrot-lip-balm.jpeg", "IMG_6068", "2025/03"],
    ["black-seed-oil-30ml.jpg", "IMG_3376", "2024/04"],
    ["virgin-coconut-oil-100ml.jpg", "IMG_3375", "2024/04"],
    [
      "pure-cow-ghee-200gm.jpeg",
      "WhatsApp-Image-2024-04-30-at-07.51.31",
      "2024/04",
    ],
    ["lemon-grass-essential-oil-30ml.jpg", "IMG_3383", "2024/04"],
    ["navara-rice-500gm.jpg", "IMG_3404-Copy", "2025/03"],
    [
      "banana-powder-naadan-nendra-250gm.jpg",
      "IMG_3365-Copy-Copy-Copy",
      "2025/03",
    ],
    [
      "naadan-kannan-kaya-powder-250gm.jpg",
      "IMG_3361-Copy-Copy-Copy",
      "2025/03",
    ],
    [
      "palm-candy-pana-kalkandam-200gm.jpg",
      "IMG_3368-Copy-Copy-Copy",
      "2025/03",
    ],
    ["shampoo-natural-100ml.jpg", "IMG_3359-Copy-Copy-Copy", "2025/03"],
    ["chia-seed-120gm.jpg", "IMG_3392-Copy", "2025/03"],
    ["natural-herbal-dye-90gm.jpg", "IMG_3412-Copy", "2025/03"],
    ["carrot-oil.jpg", "WhatsApp-Image-2024-04-28-at-12.59.23.jpeg", "2024/04"],
    ["cheruthen.jpeg", "IMG_3418-1568x2335.jpeg", "2024/04"],
    ["natural-alovera-gel.jpeg", "IMG_3421-1568x2003.jpeg", "2024/04"],
    ["natural-lip-stick-5natural-colors.jpg", "lipstick", "2024/04"],
    ["golden-glow-oil.jpg", "glow-oil2", "2024/04"],
    ["natural-kajal-round-stick.jpg", "kajal-stic2", "2024/04"],
  ].map(([local, remote, date]) => {
    // Determine file extension based on remote filename
    const ext = remote.endsWith(".jpeg") ? "" : ".jpg";
    return {
      url: `${baseUrl}/${date}/${remote}${ext}`,
      path: path.join(imagesDir, "products", local),
    };
  }),

  categories: [
    ["WELLNESS.png", "WELLNESS.png"],
    ["AYURVEDIC.png", "AYURVEDIC.png"],
    ["GLITTER.png", "GLITTER.png"],
  ].map(([name]) => ({
    url: `${baseUrl}/themes/wellchoice/assets/images/about/exp/${name}`,
    path: path.join(imagesDir, "categories", name),
  })),

  certifications: [
    ["IMG_5007.jpeg", "IMG_5007.jpeg"],
    ["IMG_6071.jpeg", "IMG_6071.jpeg"],
  ].map(([name]) => ({
    url: `${baseUrl}/2022/04/${name}`,
    path: path.join(imagesDir, "certifications", name),
  })),
};

// Download all images
(async () => {
  for (const category of Object.values(images)) {
    for (const image of category) {
      try {
        await downloadImage(image.url, image.path);
      } catch (error) {
        console.error(`Error downloading ${image.url}:`, error.message);
      }
    }
  }
  console.log("All downloads completed!");
})();
