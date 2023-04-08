const $ = require('fluent-json-schema').default;

const updateUserSchema = $.object()
.prop('email', $.string().minLength(1).required())
.prop('password', $.string().minLength(1).required())
.prop('fname', $.string().minLength(1).required())
.prop('lname', $.string().minLength(1).required())
.prop('phone', $.number().minimum(0).required())
.valueOf();

exports.updateUserSchema = updateUserSchema;