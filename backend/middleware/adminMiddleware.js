import userModel from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin verification failed",
    });
  }
};

export default adminMiddleware;
