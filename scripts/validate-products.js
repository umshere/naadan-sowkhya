const Ajv = require("ajv");
const fs = require("fs");
const path = require("path");

// Create Ajv instance
const ajv = new Ajv();

// Load schema
const schema = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../src/data/schemas/product.schema.json"),
    "utf8"
  )
);

// Compile schema
const validate = ajv.compile(schema);

// Function to validate a JSON file
function validateFile(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const valid = validate(data);

    if (!valid) {
      console.error(`Validation errors in ${path.basename(filePath)}:`);
      console.error(validate.errors);
      return false;
    }

    console.log(`${path.basename(filePath)} is valid`);
    return true;
  } catch (error) {
    console.error(
      `Error processing ${path.basename(filePath)}:`,
      error.message
    );
    return false;
  }
}

// Validate all product files
const files = ["products.json", "new-products.json"];
const allValid = files.every((file) =>
  validateFile(path.join(__dirname, "../src/data", file))
);

// Exit with appropriate code
process.exit(allValid ? 0 : 1);
