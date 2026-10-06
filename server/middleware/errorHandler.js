// For unknown URLs
function notFound(req, res, next) {
  res.status(404).json({ message: 'Route not found' });
}

// For all other errors
function errorHandler(err, req, res, next) {
  // If JSON body is broken, send friendly message
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON data' });
  }

  // Use error status or 500
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).json({ message: message });
}

// Share them
module.exports = {
  notFound,
  errorHandler
};
