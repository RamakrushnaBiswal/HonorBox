const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ensures DB-level uniqueness
    lowercase: true, // store as lowercase
    trim: true, // remove leading/trailing spaces
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
      "Please enter a valid email address",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique index on email (in case collection already exists without it)
NewsletterSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Newsletter", NewsletterSchema);
