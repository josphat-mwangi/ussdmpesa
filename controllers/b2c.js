const request = require("request");
const get_access_token = require("../utils/accessToken");

const b2c = async (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v3/paymentrequest";
  let getAccessToken = await get_access_token();
  let auth = "Bearer " + getAccessToken;
  const {
    OriginatorConversationID,
    InitiatorName,
    SecurityCredential,
    CommandID,
    Amount,
    PartyA,
    PartyB,
    Remarks,
    Occasion,
  } = req.body;
  request(
    {
      url: url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        OriginatorConversationID: OriginatorConversationID,
        InitiatorName: InitiatorName,
        SecurityCredential: SecurityCredential,
        CommandID: CommandID,
        Amount: Amount,
        PartyA: PartyA,
        PartyB: PartyB,
        Remarks: Remarks,
        QueueTimeOutURL: "https://547e-197-155-75-82.ngrok-free.app/api/queue",
        ResultURL: "https://547e-197-155-75-82.ngrok-free.app/api/result-url",
        Occasion: Occasion,
      },
    },
    (err, resp, body) => {
      if (err) {
        console.log(err);
        res.send("err", err);
      }
      res.json({
        status: 200,
        message: body,
      });
    }
  );
};

const resultUrl = async (req, res) => {
  let checkoutCode = req.body.Result.ResultCode;
  if (checkoutCode === 0) {
  } else {
    console.log(req.body);
  }
};
const queue = async (req, res) => {
  console.log("queue", req.body);
};

module.exports = { b2c, resultUrl, queue };
