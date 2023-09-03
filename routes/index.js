const router = require("express").Router();
const {
  accessToken,
  sendSTKPush,
  callBackURL,
} = require("../controllers/Stk_push");
const { b2c, resultUrl, queue } = require("../controllers/b2c");

// router.get("/mpesa", accessToken);
router.post("/mpesa", sendSTKPush);
router.post("/mpesa/callbackurl", callBackURL);
router.post("/b2c", b2c);
router.post("/result-url", resultUrl);
router.post("/queue", queue);
module.exports = router;
