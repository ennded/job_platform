import mongoose from "mongoose";
import Validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, " please provide your name"],
        minlength: [3, "Minimum length should be 3 character"],
        maxlength: [10, "Mximum length should be 10 character"]
    },

    email: {
        type: String,
        required: [true, "Please provides your email id"],
        Validate: [Validator.isEmail, "Please provides your email id"]
    },

    coverLetter: {
        type: String,
        required: [true, "please provide your cover letter"]
    },

    phone: {
        type: String,
        required: [true, "Please provide your number"]
    },

    address: {
        type: String,
        required: [true, "please provide your address"]
    },

    resume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },

    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    }
});

export const Application = mongoose.model("Application", applicationSchema);