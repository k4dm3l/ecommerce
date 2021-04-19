const boom = require('boom');

function validate(data, schema) {
  const { error } = schema.validate(data);
  return error || null;
}

function validationHandler(schema, check = 'body') {
  return function(req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = {
  validationHandler
}