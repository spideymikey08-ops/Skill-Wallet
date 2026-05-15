const express = require("express");
const app = express();

app.use(express.json());

// SUCCESS ROUTE
app.get("/success", (req, res) => {
  res.json({
    success: true,
    message: "Request successful"
  });
});

// ERROR ROUTE
app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});