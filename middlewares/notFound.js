const notFound = (err, req, res, next) => {

    res.status(404).json({
        status: 404,
        message: 'Page Not Found'
    })

}

module.exports = notFound;