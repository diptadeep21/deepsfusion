import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({ success: false, message: 'Not Authorized. Login Again' });
        }
        const token = authHeader.split(' ')[1];

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user and check role
        const user = await userModel.findById(token_decode.id);
        
        if (!user || user.role !== 'admin') {
            return res.json({ success: false, message: 'Not Authorized. Admin access only' });
        }
        
        req.body.adminId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth;
