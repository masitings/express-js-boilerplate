exports.response = async (res, status, msg, values) => {
    var response = {
        success: true,
        message: msg,
        data: values
    };
    res.status(status);
    res.json(response);
    res.end();
}