module.exports = function (err, req, res, next) {
    const [message, status] = err.message.split(",");
    res.status(status || 500).send({
        error: { message: "Something Failed", reason: message, errorStack: err },
    });
};
