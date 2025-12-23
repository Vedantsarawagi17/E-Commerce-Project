import { userModel } from "../models/userModel.js";
// import {localCart} from "../../Frontend/src/context/ShopContext.jsx";
// UserModel :- name ,email, password , carData

// /api/cart/merge // unable to understand this code 
export const mergeCart = async (req, res) => {
    try {
        const { userId, localCart } = req.body;
        const userData = await userModel.findById(userId);
        let dbCart = userData.cartData || {};
 
        // Merge logic: Combine localCart into dbCart
        for (const itemId in localCart) {
            if (!dbCart[itemId]) {
                dbCart[itemId] = {};
            }
            for (const size in localCart[itemId]) {
                // Add guest quantity to existing DB quantity
                dbCart[itemId][size] = (dbCart[itemId][size] || 0) + localCart[itemId][size];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData: dbCart });
        res.json({ success: true, message: "Cart Merged" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// /api/cart/add
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;


    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.json({
      success: true,
      message: "Cart updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// /api/cart/get
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({
      success: true,
      cartData: userData.cartData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

