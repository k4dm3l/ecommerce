const { config } = require('../../config');
const Sentry = require('@sentry/node');
const boom = require('boom');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

Sentry.init({
  dsn: `https://${config.sentryDns}.sentry.io/${config.sentryId}`,
  tracesSampleRate: 1.0
});

function withErrorStack(err, stack) {
  if (config.dev) {
    return { ...err, stack }
  }
}

function logErros(err, req, res, next) {
  Sentry.captureException(err)
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function clientErrorHandler(err, req, res, next) {
  const { output: { statusCode, payload } } = err;

  if (isRequestAjaxOrApi(req) || res.headersSent) {
    res.status(statusCode || 500).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const { output: { statusCode, payload } } = err;
  res.status(statusCode || 500);
  res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
  logErros,
  wrapErrors,
  clientErrorHandler,
  errorHandler
}