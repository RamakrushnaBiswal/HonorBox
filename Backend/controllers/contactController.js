const Contact = require("../models/Contact");

exports.submit = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Enhanced validation
    if (name.trim().length < 2 || name.trim().length > 50) {
      return res
        .status(400)
        .json({ error: "Name must be between 2 and 50 characters." });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
    }

    if (subject.trim().length < 5 || subject.trim().length > 200) {
      return res
        .status(400)
        .json({ error: "Subject must be between 5 and 200 characters." });
    }

    if (message.trim().length < 10 || message.trim().length > 1000) {
      return res
        .status(400)
        .json({ error: "Message must be between 10 and 1000 characters." });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    await Contact.create(sanitizedData);

    res.json({ success: true, message: "Your message has been received." });
  } catch (err) {
    console.error("Contact form submission error:", err.message);
    // Handle specific mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errors[0] });
    }
    res
      .status(500)
      .json({
        error: "Unable to process your request. Please try again later.",
      });
  }
};
