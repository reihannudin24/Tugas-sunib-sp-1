const Product = require("../models/product");

exports.createProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.path
        });

        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let dataToUpdate = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        };

        if (req.file) {
            dataToUpdate.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            dataToUpdate,
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ msg: 'Product not found' });

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};