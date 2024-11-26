export const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({ message: eror.message || 'Something went wrong' });
}