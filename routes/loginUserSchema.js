const $ = require('fluent-json-schema').default;

const loginUserSchema = $.object()
.prop('email', $.string().minLength(1).required())
.prop('password', $.string().minLength(1).required()).valueOf();

exports.loginUserSchema = loginUserSchema;