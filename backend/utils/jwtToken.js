// jab user register kare tab hi login ho jaye

export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 168 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure:true,
        sameSite:"None",
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};