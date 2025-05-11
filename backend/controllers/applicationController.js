import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { Application } from '../models/applicationSchema.js';
import cloudinary from 'cloudinary';
import { job } from '../models/jobSchema.js';


// This function handles the route for employers to get all applications submitted to their posted jobs
export const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
    // Extracting the role from the authenticated user's request
    const { role } = req.user;
    // Checking if the role is "Job Seeker", if so, it means a job seeker is trying to access this resource, which is not allowed
    if (role === "Job  Seeker") {
        // If the role is "Job Seeker", return an error response using the ErrorHandler middleware
        return next(
            new ErrorHandler(
                "Job seeker is not allow to access this resource!",
                400
            )
        );
    }

    // Extracting the user ID of the employer from the authenticated user's request
    const { _id } = req.user;
    // Finding all applications (resumes) associated with the employer's user ID
    const applications = await Application.find({ 'employerID.user': _id });
    // Sending a success response with the applications found
    res.status(200).json({
        success: true,
        applications
    });
});




export const jobseekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new ErrorHandler(
                "Employer is not allow to access this resource!",
                400
            )
        );
    }

    const { _id } = req.user;
    const applications1 = await Application.find({ 'applicantID.user': _id });// agr employe ki apllication(resume) jo post h us se match ho gyi 
    res.status(200).json({
        success: true,
        applications1
    })

});


export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new ErrorHandler(
                "Employer is not allow to access this resource!",
                400
            )
        );
    }

    const { id } = req.user;
    const applications2 = await Application.findById(id);
    if (!applications2) {
        return next(new ErrorHandler("Oops, applications not found!", 404))
    }
    await applications2.deleteOne();
    res.status(200).json({
        success: true,
        message: " Application Deleted Succesfully",
    });
})


export const postApplication = catchAsyncError(async (req, res, next) => {

    console.log("Request Body:", req.body)
    const { role } = req.user;
    if (role === "Employer") {
        return next(
            new ErrorHandler(
                "Employer is not allowed to access this resource!",
                400
            )
        );
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume File Required"));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid file type. Please upload your resume in PNG, JPG, or WEBP format.", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown cloudinary Error"
        );
        return next(new ErrorHandler("Failed to upload Resume", 500));
    }

    const { name, email, coverLetter, phone, address, jobid } = req.body;

    console.log("Job ID:", jobid);
    if (!jobid) {
        return next(new ErrorHandler("Job ID not provided!", 400));
    }



    try {
        const jobDetails = await job.findById(jobid);
        console.log("Job Details:", jobDetails);
        if (!jobDetails) {
            return next(new ErrorHandler("Job not found!", 404));
        }

        const applicantID = {
            user: req.user._id,
            role: "Job Seeker",
        };

        const employerID = {
            user: jobDetails.postedBy,
            role: "Employer",
        };

        const application = await Application.create({
            name,
            email,
            coverLetter,
            phone,
            address,
            applicantID,
            employerID,
            resume: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        res.status(200).json({
            success: true,
            message: "Application Submitted",
            application,
        });
    } catch (error) {
        console.log("Error Processing job application:", error)
        return next(new ErrorHandler("Error processing job application! Details: " + error.message, 500));
    }
});
