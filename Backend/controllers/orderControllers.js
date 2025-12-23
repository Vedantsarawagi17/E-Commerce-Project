// Razorpay demo card 4386 2894 0766 0153 international 4012 8888 8888 1881
// stripe demo card number
// 5555558265554449
 //  /api/order/list
import { orderModel } from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import { Stripe } from "stripe";
import { connectRazorpay, verifyPayment } from "../config/razorpay.js"; 
  
// Global Variables
const currency = "GBP";
const razorpayCurrency = "INR";
const deliveryCharge = 10;

// All Orders data for Admin Panel 
// /api/order/list
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      $or: [
        { paymentMethod: 'COD' },
        { payment: true }
      ]
    });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// /api/order/userOrders
// User Order Data For Frontend 
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ 
      userId,
      $or: [
        { paymentMethod: 'COD' },
        { payment: true }
      ]
    });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// /api/order/status
// Update Orders Status From Admin Panel 
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.json({ success: false, message: "Missing Order ID or Status" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success:false, message: error.message });
  }
};
  
// Stripe Initialization 
let stripeInstance = null;

const connectStripe = () => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("FATAL ERROR: STRIPE_SECRET_KEY not found.");
      throw new Error("Stripe configuration missing API key.");
    }
  // Initialization only happens here, after dotenv is loaded
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

// /api/order/place
// Placing Orders using COD
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId, items,address,
      amount, paymentMethod: "COD",
      payment: false, date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// /api/order/stripe
// Placing Orders using Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    
    // Call the deferred initialization function
    const stripe = connectStripe(); 

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges ",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    
    // Use the initialized Stripe client
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// /api/order/verifyStripe
// Verify Stripe
export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// /api/order/razorpay
// Placing Orders using Razorpay
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    
    const options = {
      amount: amount * 100,
      currency: razorpayCurrency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    // FIX: Call the deferred initialization function
    const razorpayClient = connectRazorpay(); 

    razorpayClient.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// /api/order/verifyRazorpay
// Verify Razorpay 
export const verifyRazorpay = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, userId } = req.body;
  
  try {
    const isVerified = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isVerified) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Verification failed" });
  }
};
