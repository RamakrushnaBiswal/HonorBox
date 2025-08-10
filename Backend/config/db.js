const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // We are adding a 'tls' option here.
    // This is a common workaround for the 'tlsv1 alert internal error'
    // that can happen on some networks or computers.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true, // Use this for development only
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// The original file likely calls the function to connect immediately.
// We will keep that structure.
connectDB();

// We don't strictly need to export, but it's good practice.
module.exports = connectDB;
