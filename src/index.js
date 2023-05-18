const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const commentRoutes = require("./routes/comment");
const compression = require("compression");

dotenv.config();
app.use(express.json());
const cors = require("cors");

app.use(cors({ origin: "*" }));

// Apply compression middleware before other routes
app.use(compression());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/comment", commentRoutes);

app.listen(3000);
