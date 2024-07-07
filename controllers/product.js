const Product = require("../models/Product");


// **************** Add Product ***************************
exports.addProduct = async (req, res) => {
    try {

        const { name, description, image, tags, price } = req.body

        if (!name || !description || !image || !price ) {
            return res.status(400).json({ success: false, message: "Provide all the fields" });
        }

        // is product already exist
        const isProductExist = await Product.findOne({ name });

        if (isProductExist) {
            return res.status(400).json({ success: false, message: "Product already exist with this name" });
        }

        // store into DB
        const productDoc = await Product.create({
            name,
            description,
            image,
            price,
            tags
        });


        return res.status(200).json({
            success: true,
            message: "Product created successfully.",
            productDoc
        });

    } catch (error) {
        console.log("Error in  add Product controller");
        return res.status(500).json({
            success: false,
            message: "Couldn't  add product!",
            error: error.message
        });
    }
};


// **************** Update Product *************************
exports.updateProduct = async (req, res) => {
    try {

        const { id, name, description, image, tags, price } = req.body

        if (!id) {
            return res.status(400).json({ success: false, message: "Provide id" });
        }

        // store into DB
        const productDoc = await Product.findByIdAndUpdate(id, {
            $set: {
                name,
                description,
                image,
                price,
                tags
            }
        },{new : true });

        if ( !productDoc ) {
            return res.status(400).json({ success: false, message: "Product is not exist" });
        }


        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            productDoc
        });

    } catch (error) {
        console.log("Error in update Product controller");
        return res.status(500).json({
            success: false,
            message: "Couldn't update Product!",
            error: error.message
        });
    }
};



// **************** Remove Product *************************
exports.removeProduct = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Provide id" });
        }

        // Delete from DB
        const productDoc = await Product.findByIdAndDelete(id);

        if ( !productDoc ) {
            return res.status(400).json({ success: false, message: "Product is not exist" });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
            productDoc
        });

    } catch (error) {
        console.log("Error in delete Product controller");
        return res.status(500).json({
            success: false,
            message: "Couldn't delete product!",
            error: error.message
        });
    }
};



// **************** Get All Products **********************
exports.getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        return res.status(200).json({
            success: true,
            message: "Get all products.",
            products
        });

    } catch (error) {
        console.log("Error in get all prodcuts controller");
        return res.status(500).json({
            success: false,
            message: "Couldn't get all products!",
            error: error.message
        });
    }
};


// **************** Get A Product **********************
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        return res.status(200).json({
            success: true,
            message: "Get a product.",
            product
        });

    } catch (error) {
        console.log("Error in get a product controller");
        return res.status(500).json({
            success: false,
            message: "Couldn't get a product!",
            error: error.message
        });
    }
};