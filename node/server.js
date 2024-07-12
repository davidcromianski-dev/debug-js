const express = require("express");
const app = express();
const port = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// A simple GET endpoint
app.get("/", (req, res) => {
  const { num1, num2 } = req.query;

  if (!num1 || !num2) {
    return res.send("Please provide both num1 and num2");
  }
  const sum = num1 + num2;

  res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
