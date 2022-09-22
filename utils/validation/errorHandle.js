module.exports = (error,req,res,next) => {
    const errorStatus = error.statusCode || 500;
    return res.status(errorStatus).json({
       success:false,
       error : error.message
    })
}