const asyncWrapper = (f) => async (req, res, next) => {
    try {
        await f(req, res, next)
    } catch (error) {
        console.log(error)
        res
        .status(error.code || error.statusCode || 500)
        .json({
            message: error.message
        })
    }
}

export default asyncWrapper
