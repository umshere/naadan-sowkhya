const fs = require("fs");
const path = require("path");
const https = require("https");

const imageUrls = [
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/6.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/7.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/8.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/9.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/10.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/11.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/12.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/13.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/14.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/15.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/16.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/17.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/18.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/19.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/20.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/21.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/4.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/3.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/2.jpeg",
  "https://sowkhyaproducts.com/wp-content/uploads/2024/04/1.jpeg",
];

// Create the testimonials directory if it doesn't exist
const testimonialImagesDir = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "testimonials"
);
if (!fs.existsSync(testimonialImagesDir)) {
  fs.mkdirSync(testimonialImagesDir, { recursive: true });
}

// Download images
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const writeStream = fs.createWriteStream(filepath);
          response.pipe(writeStream);
          writeStream.on("finish", () => {
            writeStream.close();
            resolve();
          });
        } else {
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`)
          );
        }
      })
      .on("error", reject);
  });
}

// Download all images
async function downloadAllImages() {
  console.log("Starting image downloads...");

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    const filename = `testimonial-${i + 1}.jpeg`;
    const filepath = path.join(testimonialImagesDir, filename);

    try {
      console.log(`Downloading ${url}...`);
      await downloadImage(url, filepath);
      console.log(`Successfully downloaded ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${url}:`, error);
    }
  }

  console.log("Finished downloading images");
}

downloadAllImages().catch(console.error);
