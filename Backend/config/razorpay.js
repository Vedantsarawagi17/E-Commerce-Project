import Razorpay from 'razorpay';
import crypto from 'crypto'; 

let razorpayInstance = null; // Will hold the initialized client

// New function to connect/initialize Razorpay
export const connectRazorpay = () => {
  if (!razorpayInstance) {
    // This code only runs when called, which will be after dotenv.config()
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    }); 
  }
  return razorpayInstance;
};

// export const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

export const createOrder = async (amount) => {
  try {
    const order = await Razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      payment_capture: 1,
    });
    return order;
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw error;
  }
};

export const verifyPayment = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
  hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
  const generated_signature = hmac.digest('hex');
  return generated_signature === razorpaySignature;
};

