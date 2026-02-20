const asyncHandler = (requestHandler) => async (err, req, res, next) => {
    return Promise.resolve(requestHandler(err, req, res, next)).catch((err) => {
        next(err);
    });
};

export { asyncHandler };
