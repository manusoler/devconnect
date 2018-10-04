const val = require('validator');

module.exports = (data) => {
    let errors = {};

    if (!val.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Name must be between 2 and 30';
    }

    return {
        errors,
        isValid: !Object.keys(errors).length
    }
}