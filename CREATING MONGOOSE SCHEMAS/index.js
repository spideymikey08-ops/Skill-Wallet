// index.js
const mongoose = require('mongoose');
const connectDB = require('./db');

connectDB();

// -----------------------
// Lab Steps (1 -> 5)
// -----------------------

async function step1_basicSchema() {
  const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
  });

  const Product = mongoose.model('Product_step1', productSchema);

  const product = new Product({
    name: 'Laptop',
    price: 1200,
    description: 'A high-performance laptop',
  });

  await product.save();
  console.log('Step 1 - Product saved successfully:', product.toObject());
}

async function step2_validation() {
  // Note: We intentionally cause validation errors.
  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
  });

  // Use a unique model name per step to avoid OverwriteModelError.
  const Product = mongoose.model('Product_step2', productSchema);

  try {
    const product = new Product({
      price: -100, // invalid
      description: 'A high-performance laptop',
      // name omitted to trigger required validation
    });

    await product.save();
  } catch (error) {
    console.log('Step 2 - Expected validation error occurred.');
    console.error('Validation Error:', error.errors);
  }
}

async function step3_defaults() {
  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: String,
    category: {
      type: String,
      default: 'General',
    },
  });

  const Product = mongoose.model('Product_step3', productSchema);

  const product = new Product({
    name: 'Laptop',
    price: 1200,
    description: 'A high-performance laptop',
    // category omitted; should default to 'General'
  });

  await product.save();
  console.log('Step 3 - Product saved successfully:', product.toObject());
}

async function step4_typesAndOptions_timestamps() {
  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      description: String,
      category: {
        type: String,
        default: 'General',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );

  const Product = mongoose.model('Product_step4', productSchema);

  const product = new Product({
    name: 'Laptop',
    price: 1200,
    description: 'A high-performance laptop',
  });

  await product.save();
  console.log('Step 4 - Product saved successfully:', product.toObject());
}

async function step5_subdocuments() {
  const dimensionSchema = new mongoose.Schema({
    width: Number,
    height: Number,
    depth: Number,
    unit: {
      type: String,
      default: 'cm',
    },
  });

  const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      description: String,
      category: {
        type: String,
        default: 'General',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isAvailable: {
        type: Boolean,
        default: true,
      },
      dimensions: dimensionSchema,
    },
    { timestamps: true }
  );

  const Product = mongoose.model('Product_step5', productSchema);

  const product = new Product({
    name: 'Laptop',
    price: 1200,
    description: 'A high-performance laptop',
    dimensions: {
      width: 30,
      height: 20,
      depth: 2,
      // unit omitted -> defaults to 'cm'
    },
  });

  await product.save();
  console.log('Step 5 - Product saved successfully:', product.toObject());
}

async function run() {
  try {
    // Ensure any previous run documents don't interfere (optional but helpful).
    // These deletes are best-effort (models are created per step anyway).

    await step1_basicSchema();
    await step2_validation();
    await step3_defaults();
    await step4_typesAndOptions_timestamps();
    await step5_subdocuments();

    // Keep the process alive briefly for manual inspection if desired.
  } catch (err) {
    console.error('Unexpected error:', err);
  } finally {
    // Close connection so the script exits cleanly.
    await mongoose.disconnect();
  }
}

run();

