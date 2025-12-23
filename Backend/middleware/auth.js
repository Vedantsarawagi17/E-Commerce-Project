import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  console.log("Raw Headers Received:", req.headers);
  // FIX: Destructure token from req.headers. The client sends { token: "..." }
  const { token } = req.headers; 
  console.log("Token Received:", token); // <-- ADD THIS

  if (!token) {
    return res.json({ 
      success: false,
      message: "Not authorized",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; 
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};