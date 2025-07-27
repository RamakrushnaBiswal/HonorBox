const Contact = require("../models/Contact");

exports.submit = async (req, res) => {
    try {
        const {name, email, subject, message} = req.body;

    if(!name || !email || !subject || !message){
        return res.status(400).json({ error: 'All fields are required.' });
    }

    await Contact.create({ name, email, subject, message });

    res.json({ success: true, message: 'Your message has been received.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};