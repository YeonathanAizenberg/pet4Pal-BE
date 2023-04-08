const $ = require('fluent-json-schema').default;

const NewUserValidateSchema = $.object()
.prop('email', $.string().minLength(1).required())
.prop('password', $.string().minLength(1).required())
.prop('firstName', $.string().minLength(1).required())
.prop('lastName', $.string().minLength(1).required())
.prop('phoneNumber', $.number().minimum(0).required()).valueOf();

exports.NewUserValidateSchema = NewUserValidateSchema;