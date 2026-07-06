const Product = require("../models/Product");

// GET todos con filtros
exports.getProducts = async (req, res) => {
  try {
    const { category, min, max, sort } = req.query;

    let filter = {};

    if (category) filter.category = category;

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = Number(min);
      if (max) filter.price.$lte = Number(max);
    }

    let query = Product.find(filter);

    if (sort) {
      query = query.sort(sort);
    }

    const products = await query;

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "ID inválido" });
  }
};

// POST crear producto
exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};