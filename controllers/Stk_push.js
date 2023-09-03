const moment = require("moment");
const PasswordBaseSixFour = require("../helpers/passwordbasesixfour");
const request = require("request");
const get_access_token = require("../utils/accessToken");

const sendSTKPush = ({ phoneNumber, Amount }) => {
  return new Promise(async (resolve, reject) => {
    let url = process.env.endpoint_stk_push;
    let getAccessToken = await get_access_token();
    let auth = "Bearer " + getAccessToken;
    const timeStamp = moment().format("YYYYMMDDHHmmss");
    const passKey = process.env.Pass_key;
    const shortCode = process.env.ShortCode;
    const password = PasswordBaseSixFour(shortCode, passKey, timeStamp);

    request(
      {
        url: url,
        method: "POST",
        headers: {
          Authorization: auth,
        },
        json: {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timeStamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Amount,
          PartyA: phoneNumber,
          PartyB: shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL:
            "https://d799-2c0f-fe38-2405-21a7-d4ea-e8fa-81c0-862a.ngrok-free.app/api/mpesa/callbackurl",
          AccountReference: "Test",
          TransactionDesc: "Test",
        },
      },
      (err, resp, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve({
          status: 200,
          message: body,
        });
      }
    );
  });
};

const callBackURL = async (req, res) => {
  console.log(req.body);
  let checkoutCode = req.body.Body.stkCallback.ResultCode;
  if (checkoutCode === 0) {
    let metadata = req.body.Body.stkCallback.CallbackMetadata.Item;

    function mapMetadata(metadata) {
      return metadata.reduce((result, entry) => {
        result[entry.Name] = entry.Value;
        return result;
      }, {});
    }

    const mappedResult = mapMetadata(metadata);
    const { Amount, TransactionDate, MpesaReceiptNumber, PhoneNumber } =
      mappedResult;

    console.log(Amount, TransactionDate, MpesaReceiptNumber, PhoneNumber);
    // save to the db
    // const newPayment = new Payment({
    //   amount: Amount,
    //   phoneNumber: PhoneNumber,
    //   mpesaReceiptNumber: MpesaReceiptNumber,
    //   transactionDate: TransactionDate
    // })
    // newPayment.save();
  } else {
    console.log(req.body.Body.stkCallback.ResultDesc);
  }
};

module.exports = { sendSTKPush, callBackURL };
