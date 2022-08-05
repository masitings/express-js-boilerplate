exports.resJson = async (res, status, isSuccess, msg, values) => {
    var response = {
        success: isSuccess,
        message: msg,
        data: values
    };
    res.status(status);
    res.json(response);
    res.end();
}
