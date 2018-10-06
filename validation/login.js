const val = require('validator');

module.exports = (data) => {
    let errors = {};

    data.email = data.email ? data.email : "";
    data.password = data.password ? data.password : "";

    if (val.isEmpty(data.email)) {
        errors.email = 'Email  is required';
    }

    if (!val.isEmail(data.email)) {
        errors.name = 'Email is not a valid email';
    }

    if (val.isEmpty(data.password)) {
        errors.password = 'Password  is required';
    }

    if (!val.isLength(data.password, {
            min: 4,
            max: 30
        })) {
        errors.password = 'Password must be between 4 and 30';
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}