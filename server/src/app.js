const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const repositoryRoutes = require("./routes/repository.routes");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://syntnex-ai.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// Authentication routes
app.use("/api/auth", authRoutes);

// Repository routes
app.use("/api/repositories", repositoryRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Syntnex AI backend is running",
  });
});

module.exports = app;