const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
require("./config/db");

// 1. Import the new visitor routes
const visitorRoutes = require('./routes/visitorRoutes');

const app = express();
app.use(bodyParser.json({ limit: "50mb" })); // Increase JSON request size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());


app.use("/api", require("./routes/certificateRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// 2. Add the new visitor route to the application
app.use("/api/visitors", visitorRoutes);

//404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

//Global error handler
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
