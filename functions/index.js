const functions = require("firebase-functions");
var express = require("express");
var cors = require("cors");
var request = require("request");
const crypto = require("crypto");
const key = "rzp_test_QD1Usn6rPsxYdZ";
const key_secret = "i1JTgbCI6vjWe2526KGR3xtB";

var app = express();

app.use(cors({ origin: true }));

app.post("/", (req, res) => {
  const amount = req.body.amount;
  const orderId = req.body.orderId;

  //Allow Api Calls from local server
  const allowedOrigins = [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "https://quizapp-20.firebaseapp.com",
    "https://quizapp-20.web.app"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  console.log("Creating Order")
  var options = {
    method: "POST",
    url: "https://api.razorpay.com/v1/orders",
    headers: {
      //There should be space after Basic else you get a BAD REQUEST error
      Authorization:
        "Basic " + new Buffer(key + ":" + key_secret).toString("base64")
    },
    form: {
      amount: amount,
      currency: "INR",
    //   receipt:orderId,
      payment_capture: 1
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body)
    res.send(body);
  });
});

app.post("/confirmPayment", (req, res) => {
  console.log("Confirming Payment")
  const order = req.body;
  const text = order.razorpay_order_id + "|" + order.razorpay_payment_id;
  var signature = crypto
    .createHmac("sha256", key_secret)
    .update(text)
    .digest("hex");
    console.log(signature);
    console.log(order.razorpay_signature);
  if (signature === order.razorpay_signature) {
    console.log("PAYMENT SUCCESSFULL");
    var options = {
        'method': 'GET',
        'url': 'https://api.razorpay.com/v1/orders/'+order.razorpay_order_id+'/payments',
        'headers': {
            //There should be space after Basic else you get a BAD REQUEST error
            Authorization:
              "Basic " + new Buffer(key + ":" + key_secret).toString("base64")
          },
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response)
        res.send(response);
    });    
  } else {
    res.send("Payment could not go through");
    res.end();
  }
});

exports.paymentApi = functions.https.onRequest(app);