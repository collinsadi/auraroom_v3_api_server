const handleError = (code, message, details) => {
  return {
    status: false,
    error: {
      message: message,
      error_code: code,
      error_details: details,
    },
  };
};

module.exports = handleError;
