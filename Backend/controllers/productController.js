import { v2 as cloudinary } from "cloudinary";
import { productModel } from "../models/productModel.js";

// /api/product/add
// function for add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory, 
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    // Other method to store images are :-
    // You use the aws-sdk to upload files to "S3 Buckets."
    // You can convert an image into a very long string of text (Base64) and save it directly into a "String" field in MongoDB ,Very Bad for performance 

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    return res.json({
      success: true,
      message: "Product added",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// /api/product/list
// function for list product
// Future improvement as database becomes large
// Improvement A: Sorting (Show newest first)
// Improvement B: Pagination (Limit the results)
export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.json({
      success: true,
      products,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// /api/product/remove
// function for remove product
export const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    return res.json({
      success: true,
      message: "Product removed",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// /api/product/single
// function for single product info
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    return res.json({
      success: true,
      product,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};