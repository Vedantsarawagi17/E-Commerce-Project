import express from 'express'
import { 
    placeOrder,
    placeOrderStripe, 
    verifyStripe, 
    placeOrderRazorpay, 
    verifyRazorpay,
    allOrders, 
    userOrders, 
    updateStatus
} from '../controllers/orderControllers.js'

import { adminAuth } from '../middleware/adminAuth.js'
import { authUser } from '../middleware/auth.js'

export const orderRouter = express.Router()

// Admin Features 
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder) 
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/verifyStripe', authUser, verifyStripe) // Added Stripe verification route
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay) // Added Razorpay verification route

// User Feature  
orderRouter.post('/userOrders', authUser, userOrders)