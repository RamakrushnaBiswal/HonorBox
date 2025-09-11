// controllers/NewsController.js
const Newsletter = require("../models/Subscriber");
const { verifyEmail, sendSubscriptionEmail } = require("../utils/emailVerifier");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ Regex validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ✅ Check if already exists
    const existingUser = await Newsletter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // ✅ Domain limit check
    const domain = email.split("@")[1].toLowerCase();
    const domainCount = await Newsletter.countDocuments({
      email: { $regex: `@${domain}$`, $options: "i" },
    });
    if (domainCount >= 3) {
      return res.status(400).json({
        message: `Limit reached: Only 3 subscriptions allowed for '${domain}'`,
      });
    }

    // ✅ Real-world verification via ZeroBounce
    const isValid = await verifyEmail(email);
    if (!isValid) {
      return res.status(400).json({ message: "Email verification failed. Please use a valid email." });
    }

    // ✅ Save new subscription
    const subscription = new Newsletter({ email });
    await subscription.save();

    //send confirmation mail
    await sendSubscriptionEmail(email);
    
    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
