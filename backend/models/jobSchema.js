import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a job title"],
        minlength: [3, "Title must contain at least 3 characters"],
        maxlength: [50, "Title must contain at most 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide a job description"],
        minlength: [3, "Description must contain at least 3 characters"],
        maxlength: [350, "Description must contain at most 350 characters"]
    },
    category: {
        type: String,
        required: [true, "Job category is required"]
    },
    country: {
        type: String,
        required: [true, "Please provide the country name"]
    },
    city: {
        type: String,
        required: [true, "Please provide the city name"]
    },
    location: {
        type: String,
        required: [true, "Please provide the location name"]
    },
    fixedSalary: {
        type: Number,
        min: [0, "Fixed salary cannot be negative"],
        max: [999999999, "Fixed salary cannot exceed 999,999,999"],
    },
    salaryFrom: {
        type: Number,
        min: [0, "Salary from cannot be negative"],
        max: [999999999, "Salary from cannot exceed 999,999,999"],
    },
    salaryTo: {
        type: Number,
        min: [0, "Salary to cannot be negative"],
        max: [999999999, "Salary to cannot exceed 999,999,999"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
});

export const job = mongoose.model("job", jobSchema); //chanes made GPT
