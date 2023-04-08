const $ = require('fluent-json-schema').default;

const adoptPetValidationSchema = $.object()
.prop('id', $.object().required())
.prop('userId', $.string().minLength(1).required())
.prop('petStatus', $.string().minLength(1).required())
.valueOf();

exports.adoptPetValidationSchema = adoptPetValidationSchema; 