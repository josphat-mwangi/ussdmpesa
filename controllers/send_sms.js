const Credentials = {
  apiKey: "",
  username: "",
};
const AfricasTalking = require("africastalking")(Credentials);
const sms = AfricasTalking.SMS;

const sendSms = async (req, res) => {
  const { recipient, msg } = req.body;
  const options = {
    to: recipient,
    message: msg,
    // Set your shortCode or senderId
    // from: 'XXYYZZ'
  };

  // That’s it, hit send and we’ll take care of the rest
  sms.send(options).then(console.log).catch(console.log);
};

module.exports = { sendSms };
