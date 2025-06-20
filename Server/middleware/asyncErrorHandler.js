const asyncHandler = (catchAsyncErrors) => (req, res, next) => {
    Promise.resolve(catchAsyncErrors(req, res, next)).catch(next);
};
module.exports = asyncHandler;
