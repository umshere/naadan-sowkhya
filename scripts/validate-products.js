const Ajv = require("ajv");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv({
  allErrors: true,
  strict: true,
});

// Validation configurations
const validations = [
  {
    schema: "config.schema.json",
    data: "../src/data/config.json",
    name: "Configuration",
  },
  {
    schema: "product.schema.json",
    data: "../src/data/products.json",
    name: "Products",
  },
  {
    schema: "new-products.schema.json",
    data: "../src/data/new-products.json",
    name: "Featured Products",
  },
];

// Cross-validation checks
function performCrossValidation(data) {
  const { products, newProducts, config } = data;
  const errors = [];

  // Check if featured products exist in main products list
  newProducts.featured.forEach((productId) => {
    if (!products.products.some((p) => p.id === productId)) {
      errors.push(`Featured product "${productId}" not found in products list`);
    }
  });

  // Check if product categories are valid
  products.products.forEach((product) => {
    product.category.forEach((cat) => {
      if (!config.categories[cat]) {
        errors.push(`Invalid category "${cat}" in product "${product.id}"`);
      }
    });
  });

  // Check if product images exist
  products.products.forEach((product) => {
    const imagePath = path.join(
      __dirname,
      "../public/images/products",
      product.image
    );
    if (!fs.existsSync(imagePath)) {
      errors.push(
        `Image file not found for product "${product.id}": ${product.image}`
      );
    }
  });

  return errors;
}

async function validateFiles() {
  try {
    const schemaData = {};
    const fileData = {};
    let hasErrors = false;

    // Load and compile schemas
    for (const validation of validations) {
      const schemaPath = path.join(
        __dirname,
        "../src/data/schemas",
        validation.schema
      );
      const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
      schemaData[validation.name] = ajv.compile(schema);
    }

    // Validate each file
    for (const validation of validations) {
      const dataPath = path.join(__dirname, validation.data);
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      fileData[validation.name] = data;

      const validate = schemaData[validation.name];
      const valid = validate(data);

      if (!valid) {
        console.error(`\n${validation.name} validation errors:`);
        console.error(validate.errors);
        hasErrors = true;
      } else {
        console.log(`✓ ${validation.name} schema validation passed`);
      }
    }

    // Perform cross-validation
    const crossErrors = performCrossValidation({
      products: fileData["Products"],
      newProducts: fileData["Featured Products"],
      config: fileData["Configuration"],
    });

    if (crossErrors.length > 0) {
      console.error("\nCross-validation errors:");
      crossErrors.forEach((error) => console.error(`✗ ${error}`));
      hasErrors = true;
    } else {
      console.log("✓ Cross-validation passed");
    }

    if (hasErrors) {
      process.exit(1);
    }

    console.log("\n✓ All validations passed successfully");
  } catch (error) {
    console.error("Error during validation:", error);
    process.exit(1);
  }
}

validateFiles();
