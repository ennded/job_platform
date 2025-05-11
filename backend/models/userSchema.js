import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//it is basically for which info u want from ur user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide the Name"],
        minLength: [3, "Name must be contain at least 3 character"],
        maxLength: [30, "Name cannot exceed more than 30 character"],
    },
    email: {
        type: String,
        required: [true, "Please provide the Email"],
        validate: [validator.isEmail, "Please provide correct Email!"],
    },

    phone: {
        type: Number,
        require: [true, " Please provide Phone number"],
    },
    password: {
        type: String,
        require: [true, "please Provide Correct Password"],
        minLength: [8, "Password must contain at least 8 character"],
        maxLength: [30, "Name cannot exceed more than 30 character"],
        select: false,
    },
    role: {
        type: String,
        require: [true, "Please your Role"],
        enum: ["Job Seeker", "Employer"],      // enum means it can be job seeker or employeer not other than these
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//encryption--hashing the password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});// userschema run hone k phle ye code run krega 

//comparing password

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//  to generate JWT token authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User", userSchema); //  user model