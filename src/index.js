require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const port = process.env.PORT || 3000;

// use the required middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(morgan("dev"));
app.use(cors());

// import routes
const roomRoutes = require("./routes/roomRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const nameRoutes = require("./routes/nameRoutes");

// use Routes
app.use("/api/v2/rooms", roomRoutes);
app.use("/api/v2/premium", transactionRoutes);
app.use("/api/v2/name", nameRoutes);

// connect to mongoDB

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connected Successfully to MongoDB`))
  .catch((err) => console.log(`Unable to Connect to MongoDB: `, err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Send JSON response with error message and stack trace
  res.status(500).json({
    status: false,
    error: {
      message: err.message,
      details: err.stack,
      code: 500,
    },
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
