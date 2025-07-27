const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
require("./config/db");

const app = express();
const contactRoutes = require('./routes/contactRoutes');
app.use(bodyParser.json({ limit: "50mb" }));  // Increase JSON request size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); 
app.use(cors());
app.use(express.json());


app.use('/api/contact', contactRoutes);
app.use("/api", require("./routes/certificateRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));