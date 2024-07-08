const express = require("express");
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple GET endpoint
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// A simple POST endpoint
app.post("/echo", (req, res) => {
  res.json({ message: "Received", data: req.body });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
