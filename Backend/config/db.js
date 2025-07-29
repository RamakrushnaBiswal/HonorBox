const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔍 Mongo URI:", process.env.MONGO_URI); // Debug log

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error);
    process.exit(1);
  }
};

connectDB();
module.exports = mongoose;
