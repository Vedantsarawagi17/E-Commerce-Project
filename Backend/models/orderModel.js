import mongoose from "mongoose";

const oderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

export const orderModel = mongoose.models.order || mongoose.model("orders", oderSchema);

// Right now, your userId is a plain String. In a more advanced setup, developers often use: userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

// This allows you to use a Mongoose feature called .populate(), which lets you grab the User's email or phone number automatically when you look at an order, without doing a second search.