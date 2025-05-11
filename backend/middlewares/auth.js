import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from '../models/userSchema.js'

export const isAuthorized = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("User not authorized", 400));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Handle token expired error
            return next(new ErrorHandler("Token has expired. Please log in again.", 401));
        } else {
            // Handle other verification errors
            return next(new ErrorHandler("Invalid token. Please log in again.", 401));
        }
    }

});