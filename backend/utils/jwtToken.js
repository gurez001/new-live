// -----------create token and save in  cookies 
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTtoken();
    //-------------   options for cookie
// console.log(user)

    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
           path: "/", // cookie path
          // // expires: new Date('2024-12-31'), // absolute expiration date
          // // maxAge: 3600, // relative max age of the cookie from when the client receives it in seconds
          domain: "localhost", // domain for the cookie
          secure: false, // accessible through HTTP
          httpOnly: false, // only server can access the cookie
          sameSite: "lax", // enforcement type
          partitioned: false, // store using partitioned storage
        };
    res.status(statusCode).cookie('token',token,option).json({
        success:true,
        token,
        user,
    })
}

module.exports = sendToken;