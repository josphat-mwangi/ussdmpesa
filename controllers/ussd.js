let dataAmount = {};
const UssdMenu = require("ussd-builder");
let menu = new UssdMenu();
const router = require("express").Router();

const ussd = () => {
  menu.startState({
    run: () => {
      // use menu.con() to send response without terminating session
      menu.con(
        "Welcome. Choose option:" + "\n1. Show Balance" + "\n2. Buy Airtime"
      );
    },
    // next object links to next state based on user input
    next: {
      1: "showBalance",
      2: "buyAirtime",
    },
  });

  menu.state("showBalance", {
    run: () => {
      // fetch balance
      fetchBalance(menu.args.phoneNumber).then((bal) => {
        // use menu.end() to send response and terminate session
        menu.end("Your balance is GHC " + bal);
      });
    },
  });

  menu.state("buyAirtime", {
    run: () => {
      menu.con("Enter amount:");
    },
    next: {
      // using regex to match user input to next state
      "*\\d+": "buyAirtime.amount",
    },
  });

  // nesting states
  menu.state("buyAirtime.amount", {
    run: () => {
      dataAmount.amount = Number(menu.val);
      menu.con("Choose option:" + "\n1. Mpesa");
    },
    next: {
      1: "mpesa",
    },
  });

  menu.state("mpesa", {
    run: async () => {
      let number = menu.args.phoneNumber;
      let Amount = dataAmount.amount;
      await sendSTKPush({ phoneNumber: number.split("+")[1], Amount });
      menu.end(
        "Your Airtime Request has been Received.\n Kindly Enter Mpesa Pin when Prompted to complete the transaction."
      );
    },
  });
};

router.post("/", async (req, res) => {
  await ussd();
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

module.exports = router;
