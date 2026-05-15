const express = require("express");
const app = express();

app.use(express.json());

// Validation middleware
const validateRegister = require("./middleware/validate");

// POST route
app.post("/register", validateRegister, (req, res) => {
  res.json({
    success: true,
    message: "User registered successfully",
    data: req.body
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});