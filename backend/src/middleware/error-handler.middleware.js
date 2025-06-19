export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Default error
  let statusCode = 500;
  let message = "Internal Server Error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  } else if (err.name === "NotFoundError") {
    statusCode = 404;
    message = err.message;
  } else if (err.code === "23505") {
    // PostgreSQL unique constraint violation
    statusCode = 409;
    message = "Resource already exists";
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: "Route not found" });
};
