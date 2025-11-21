module.exports = {
    successResponse(res, message = 'Success', data = {}, status = 200) {
        return res.status(status).json({
            status: true,
            message,
            data
        });
    },

    errorResponse(res, message = 'Something went wrong', status = 500, error = null) {
        return res.status(status).json({
            status: false,
            message,
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    },

    validation(res, errors = {}, message = 'Validation failed', status = 422) {
        return res.status(status).json({
            success: false,
            message,
            errors
        });
    }
};
