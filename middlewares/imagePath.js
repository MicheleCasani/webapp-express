const setImagePath = (re, res, next) => {
    re.setImagePath = `${req.protocol}://${req.get('host')}/img`
    next()
};


module.exports = setImagePath