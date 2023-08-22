const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const liveKeys = {
    apiKey  : '36720b89cad1648486df2b96a011d9815e32d41f3f4bfcccc90b89866b76c88d',
    username: 'Atvoiceapi'
}



const sandboxKeys = {
    apiKey  : '63cfb20e61bce11230fbd70791c6b4d5c08c1c603134b379d43a157f605e9425',
    username: 'sandbox'
}


const atCredentials  =  sandboxKeys //liveKeys;
const AfricasTalking = require('africastalking')(atCredentials)

const sms = AfricasTalking.SMS
const options = {
    // Set the numbers you want to send to in international format
    to: ['+254790175477'],
    // Set your message
    message: "I'm a lumberjack and its ok, I sleep all night and I work all day",
    // Set your shortCode or senderId
    // from: 'XXYYZZ'
}

// That’s it, hit send and we’ll take care of the rest
sms.send(options)
    .then(console.log)
    .catch(console.log);