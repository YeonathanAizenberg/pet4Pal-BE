const $ = require('fluent-json-schema').default;

const PetValidationSchema = $.object()
.prop('name', $.string().minLength(1).required())
.prop('type', $.string().minLength(1).required())
.prop('adoption_status', $.string().minLength(1).required())
.prop('picture', $.string().minLength(1).required())
.prop('owner_id', $.string().minLength(1))
.prop('height', $.number().minimum(0).required())
.prop('weight', $.number().minimum(0).required())
.prop('color', $.string().minLength(1).required())
.prop('hypoallergenic', $.boolean().required())
.prop('dietary_restrictions', $.string().minLength(1).required())
.prop('breed_of_animal', $.string().minLength(1).required()).valueOf();

exports.PetValidationSchema = PetValidationSchema; 