const Cart = require("../models/Cart");


// **************** Add item into cart ***************************
exports.addItem = async (req, res) => {
    try {

        const { userId, productName, description, image, quantity, price } = req.body

        if (!productName || !description || !image || !price) {
            return res.status(400).json({ success: false, message: "Provide all the fields" });
        }

        // is product already exist in cart
        const isProductExist = await Product.findOne({ productName });

        if (isProductExist) {
            return res.status(400).json({ success: false, message: "Product already exist with this name in cart" });
        }

        // add into cart
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            const existingProductIndex = cart.orderItems.findIndex(item => item.productName === productName);

            if (existingProductIndex !== -1) {
                // Product exists, update the existing product
                cart.orderItems[existingProductIndex].quantity += quantity;
                cart.orderItems[existingProductIndex].description = description;
                cart.orderItems[existingProductIndex].image = image;
                cart.orderItems[existingProductIndex].price = price;
            } else {
                // Product does not exist, add a new product
                cart.orderItems.push({ productName, description, image, quantity, price });
            }
        }

        await cart.save();


        return res.status(200).json({
            success: true,
            message: "item add to cart successfully.",
            cartDoc : cart
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



// **************** Remove item from cart *************************
exports.removeItem = async (req, res) => {
    try {
        const {id} = req.params;
        const { userId, productName } = req.body;

        if (!userId || !productName) {
            return res.status(400).json({ success: false, message: "Provide all the required fields" });
        }

        // Find the cart for the given user and remove the specific product
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { orderItems: { productName: productName } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully.",
            cartDoc: cart
        });


    } catch (error) {
        console.log("Error in removeItem controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't remove item from cart!",
            error: error.message
        });
    }
};



// **************** Get cart detail **********************
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find the cart for the given user
        const cart = await Cart.findOne({ user: userId }).populate('user', 'name email'); // Populate user details if needed

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            cartDoc : cart,
        });
        
    } catch (error) {
        console.log("Error in getCart controller", error);
        return res.status(500).json({
            success: false,
            message: "Couldn't retrieve cart!",
            error: error.message
        });
    }
};