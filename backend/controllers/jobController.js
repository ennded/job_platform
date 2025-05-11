import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { job as Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {   //to fetch all available job
    const jobs = await Job.find({ expired: false });            // will fetch job which is not expired
    res.status(200).json({                                          //return the job
        success: true,
        jobs,
    });
});


export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;                   // to know the role of person whether it is job seeker or employeer
    if (role === "Job  Seeker") {
        return next(
            new ErrorHandler(
                "Job seeker is not allow to access this resource!",
                400
            )
        );
    }

    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo } = req.body; //changes
    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Please provide full job details!", 400))
    }

    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Please Provide either range salary or fixedsalary"));
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Cannot enter salary range and fixed salary together"));
    }

    const postedBy = req.user._id;   //who is posting the job
    const newJob = await Job.create({//changes made GPT
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    });

    res.status(200).json({
        success: true,
        message: "Job posted Succesfully!",
        job: newJob   //changes made GPT
    });
});



export const getmyJobs = catchAsyncError(async (req, res, next) => {// to get my job which i have upload
    const { role } = req.user;
    if (role === "Job  Seeker") {
        return next(
            new ErrorHandler(
                "Job seeker is not allow to access this resource!",
                400
            )
        );
    }
    const myjobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myjobs
    });
});

export const updateJob = catchAsyncError(async (req, res, next) => {


    const { role } = req.user;

    if (role === "Job  Seeker") {
        return next(
            new ErrorHandler(
                "Job seeker is not allow to access this resource!",
                400
            )
        );
    }

    const { id } = req.params;
    let existingJob = await Job.findById(id);  //chance to error
    if (!existingJob) {
        return next(
            new ErrorHandler(
                "Oops!, Job not Found!",
                404
            )
        );
    }

    existingJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        job: existingJob,
        message: "Job Updated Succesfully!",
    });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;

    if (role === "Job  Seeker") {
        return next(
            new ErrorHandler(
                "Job seeker is not allow to access this resource!",
                400
            )
        );
    }

    const { id } = req.params;
    let deletingJob = Job.findById({ id })
    if (!deletingJob) {
        return next(
            new ErrorHandler(
                "Oops!, Job not Found!",
                404
            )
        );
    }

    await Job.deleteOne();
    res.status(200).json({
        success: true,
        message: "job Deleted Succesfully"
    });
});


export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const newJob = await Job.findById(id);
        if (!newJob) {
            return next(new ErrorHandler("Job Not Found", 404));
        }
        res.status(200).json({
            success: true,
            job: newJob
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid ID", 404));
    }

})