// // // // // // // // // const express = require("express");
// // // // // // // // // const axios = require("axios");
// // // // // // // // // const bodyParser = require("body-parser");
// // // // // // // // // require("dotenv").config();

// // // // // // // // // const app = express();
// // // // // // // // // app.use(bodyParser.json());

// // // // // // // // // // Helper function to generate the OAuth token
// // // // // // // // // const generateToken = async () => {
// // // // // // // // //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// // // // // // // // //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// // // // // // // // //   try {
// // // // // // // // //     const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
// // // // // // // // //       headers: { Authorization: `Basic ${auth}` },
// // // // // // // // //     });
// // // // // // // // //     return response.data.access_token;
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error generating token:", error.response.data);
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // // Route to initiate the STK Push
// // // // // // // // // app.post("/stkpush", async (req, res) => {
// // // // // // // // //   const token = await generateToken();
// // // // // // // // //   const { phoneNumber, amount } = req.body;  // Accept phone number and amount from client request
// // // // // // // // //   const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // // // // // // // //   // Prepare the necessary parameters
// // // // // // // // //   const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // // // // // //   const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

// // // // // // // // //   const stkPushData = {
// // // // // // // // //     BusinessShortCode: BUSINESS_SHORT_CODE,
// // // // // // // // //     Password: password,
// // // // // // // // //     Timestamp: timestamp,
// // // // // // // // //     TransactionType: "CustomerPayBillOnline",
// // // // // // // // //     Amount: amount,
// // // // // // // // //     PartyA: phoneNumber,
// // // // // // // // //     PartyB: BUSINESS_SHORT_CODE,
// // // // // // // // //     PhoneNumber: phoneNumber,
// // // // // // // // //     CallBackURL: CALLBACK_URL,
// // // // // // // // //     AccountReference: "Test Payment",
// // // // // // // // //     TransactionDesc: "Payment for goods",
// // // // // // // // //   };

// // // // // // // // //   try {
// // // // // // // // //     const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", stkPushData, {
// // // // // // // // //       headers: { Authorization: `Bearer ${token}` },
// // // // // // // // //     });
// // // // // // // // //     res.status(200).json(response.data);
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Error sending STK Push:", error.response.data);
// // // // // // // // //     res.status(500).json({ error: "Failed to send STK Push" });
// // // // // // // // //   }
// // // // // // // // //   console.log('Request received at /stkpush:', req.body);
// // // // // // // // // });

// // // // // // // // // // Callback URL for Safaricom to send response
// // // // // // // // // app.post("/callback", (req, res) => {
// // // // // // // // //   console.log("STK Push Callback:", req.body);
// // // // // // // // //   res.status(200).send("Callback received");
// // // // // // // // // });

// // // // // // // // // // Start the server
// // // // // // // // // app.listen(3000, () => {
// // // // // // // // //   console.log("Server running on http://localhost:3000");
// // // // // // // // // });
// // // // // // // // //nWorking version with esp
// // // // // // // // const express = require("express");
// // // // // // // // const axios = require("axios");
// // // // // // // // const bodyParser = require("body-parser");
// // // // // // // // require("dotenv").config();

// // // // // // // // const app = express();
// // // // // // // // app.use(bodyParser.json());

// // // // // // // // // Helper function to generate the OAuth token
// // // // // // // // const generateToken = async () => {
// // // // // // // //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// // // // // // // //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// // // // // // // //   try {
// // // // // // // //     const response = await axios.get(
// // // // // // // //       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
// // // // // // // //       {
// // // // // // // //         headers: { Authorization: `Basic ${auth}` },
// // // // // // // //       }
// // // // // // // //     );
// // // // // // // //     return response.data.access_token;
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Error generating token:", error.response.data);
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // // Route to initiate the STK Push via POST (from Postman or other apps)
// // // // // // // // app.post("/stkpush", async (req, res) => {
// // // // // // // //   const token = await generateToken();
// // // // // // // //   const { phoneNumber, amount } = req.body; // Accept phone number and amount from client request
// // // // // // // //   const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // // // // // // //   // Prepare the necessary parameters
// // // // // // // //   const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // // // // //   const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

// // // // // // // //   const stkPushData = {
// // // // // // // //     BusinessShortCode: BUSINESS_SHORT_CODE,
// // // // // // // //     Password: password,
// // // // // // // //     Timestamp: timestamp,
// // // // // // // //     TransactionType: "CustomerPayBillOnline",
// // // // // // // //     Amount: amount,
// // // // // // // //     PartyA: phoneNumber,
// // // // // // // //     PartyB: BUSINESS_SHORT_CODE,
// // // // // // // //     PhoneNumber: phoneNumber,
// // // // // // // //     CallBackURL: CALLBACK_URL,
// // // // // // // //     AccountReference: "Test Payment",
// // // // // // // //     TransactionDesc: "Payment for goods",
// // // // // // // //   };

// // // // // // // //   try {
// // // // // // // //     const response = await axios.post(
// // // // // // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// // // // // // // //       stkPushData,
// // // // // // // //       {
// // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // //       }
// // // // // // // //     );
// // // // // // // //     res.status(200).json(response.data);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Error sending STK Push:", error.response.data);
// // // // // // // //     res.status(500).json({ error: "Failed to send STK Push" });
// // // // // // // //   }
// // // // // // // //   console.log("Request received at /stkpush:", req.body);
// // // // // // // // });

// // // // // // // // // Route to initiate the STK Push via GET (from ESP8266)
// // // // // // // // app.get("/stkpush", async (req, res) => {
// // // // // // // //   const token = await generateToken();
// // // // // // // //   const { phoneNumber, amount } = req.query; // Accept phone number and amount from query parameters
// // // // // // // //   const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // // // // // // //   // Prepare the necessary parameters
// // // // // // // //   const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // // // // //   const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

// // // // // // // //   const stkPushData = {
// // // // // // // //     BusinessShortCode: BUSINESS_SHORT_CODE,
// // // // // // // //     Password: password,
// // // // // // // //     Timestamp: timestamp,
// // // // // // // //     TransactionType: "CustomerPayBillOnline",
// // // // // // // //     Amount: amount,
// // // // // // // //     PartyA: phoneNumber,
// // // // // // // //     PartyB: BUSINESS_SHORT_CODE,
// // // // // // // //     PhoneNumber: phoneNumber,
// // // // // // // //     CallBackURL: CALLBACK_URL,
// // // // // // // //     AccountReference: "Test Payment",
// // // // // // // //     TransactionDesc: "Payment for goods",
// // // // // // // //   };

// // // // // // // //   try {
// // // // // // // //     const response = await axios.post(
// // // // // // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// // // // // // // //       stkPushData,
// // // // // // // //       {
// // // // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // // // //       }
// // // // // // // //     );
// // // // // // // //     res.status(200).json(response.data);
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("Error sending STK Push:", error.response.data);
// // // // // // // //     res.status(500).json({ error: "Failed to send STK Push" });
// // // // // // // //   }
// // // // // // // //   console.log("Request received at /stkpush via GET:", req.query);
// // // // // // // // });

// // // // // // // // // Callback URL for Safaricom to send response
// // // // // // // // app.post("/callback", (req, res) => {
// // // // // // // //   console.log("STK Push Callback:", req.body);
// // // // // // // //   res.status(200).send("Callback received");
// // // // // // // // });

// // // // // // // // // Start the server
// // // // // // // // app.listen(3000, () => {
// // // // // // // //   console.log("Server running on http://localhost:3000");
// // // // // // // // });



// // // // // // const express = require("express");
// // // // // // const axios = require("axios");
// // // // // // const bodyParser = require("body-parser");
// // // // // // const sqlite3 = require("sqlite3").verbose();
// // // // // // require("dotenv").config();
// // // // // // const ngrok = require("ngrok"); // Optional for local callback testing

// // // // // // const app = express();
// // // // // // app.use(bodyParser.json());

// // // // // // // Database setup
// // // // // // const db = new sqlite3.Database("transactions.db");

// // // // // // db.serialize(() => {
// // // // // //   db.run(`
// // // // // //     CREATE TABLE IF NOT EXISTS transactions (
// // // // // //       id INTEGER PRIMARY KEY AUTOINCREMENT,
// // // // // //       phoneNumber TEXT,
// // // // // //       amount REAL,
// // // // // //       requestId TEXT,
// // // // // //       checkoutRequestId TEXT,
// // // // // //       timestamp TEXT,
// // // // // //       status TEXT DEFAULT 'Pending',
// // // // // //       responseDescription TEXT
// // // // // //     )
// // // // // //   `);
// // // // // // });

// // // // // // // Helper function to generate the OAuth token
// // // // // // const generateToken = async () => {
// // // // // //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// // // // // //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// // // // // //   try {
// // // // // //     const response = await axios.get(
// // // // // //       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
// // // // // //       {
// // // // // //         headers: { Authorization: `Basic ${auth}` },
// // // // // //       }
// // // // // //     );
// // // // // //     return response.data.access_token;
// // // // // //   } catch (error) {
// // // // // //     console.error("Error generating token:", error.response?.data || error.message);
// // // // // //   }
// // // // // // };

// // // // // // // Route to initiate the STK Push via POST
// // // // // // app.post("/stkpush", async (req, res) => {
// // // // // //   const token = await generateToken();
// // // // // //   const { phoneNumber, amount } = req.body;
// // // // // //   const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // // // // //   const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // // //   const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

// // // // // //   const stkPushData = {
// // // // // //     BusinessShortCode: BUSINESS_SHORT_CODE,
// // // // // //     Password: password,
// // // // // //     Timestamp: timestamp,
// // // // // //     TransactionType: "CustomerPayBillOnline",
// // // // // //     Amount: amount,
// // // // // //     PartyA: phoneNumber,
// // // // // //     PartyB: BUSINESS_SHORT_CODE,
// // // // // //     PhoneNumber: phoneNumber,
// // // // // //     CallBackURL: CALLBACK_URL,
// // // // // //     AccountReference: "Test Payment",
// // // // // //     TransactionDesc: "Payment for goods",
// // // // // //   };

// // // // // //   try {
// // // // // //     const response = await axios.post(
// // // // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// // // // // //       stkPushData,
// // // // // //       {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       }
// // // // // //     );

// // // // // //     const { MerchantRequestID, CheckoutRequestID, ResponseDescription } = response.data;

// // // // // //     // Insert transaction into the database
// // // // // //     db.run(
// // // // // //       `INSERT INTO transactions (phoneNumber, amount, requestId, checkoutRequestId, timestamp, status, responseDescription)
// // // // // //        VALUES (?, ?, ?, ?, ?, ?, ?)`,
// // // // // //       [phoneNumber, amount, MerchantRequestID, CheckoutRequestID, new Date().toISOString(), "Pending", ResponseDescription]
// // // // // //     );

// // // // // //     res.status(200).json(response.data);
// // // // // //   } catch (error) {
// // // // // //     console.error("Error sending STK Push:", error.response?.data || error.message);
// // // // // //     res.status(500).json({ error: "Failed to send STK Push" });
// // // // // //   }
// // // // // // });

// // // // // // // Callback URL for Safaricom to send response
// // // // // // app.post("/callback", (req, res) => {
// // // // // //   const callbackData = req.body;

// // // // // //   if (callbackData.Body?.stkCallback) {
// // // // // //     const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = callbackData.Body.stkCallback;

// // // // // //     // Update transaction status in the database
// // // // // //     const status = ResultCode === 0 ? "Successful" : "Failed";

// // // // // //     db.run(
// // // // // //       `UPDATE transactions SET status = ?, responseDescription = ? WHERE checkoutRequestId = ?`,
// // // // // //       [status, ResultDesc, CheckoutRequestID],
// // // // // //       function (err) {
// // // // // //         if (err) {
// // // // // //           console.error("Error updating transaction:", err);
// // // // // //         } else {
// // // // // //           console.log(`Transaction ${CheckoutRequestID} updated with status: ${status}`);
// // // // // //         }
// // // // // //       }
// // // // // //     );
// // // // // //   }

// // // // // //   res.status(200).send("Callback received");
// // // // // // });

// // // // // // // Route to manually query transaction status
// // // // // // app.get("/transaction-status/:checkoutRequestId", async (req, res) => {
// // // // // //   const token = await generateToken();
// // // // // //   const { checkoutRequestId } = req.params;

// // // // // //   try {
// // // // // //     const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // // //     const password = Buffer.from(`${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`).toString("base64");

// // // // // //     const response = await axios.post(
// // // // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
// // // // // //       {
// // // // // //         BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
// // // // // //         Password: password,
// // // // // //         Timestamp: timestamp,
// // // // // //         CheckoutRequestID: checkoutRequestId,
// // // // // //       },
// // // // // //       {
// // // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // // //       }
// // // // // //     );

// // // // // //     const { ResultCode, ResultDesc } = response.data;
// // // // // //     const status = ResultCode === 0 ? "Successful" : "Failed";

// // // // // //     db.run(
// // // // // //       `UPDATE transactions SET status = ?, responseDescription = ? WHERE checkoutRequestId = ?`,
// // // // // //       [status, ResultDesc, checkoutRequestId]
// // // // // //     );

// // // // // //     res.json({ status, message: ResultDesc });
// // // // // //   } catch (error) {
// // // // // //     console.error("Transaction status query error:", error.response?.data || error.message);
// // // // // //     res.status(500).json({ error: "Failed to fetch transaction status" });
// // // // // //   }
// // // // // // });

// // // // // // // Periodically mark pending transactions as "Timed Out"
// // // // // // setInterval(() => {
// // // // // //   db.run(
// // // // // //     `UPDATE transactions SET status = ? WHERE status = ? AND datetime(timestamp) <= datetime('now', '-5 minutes')`,
// // // // // //     ["Timed Out", "Pending"],
// // // // // //     function (err) {
// // // // // //       if (err) {
// // // // // //         console.error("Error updating timed-out transactions:", err);
// // // // // //       } else if (this.changes > 0) {
// // // // // //         console.log(`${this.changes} pending transactions marked as timed out.`);
// // // // // //       }
// // // // // //     }
// // // // // //   );
// // // // // // },  35 * 1000); // Run every 35 seconds

// // // // // // // Retrieve all transactions
// // // // // // app.get("/transactions", (req, res) => {
// // // // // //   db.all("SELECT * FROM transactions", (err, rows) => {
// // // // // //     if (err) {
// // // // // //       res.status(500).json({ error: "Failed to retrieve transactions" });
// // // // // //     } else {
// // // // // //       res.json(rows);
// // // // // //     }
// // // // // //   });
// // // // // // });

// // // // // // // Start the server
// // // // // // app.listen(3000, async () => {
// // // // // //   console.log("Server running on http://localhost:3000");
// // // // // //   console.log("Starting Ngrok for callback testing...");
// // // // // //   const url = await ngrok.connect(3000);
// // // // // //   console.log(`Ngrok tunnel created at: ${url}`);
// // // // // // });
// // // // // const express = require("express");
// // // // // const axios = require("axios");
// // // // // const bodyParser = require("body-parser");
// // // // // const sqlite3 = require("sqlite3").verbose();
// // // // // require("dotenv").config();
// // // // // const ngrok = require("ngrok"); // Optional for local callback testing
// // // // // const fs = require("fs");
// // // // // const path = require("path");

// // // // // const app = express();
// // // // // app.use(bodyParser.json());

// // // // // // Database setup
// // // // // const db = new sqlite3.Database("transactions.db");

// // // // // db.serialize(() => {
// // // // //   db.run(`
// // // // //     CREATE TABLE IF NOT EXISTS transactions (
// // // // //       id INTEGER PRIMARY KEY AUTOINCREMENT,
// // // // //       phoneNumber TEXT,
// // // // //       amount REAL,
// // // // //       requestId TEXT,
// // // // //       checkoutRequestId TEXT,
// // // // //       timestamp TEXT,
// // // // //       status TEXT DEFAULT 'Pending',
// // // // //       responseDescription TEXT
// // // // //     )
// // // // //   `);
// // // // // });

// // // // // // Helper function to generate the OAuth token
// // // // // const generateToken = async () => {
// // // // //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// // // // //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// // // // //   try {
// // // // //     const response = await axios.get(
// // // // //       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
// // // // //       {
// // // // //         headers: { Authorization: `Basic ${auth}` },
// // // // //       }
// // // // //     );
// // // // //     return response.data.access_token;
// // // // //   } catch (error) {
// // // // //     console.error("Error generating token:", error.response?.data || error.message);
// // // // //   }
// // // // // };

// // // // // // Route to initiate the STK Push via POST
// // // // // app.post("/stkpush", async (req, res) => {
// // // // //   const token = await generateToken();
// // // // //   const { phoneNumber, amount } = req.body;
// // // // //   const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // // // //   const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // //   const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

// // // // //   const stkPushData = {
// // // // //     BusinessShortCode: BUSINESS_SHORT_CODE,
// // // // //     Password: password,
// // // // //     Timestamp: timestamp,
// // // // //     TransactionType: "CustomerPayBillOnline",
// // // // //     Amount: amount,
// // // // //     PartyA: phoneNumber,
// // // // //     PartyB: BUSINESS_SHORT_CODE,
// // // // //     PhoneNumber: phoneNumber,
// // // // //     CallBackURL: CALLBACK_URL,
// // // // //     AccountReference: "Test Payment",
// // // // //     TransactionDesc: "Payment for goods",
// // // // //   };

// // // // //   try {
// // // // //     const response = await axios.post(
// // // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// // // // //       stkPushData,
// // // // //       {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       }
// // // // //     );

// // // // //     const { MerchantRequestID, CheckoutRequestID, ResponseDescription } = response.data;

// // // // //     // Insert transaction into the database
// // // // //     db.run(
// // // // //       `INSERT INTO transactions (phoneNumber, amount, requestId, checkoutRequestId, timestamp, status, responseDescription)
// // // // //        VALUES (?, ?, ?, ?, ?, ?, ?)`,
// // // // //       [phoneNumber, amount, MerchantRequestID, CheckoutRequestID, new Date().toISOString(), "Pending", ResponseDescription]
// // // // //     );

// // // // //     res.status(200).json(response.data);
// // // // //   } catch (error) {
// // // // //     console.error("Error sending STK Push:", error.response?.data || error.message);
// // // // //     res.status(500).json({ error: "Failed to send STK Push" });
// // // // //   }
// // // // // });

// // // // // // Callback URL for Safaricom to send response
// // // // // app.post("/callback", (req, res) => {
// // // // //   const callbackData = req.body;

// // // // //   if (callbackData.Body?.stkCallback) {
// // // // //     const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = callbackData.Body.stkCallback;

// // // // //     // Update transaction status in the database
// // // // //     const status = ResultCode === 0 ? "Successful" : "Failed";

// // // // //     db.run(
// // // // //       `UPDATE transactions SET status = ?, responseDescription = ? WHERE checkoutRequestId = ?`,
// // // // //       [status, ResultDesc, CheckoutRequestID],
// // // // //       function (err) {
// // // // //         if (err) {
// // // // //           console.error("Error updating transaction:", err);
// // // // //         } else {
// // // // //           console.log(`Transaction ${CheckoutRequestID} updated with status: ${status}`);
// // // // //         }
// // // // //       }
// // // // //     );
// // // // //   }

// // // // //   res.status(200).send("Callback received");
// // // // // });

// // // // // // Route to manually query transaction status
// // // // // app.get("/transaction-status/:checkoutRequestId", async (req, res) => {
// // // // //   const token = await generateToken();
// // // // //   const { checkoutRequestId } = req.params;

// // // // //   try {
// // // // //     const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // // //     const password = Buffer.from(`${process.env.BUSINESS_SHORT_CODE}${process.env.PASSKEY}${timestamp}`).toString("base64");

// // // // //     const response = await axios.post(
// // // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
// // // // //       {
// // // // //         BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
// // // // //         Password: password,
// // // // //         Timestamp: timestamp,
// // // // //         CheckoutRequestID: checkoutRequestId,
// // // // //       },
// // // // //       {
// // // // //         headers: { Authorization: `Bearer ${token}` },
// // // // //       }
// // // // //     );

// // // // //     const { ResultCode, ResultDesc } = response.data;
// // // // //     const status = ResultCode === 0 ? "Successful" : "Failed";

// // // // //     db.run(
// // // // //       `UPDATE transactions SET status = ?, responseDescription = ? WHERE checkoutRequestId = ?`,
// // // // //       [status, ResultDesc, checkoutRequestId]
// // // // //     );

// // // // //     res.json({ status, message: ResultDesc });
// // // // //   } catch (error) {
// // // // //     console.error("Transaction status query error:", error.response?.data || error.message);
// // // // //     res.status(500).json({ error: "Failed to fetch transaction status" });
// // // // //   }
// // // // // });

// // // // // // Periodically mark pending transactions as "Timed Out"
// // // // // setInterval(() => {
// // // // //   db.run(
// // // // //     `UPDATE transactions SET status = ? WHERE status = ? AND datetime(timestamp) <= datetime('now', '-35 seconds')`,
// // // // //     ["Timed Out", "Pending"],
// // // // //     function (err) {
// // // // //       if (err) {
// // // // //         console.error("Error updating timed-out transactions:", err);
// // // // //       } else if (this.changes > 0) {
// // // // //         console.log(`${this.changes} pending transactions marked as timed out.`);
// // // // //       }
// // // // //     }
// // // // //   );
// // // // // }, 35 * 1000); // Run every 35 seconds

// // // // // // Retrieve all transactions
// // // // // app.get("/transactions", (req, res) => {
// // // // //   db.all("SELECT * FROM transactions", (err, rows) => {
// // // // //     if (err) {
// // // // //       res.status(500).json({ error: "Failed to retrieve transactions" });
// // // // //     } else {
// // // // //       res.json(rows);
// // // // //     }
// // // // //   });
// // // // // });

// // // // // // Start the server and Ngrok
// // // // // app.listen(3000, async () => {
// // // // //   console.log("Server running on http://localhost:3000");

// // // // //   // Starting Ngrok for callback testing
// // // // //   const url = await ngrok.connect(3000);
// // // // //   console.log(`Ngrok tunnel created at: ${url}`);

// // // // //   // Automatically update the .env file with the new callback URL
// // // // //   const envFilePath = path.resolve(__dirname, ".env");
// // // // //   let envFileContent = fs.readFileSync(envFilePath, "utf8");

// // // // //   // Replace the CALLBACK_URL in the .env file
// // // // //   const updatedEnvFileContent = envFileContent.replace(
// // // // //     /CALLBACK_URL=.*/g,
// // // // //     `CALLBACK_URL=${url}/callback`
// // // // //   );

// // // // //   // Write the updated content back to the .env file
// // // // //   fs.writeFileSync(envFilePath, updatedEnvFileContent);
// // // // // });

// // // // /*sql database included*/

// // // // const express = require("express");
// // // // const axios = require("axios");
// // // // const bodyParser = require("body-parser");
// // // // const sqlite3 = require("sqlite3").verbose();
// // // // require("dotenv").config();

// // // // const app = express();
// // // // app.use(bodyParser.json());

// // // // // Database setup
// // // // const db = new sqlite3.Database("transactions.db");

// // // // db.serialize(() => {
// // // //   db.run(`
// // // //     CREATE TABLE IF NOT EXISTS transactions (
// // // //       id INTEGER PRIMARY KEY AUTOINCREMENT,
// // // //       phoneNumber TEXT,
// // // //       amount REAL,
// // // //       requestId TEXT,
// // // //       checkoutRequestId TEXT,
// // // //       timestamp TEXT,
// // // //       status TEXT DEFAULT 'Pending',
// // // //       responseDescription TEXT
// // // //     )
// // // //   `);
// // // // });

// // // // // Helper function to generate the OAuth token
// // // // const generateToken = async () => {
// // // //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// // // //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// // // //   try {
// // // //     const response = await axios.get(
// // // //       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
// // // //       {
// // // //         headers: { Authorization: `Basic ${auth}` },
// // // //       }
// // // //     );
// // // //     return response.data.access_token;
// // // //   } catch (error) {
// // // //     console.error("Error generating token:", error.response.data);
// // // //   }
// // // // };

// // // // // Route to initiate the STK Push via POST
// // // // app.post("/stkpush", async (req, res) => {
// // // //   const token = await generateToken();
// // // //   const { phoneNumber, amount } = req.body;
// // // //   const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // // //   const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
// // // //   const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

// // // //   const stkPushData = {
// // // //     BusinessShortCode: BUSINESS_SHORT_CODE,
// // // //     Password: password,
// // // //     Timestamp: timestamp,
// // // //     TransactionType: "CustomerPayBillOnline",
// // // //     Amount: amount,
// // // //     PartyA: phoneNumber,
// // // //     PartyB: BUSINESS_SHORT_CODE,
// // // //     PhoneNumber: phoneNumber,
// // // //     CallBackURL: CALLBACK_URL,
// // // //     AccountReference: "Test Payment",
// // // //     TransactionDesc: "Payment for goods",
// // // //   };

// // // //   try {
// // // //     const response = await axios.post(
// // // //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// // // //       stkPushData,
// // // //       {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       }
// // // //     );

// // // //     const { MerchantRequestID, CheckoutRequestID, ResponseDescription } = response.data;

// // // //     // Insert transaction into the database
// // // //     db.run(
// // // //       `INSERT INTO transactions (phoneNumber, amount, requestId, checkoutRequestId, timestamp, status, responseDescription)
// // // //        VALUES (?, ?, ?, ?, ?, ?, ?)`,
// // // //       [phoneNumber, amount, MerchantRequestID, CheckoutRequestID, new Date().toISOString(), "Pending", ResponseDescription]
// // // //     );

// // // //     res.status(200).json(response.data);
// // // //   } catch (error) {
// // // //     console.error("Error sending STK Push:", error.response?.data || error.message);
// // // //     res.status(500).json({ error: "Failed to send STK Push" });
// // // //   }
// // // // });

// // // // // Callback URL for Safaricom to send response
// // // // app.post("/callback", (req, res) => {
// // // //   const callbackData = req.body;

// // // //   if (callbackData.Body?.stkCallback) {
// // // //     const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = callbackData.Body.stkCallback;

// // // //     // Update transaction status in the database
// // // //     const status = ResultCode === 0 ? "Successful" : "Failed";

// // // //     db.run(
// // // //       `UPDATE transactions SET status = ?, responseDescription = ? WHERE checkoutRequestId = ?`,
// // // //       [status, ResultDesc, CheckoutRequestID],
// // // //       function (err) {
// // // //         if (err) {
// // // //           console.error("Error updating transaction:", err);
// // // //         } else {
// // // //           console.log(`Transaction ${CheckoutRequestID} updated with status: ${status}`);
// // // //         }
// // // //       }
// // // //     );
// // // //   }

// // // //   res.status(200).send("Callback received");
// // // // });

// // // // // Retrieve all transactions
// // // // app.get("/transactions", (req, res) => {
// // // //   db.all("SELECT * FROM transactions", (err, rows) => {
// // // //     if (err) {
// // // //       res.status(500).json({ error: "Failed to retrieve transactions" });
// // // //     } else {
// // // //       res.json(rows);
// // // //     }
// // // //   });
// // // // });

// // // // // Start the server
// // // // app.listen(3000, () => {
// // // //   console.log("Server running on http://localhost:3000");
// // // // });

// // // //claude.ai

// // // const express = require("express");
// // // const axios = require("axios");
// // // const bodyParser = require("body-parser");
// // // const sqlite3 = require("sqlite3").verbose();
// // // require("dotenv").config();

// // // const app = express();
// // // app.use(bodyParser.json());

// // // // Database setup with better schema migration
// // // const db = new sqlite3.Database("transactions.db", (err) => {
// // //   if (err) {
// // //     console.error('Error opening database:', err);
// // //     process.exit(1);
// // //   }
// // // });

// // // // Create or update schema
// // // db.serialize(() => {
// // //   // Drop existing table if you want to start fresh
// // //   // db.run("DROP TABLE IF EXISTS transactions");
  
// // //   // Create table with all columns
// // //   db.run(`
// // //     CREATE TABLE IF NOT EXISTS transactions (
// // //       id INTEGER PRIMARY KEY AUTOINCREMENT,
// // //       phoneNumber TEXT,
// // //       amount REAL,
// // //       requestId TEXT,
// // //       checkoutRequestId TEXT,
// // //       timestamp TEXT,
// // //       status TEXT DEFAULT 'Pending',
// // //       responseDescription TEXT,
// // //       timeout_at TEXT,
// // //       mpesa_receipt_number TEXT,
// // //       transaction_date TEXT
// // //     )
// // //   `, (err) => {
// // //     if (err) {
// // //       console.error('Error creating table:', err);
// // //       process.exit(1);
// // //     }
// // //   });
// // // });

// // // // Helper function to generate the OAuth token
// // // const generateToken = async () => {
// // //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// // //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// // //   try {
// // //     const response = await axios.get(
// // //       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
// // //       {
// // //         headers: { Authorization: `Basic ${auth}` },
// // //       }
// // //     );
// // //     return response.data.access_token;
// // //   } catch (error) {
// // //     console.error("Error generating token:", error.response?.data || error);
// // //     throw new Error("Failed to generate token");
// // //   }
// // // };

// // // // Validate phone number format
// // // const isValidPhoneNumber = (phoneNumber) => {
// // //   return /^254\d{9}$/.test(phoneNumber);
// // // };

// // // // Validate amount
// // // const isValidAmount = (amount) => {
// // //   return amount >= 1 && amount <= 150000;
// // // };

// // // // Route to initiate the STK Push via POST
// // // app.post("/stkpush", async (req, res) => {
// // //   try {
// // //     const { phoneNumber, amount } = req.body;

// // //     // Input validation
// // //     if (!isValidPhoneNumber(phoneNumber)) {
// // //       return res.status(400).json({ 
// // //         error: "Invalid phone number format. Must start with 254 followed by 9 digits" 
// // //       });
// // //     }

// // //     if (!isValidAmount(amount)) {
// // //       return res.status(400).json({ 
// // //         error: "Amount must be between 1 and 150000 KES" 
// // //       });
// // //     }

// // //     const token = await generateToken();
// // //     const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// // //     const timestamp = new Date()
// // //       .toISOString()
// // //       .replace(/[-:T]/g, "")
// // //       .slice(0, 14);
    
// // //     const password = Buffer.from(
// // //       `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`
// // //     ).toString("base64");

// // //     const stkPushData = {
// // //       BusinessShortCode: BUSINESS_SHORT_CODE,
// // //       Password: password,
// // //       Timestamp: timestamp,
// // //       TransactionType: "CustomerPayBillOnline",
// // //       Amount: amount,
// // //       PartyA: phoneNumber,
// // //       PartyB: BUSINESS_SHORT_CODE,
// // //       PhoneNumber: phoneNumber,
// // //       CallBackURL: CALLBACK_URL,
// // //       AccountReference: "Test Payment",
// // //       TransactionDesc: "Payment for goods",
// // //     };

// // //     const response = await axios.post(
// // //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// // //       stkPushData,
// // //       {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       }
// // //     );

// // //     const { 
// // //       MerchantRequestID, 
// // //       CheckoutRequestID, 
// // //       ResponseDescription 
// // //     } = response.data;

// // //     // Calculate timeout timestamp (5 minutes from now)
// // //     const timeoutAt = new Date();
// // //     timeoutAt.setMinutes(timeoutAt.getMinutes() + 5);

// // //     // Insert transaction into the database
// // //     db.run(
// // //       `INSERT INTO transactions (
// // //         phoneNumber, 
// // //         amount, 
// // //         requestId, 
// // //         checkoutRequestId, 
// // //         timestamp, 
// // //         status, 
// // //         responseDescription,
// // //         timeout_at
// // //       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
// // //       [
// // //         phoneNumber,
// // //         amount,
// // //         MerchantRequestID,
// // //         CheckoutRequestID,
// // //         new Date().toISOString(),
// // //         "Pending",
// // //         ResponseDescription,
// // //         timeoutAt.toISOString()
// // //       ],
// // //       function(err) {
// // //         if (err) {
// // //           console.error("Error inserting transaction:", err);
// // //           return res.status(500).json({ error: "Failed to save transaction" });
// // //         }
// // //         res.status(200).json({
// // //           ...response.data,
// // //           timeoutAt: timeoutAt.toISOString()
// // //         });
// // //       }
// // //     );
// // //   } catch (error) {
// // //     console.error("Error sending STK Push:", error.response?.data || error);
// // //     res.status(500).json({ 
// // //       error: "Failed to send STK Push",
// // //       details: error.response?.data || error.message 
// // //     });
// // //   }
// // // });

// // // // Callback URL for Safaricom to send response
// // // app.post("/callback", (req, res) => {
// // //   console.log("Received callback data:", JSON.stringify(req.body, null, 2));
  
// // //   const callbackData = req.body;
  
// // //   // Check if the callback data exists and has the expected structure
// // //   if (callbackData.Body && callbackData.Body.stkCallback) {
// // //     const { 
// // //       MerchantRequestID, 
// // //       CheckoutRequestID, 
// // //       ResultCode, 
// // //       ResultDesc,
// // //       CallbackMetadata 
// // //     } = callbackData.Body.stkCallback;

// // //     let status = "Failed";
// // //     let amount = null;
// // //     let mpesaReceiptNumber = null;
// // //     let phoneNumber = null;
// // //     let transactionDate = null;

// // //     // Extract metadata if payment was successful
// // //     if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
// // //       CallbackMetadata.Item.forEach(item => {
// // //         switch(item.Name) {
// // //           case "Amount":
// // //             amount = item.Value;
// // //             break;
// // //           case "MpesaReceiptNumber":
// // //             mpesaReceiptNumber = item.Value;
// // //             break;
// // //           case "PhoneNumber":
// // //             phoneNumber = item.Value;
// // //             break;
// // //           case "TransactionDate":
// // //             transactionDate = item.Value;
// // //             break;
// // //         }
// // //       });
// // //       status = "Successful";
// // //     }

// // //     // Update transaction in database with detailed information
// // //     const updateQuery = `
// // //       UPDATE transactions 
// // //       SET status = ?,
// // //           responseDescription = ?,
// // //           mpesa_receipt_number = ?,
// // //           transaction_date = ?
// // //       WHERE checkoutRequestId = ?`;

// // //     db.run(
// // //       updateQuery,
// // //       [
// // //         status, 
// // //         ResultDesc, 
// // //         mpesaReceiptNumber,
// // //         transactionDate,
// // //         CheckoutRequestID
// // //       ],
// // //       function(err) {
// // //         if (err) {
// // //           console.error("Error updating transaction:", err);
// // //           console.error("Failed update for CheckoutRequestID:", CheckoutRequestID);
// // //         } else {
// // //           console.log(`Transaction ${CheckoutRequestID} updated:`, {
// // //             status,
// // //             ResultDesc,
// // //             mpesaReceiptNumber,
// // //             amount,
// // //             transactionDate
// // //           });
// // //         }
// // //       }
// // //     );
// // //   } else {
// // //     console.error("Invalid callback data structure:", callbackData);
// // //   }

// // //   // Always respond with success to M-Pesa
// // //   res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
// // // });

// // // // Check transaction status endpoint
// // // app.get("/transaction/:checkoutRequestId", (req, res) => {
// // //   const { checkoutRequestId } = req.params;
  
// // //   db.get(
// // //     "SELECT * FROM transactions WHERE checkoutRequestId = ?",
// // //     [checkoutRequestId],
// // //     (err, transaction) => {
// // //       if (err) {
// // //         res.status(500).json({ error: "Failed to retrieve transaction" });
// // //       } else if (!transaction) {
// // //         res.status(404).json({ error: "Transaction not found" });
// // //       } else {
// // //         res.json(transaction);
// // //       }
// // //     }
// // //   );
// // // });

// // // // Get all transactions endpoint
// // // app.get("/transactions", (req, res) => {
// // //   db.all(
// // //     "SELECT * FROM transactions ORDER BY timestamp DESC",
// // //     (err, rows) => {
// // //       if (err) {
// // //         res.status(500).json({ error: "Failed to retrieve transactions" });
// // //       } else {
// // //         res.json(rows);
// // //       }
// // //     }
// // //   );
// // // });

// // // // Check and update timed out transactions
// // // app.get("/check-timeouts", (req, res) => {
// // //   const sql = `
// // //     UPDATE transactions 
// // //     SET status = 'Timeout', 
// // //         responseDescription = 'Transaction timed out'
// // //     WHERE status = 'Pending' 
// // //     AND datetime(timeout_at) <= datetime('now')
// // //   `;
  
// // //   db.run(sql, function(err) {
// // //     if (err) {
// // //       res.status(500).json({ error: "Failed to check timeouts" });
// // //     } else {
// // //       res.json({ 
// // //         message: "Timeout check completed",
// // //         updatedTransactions: this.changes 
// // //       });
// // //     }
// // //   });
// // // });

// // // // Error handling middleware
// // // app.use((err, req, res, next) => {
// // //   console.error("Unhandled error:", err);
// // //   res.status(500).json({ 
// // //     error: "Internal server error",
// // //     message: err.message 
// // //   });
// // // });

// // // // Start the server
// // // const PORT = process.env.PORT || 3000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });

// // // // Graceful shutdown
// // // process.on('SIGTERM', () => {
// // //   db.close(() => {
// // //     console.log('Database connection closed.');
// // //     process.exit(0);
// // //   });
// // // });

// // const express = require("express");
// // const axios = require("axios");
// // const bodyParser = require("body-parser");
// // const sqlite3 = require("sqlite3").verbose();
// // require("dotenv").config();
// // const moment = require('moment-timezone');  // Add moment-timezone for handling timezones

// // const app = express();
// // app.use(bodyParser.json());

// // // Database setup with better schema migration
// // const db = new sqlite3.Database("transactions.db", (err) => {
// //   if (err) {
// //     console.error('Error opening database:', err);
// //     process.exit(1);
// //   }
// // });

// // // Create or update schema
// // db.serialize(() => {
// //   // Drop existing table if you want to start fresh
// //   // db.run("DROP TABLE IF EXISTS transactions");

// //   // Create table with all columns
// //   db.run(`
// //     CREATE TABLE IF NOT EXISTS transactions (
// //       id INTEGER PRIMARY KEY AUTOINCREMENT,
// //       phoneNumber TEXT,
// //       amount REAL,
// //       requestId TEXT,
// //       checkoutRequestId TEXT,
// //       timestamp TEXT,
// //       status TEXT DEFAULT 'Pending',
// //       responseDescription TEXT,
// //       timeout_at TEXT,
// //       mpesa_receipt_number TEXT,
// //       transaction_date TEXT
// //     )
// //   `, (err) => {
// //     if (err) {
// //       console.error('Error creating table:', err);
// //       process.exit(1);
// //     }
// //   });
// // });

// // // Helper function to generate the OAuth token
// // const generateToken = async () => {
// //   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
// //   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

// //   try {
// //     const response = await axios.get(
// //       "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
// //       {
// //         headers: { Authorization: `Basic ${auth}` },
// //       }
// //     );
// //     return response.data.access_token;
// //   } catch (error) {
// //     console.error("Error generating token:", error.response?.data || error);
// //     throw new Error("Failed to generate token");
// //   }
// // };

// // // Validate phone number format
// // const isValidPhoneNumber = (phoneNumber) => {
// //   return /^254\d{9}$/.test(phoneNumber);
// // };

// // // Validate amount
// // const isValidAmount = (amount) => {
// //   return amount >= 1 && amount <= 150000;
// // };

// // // Route to initiate the STK Push via POST
// // app.post("/stkpush", async (req, res) => {
// //   try {
// //     const { phoneNumber, amount } = req.body;

// //     // Input validation
// //     if (!isValidPhoneNumber(phoneNumber)) {
// //       return res.status(400).json({ 
// //         error: "Invalid phone number format. Must start with 254 followed by 9 digits" 
// //       });
// //     }

// //     if (!isValidAmount(amount)) {
// //       return res.status(400).json({ 
// //         error: "Amount must be between 1 and 150000 KES" 
// //       });
// //     }

// //     const token = await generateToken();
// //     const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

// //     const timestamp = moment().tz("Africa/Nairobi").format("YYYYMMDDHHmmss");  // Adjust timestamp to Nairobi timezone
    
// //     const password = Buffer.from(
// //       `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`
// //     ).toString("base64");

// //     const stkPushData = {
// //       BusinessShortCode: BUSINESS_SHORT_CODE,
// //       Password: password,
// //       Timestamp: timestamp,
// //       TransactionType: "CustomerPayBillOnline",
// //       Amount: amount,
// //       PartyA: phoneNumber,
// //       PartyB: BUSINESS_SHORT_CODE,
// //       PhoneNumber: phoneNumber,
// //       CallBackURL: CALLBACK_URL,
// //       AccountReference: "Test Payment",
// //       TransactionDesc: "Payment for goods",
// //     };

// //     const response = await axios.post(
// //       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
// //       stkPushData,
// //       {
// //         headers: { Authorization: `Bearer ${token}` },
// //       }
// //     );

// //     const { 
// //       MerchantRequestID, 
// //       CheckoutRequestID, 
// //       ResponseDescription 
// //     } = response.data;

// //     // Calculate timeout timestamp (5 minutes from now) and convert to Nairobi time
// //     const timeoutAt = moment().tz("Africa/Nairobi").add(5, 'minutes').format(); // Adjust timeout to Nairobi timezone

// //     // Insert transaction into the database
// //     db.run(
// //       `INSERT INTO transactions (
// //         phoneNumber, 
// //         amount, 
// //         requestId, 
// //         checkoutRequestId, 
// //         timestamp, 
// //         status, 
// //         responseDescription,
// //         timeout_at
// //       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
// //       [
// //         phoneNumber,
// //         amount,
// //         MerchantRequestID,
// //         CheckoutRequestID,
// //         moment().tz("Africa/Nairobi").format(),  // Adjust to local time zone
// //         "Pending",
// //         ResponseDescription,
// //         timeoutAt
// //       ],
// //       function(err) {
// //         if (err) {
// //           console.error("Error inserting transaction:", err);
// //           return res.status(500).json({ error: "Failed to save transaction" });
// //         }
// //         res.status(200).json({
// //           ...response.data,
// //           timeoutAt
// //         });
// //       }
// //     );
// //   } catch (error) {
// //     console.error("Error sending STK Push:", error.response?.data || error);
// //     res.status(500).json({ 
// //       error: "Failed to send STK Push",
// //       details: error.response?.data || error.message 
// //     });
// //   }
// // });

// // // Callback URL for Safaricom to send response
// // app.post("/callback", (req, res) => {
// //   console.log("Received callback data:", JSON.stringify(req.body, null, 2));

// //   const callbackData = req.body;
  
// //   // Check if the callback data exists and has the expected structure
// //   if (callbackData.Body && callbackData.Body.stkCallback) {
// //     const { 
// //       MerchantRequestID, 
// //       CheckoutRequestID, 
// //       ResultCode, 
// //       ResultDesc,
// //       CallbackMetadata 
// //     } = callbackData.Body.stkCallback;

// //     let status = "Failed";
// //     let amount = null;
// //     let mpesaReceiptNumber = null;
// //     let phoneNumber = null;
// //     let transactionDate = null;

// //     // Extract metadata if payment was successful
// //     if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
// //       CallbackMetadata.Item.forEach(item => {
// //         switch(item.Name) {
// //           case "Amount":
// //             amount = item.Value;
// //             break;
// //           case "MpesaReceiptNumber":
// //             mpesaReceiptNumber = item.Value;
// //             break;
// //           case "PhoneNumber":
// //             phoneNumber = item.Value;
// //             break;
// //           case "TransactionDate":
// //             transactionDate = item.Value;
// //             break;
// //         }
// //       });
// //       status = "Successful";
// //     }

// //     // Update transaction in database with detailed information
// //     const updateQuery = `
// //       UPDATE transactions 
// //       SET status = ?,
// //           responseDescription = ?,
// //           mpesa_receipt_number = ?,
// //           transaction_date = ?
// //       WHERE checkoutRequestId = ?`;

// //     db.run(
// //       updateQuery,
// //       [
// //         status, 
// //         ResultDesc, 
// //         mpesaReceiptNumber,
// //         transactionDate,
// //         CheckoutRequestID
// //       ],
// //       function(err) {
// //         if (err) {
// //           console.error("Error updating transaction:", err);
// //           console.error("Failed update for CheckoutRequestID:", CheckoutRequestID);
// //         } else {
// //           console.log(`Transaction ${CheckoutRequestID} updated:`, {
// //             status,
// //             ResultDesc,
// //             mpesaReceiptNumber,
// //             amount,
// //             transactionDate
// //           });
// //         }
// //       }
// //     );
// //   } else {
// //     console.error("Invalid callback data structure:", callbackData);
// //   }

// //   // Always respond with success to M-Pesa
// //   res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
// // });

// // // Check transaction status endpoint
// // app.get("/transaction/:checkoutRequestId", (req, res) => {
// //   const { checkoutRequestId } = req.params;
  
// //   db.get(
// //     "SELECT * FROM transactions WHERE checkoutRequestId = ?",
// //     [checkoutRequestId],
// //     (err, transaction) => {
// //       if (err) {
// //         res.status(500).json({ error: "Failed to retrieve transaction" });
// //       } else if (!transaction) {
// //         res.status(404).json({ error: "Transaction not found" });
// //       } else {
// //         res.json(transaction);
// //       }
// //     }
// //   );
// // });

// // // Get all transactions endpoint
// // app.get("/transactions", (req, res) => {
// //   db.all(
// //     "SELECT * FROM transactions ORDER BY timestamp DESC",
// //     (err, rows) => {
// //       if (err) {
// //         res.status(500).json({ error: "Failed to retrieve transactions" });
// //       } else {
// //         res.json(rows);
// //       }
// //     }
// //   );
// // });

// // // Check and update timed out transactions
// // app.get("/check-timeouts", (req, res) => {
// //   const sql = `
// //     UPDATE transactions 
// //     SET status = 'Timeout', 
// //         responseDescription = 'Transaction timed out'
// //     WHERE status = 'Pending' 
// //     AND datetime(timeout_at) <= datetime('now')
// //   `;
  
// //   db.run(sql, function(err) {
// //     if (err) {
// //       res.status(500).json({ error: "Failed to check timeouts" });
// //     } else {
// //       res.json({ 
// //         message: "Timeout check completed",
// //         updatedTransactions: this.changes 
// //       });
// //     }
// //   });
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error("Unhandled error:", err);
// //   res.status(500).json({ error: "An unexpected error occurred" });
// // });

// // // Start server
// // //const port = process.env.PORT || 3000;
// // // app.listen(port, () => {
// // //   console.log(`Server running on port ${port}`);
// // // }
// // // Start server
// // const port = process.env.PORT || 3000;
// // app.listen(port, '0.0.0.0', () => {
// //   console.log(`Server running on port ${port}`);
// // });

// const express = require("express");
// const axios = require("axios");
// const bodyParser = require("body-parser");
// const sqlite3 = require("sqlite3").verbose();
// const moment = require("moment-timezone");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// app.use(bodyParser.json());

// const db = new sqlite3.Database("transactions.db", (err) => {
//   if (err) {
//     console.error("Error opening database:", err);
//     process.exit(1);
//   }
// });

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS transactions (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       phoneNumber TEXT,
//       amount REAL,
//       requestId TEXT,
//       checkoutRequestId TEXT,
//       timestamp TEXT,
//       status TEXT DEFAULT 'Pending',
//       responseDescription TEXT,
//       timeout_at TEXT,
//       mpesa_receipt_number TEXT,
//       transaction_date TEXT
//     )
//   `);
// });

// // Serve the cards.json
// app.get("/cards", (req, res) => {
//   const filePath = path.join(__dirname,"cards.json");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading cards.json:", err);
//       return res.status(500).json({ error: "Failed to load card data" });
//     }
//     res.setHeader("Content-Type", "application/json");
//     res.send(data);
//   });
// });

// // Generate Safaricom OAuth Token
// const generateToken = async () => {
//   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
//   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

//   const response = await axios.get(
//     "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//     {
//       headers: { Authorization: `Basic ${auth}` },
//     }
//   );
//   return response.data.access_token;
// };

// // Validate helpers
// const isValidPhoneNumber = (phoneNumber) => /^254\d{9}$/.test(phoneNumber);
// const isValidAmount = (amount) => amount >= 1 && amount <= 150000;

// // STK Push Route
// app.post("/stkpush", async (req, res) => {
//   try {
//     const { phoneNumber, amount } = req.body;
//     if (!isValidPhoneNumber(phoneNumber)) {
//       return res.status(400).json({ error: "Phone number must start with 254" });
//     }
//     if (!isValidAmount(amount)) {
//       return res.status(400).json({ error: "Amount must be between 1 and 150000" });
//     }

//     const token = await generateToken();
//     const { BUSINESS_SHORT_CODE, PASSKEY, CALLBACK_URL } = process.env;

//     const timestamp = moment().tz("Africa/Nairobi").format("YYYYMMDDHHmmss");
//     const password = Buffer.from(`${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`).toString("base64");

//     const stkPushData = {
//       BusinessShortCode: BUSINESS_SHORT_CODE,
//       Password: password,
//       Timestamp: timestamp,
//       TransactionType: "CustomerPayBillOnline",
//       Amount: amount,
//       PartyA: phoneNumber,
//       PartyB: BUSINESS_SHORT_CODE,
//       PhoneNumber: phoneNumber,
//       CallBackURL: CALLBACK_URL,
//       AccountReference: "RFID Payment",
//       TransactionDesc: "RFID Triggered Payment"
//     };

//     const response = await axios.post(
//       "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//       stkPushData,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const { MerchantRequestID, CheckoutRequestID, ResponseDescription } = response.data;
//     const timeoutAt = moment().tz("Africa/Nairobi").add(5, "minutes").format();

//     db.run(
//       `INSERT INTO transactions (
//         phoneNumber, amount, requestId, checkoutRequestId, timestamp, status, responseDescription, timeout_at
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         phoneNumber,
//         amount,
//         MerchantRequestID,
//         CheckoutRequestID,
//         moment().tz("Africa/Nairobi").format(),
//         "Pending",
//         ResponseDescription,
//         timeoutAt
//       ],
//       function (err) {
//         if (err) {
//           console.error("DB Insert Error:", err);
//           return res.status(500).json({ error: "Failed to save transaction" });
//         }
//         res.status(200).json({ ...response.data, timeoutAt });
//       }
//     );
//   } catch (error) {
//     console.error("STK Push Error:", error.response?.data || error);
//     res.status(500).json({
//       error: "Failed to send STK Push",
//       details: error.response?.data || error.message
//     });
//   }
// });

// // M-Pesa Callback
// app.post("/callback", (req, res) => {
//   const callbackData = req.body;

//   if (callbackData?.Body?.stkCallback) {
//     const {
//       MerchantRequestID,
//       CheckoutRequestID,
//       ResultCode,
//       ResultDesc,
//       CallbackMetadata
//     } = callbackData.Body.stkCallback;

//     let status = "Failed";
//     let amount = null;
//     let mpesaReceiptNumber = null;
//     let phoneNumber = null;
//     let transactionDate = null;

//     if (ResultCode === 0 && CallbackMetadata?.Item) {
//       CallbackMetadata.Item.forEach(item => {
//         switch (item.Name) {
//           case "Amount": amount = item.Value; break;
//           case "MpesaReceiptNumber": mpesaReceiptNumber = item.Value; break;
//           case "PhoneNumber": phoneNumber = item.Value; break;
//           case "TransactionDate": transactionDate = item.Value; break;
//         }
//       });
//       status = "Successful";
//     }

//     const updateQuery = `
//       UPDATE transactions 
//       SET status = ?, responseDescription = ?, mpesa_receipt_number = ?, transaction_date = ?
//       WHERE checkoutRequestId = ?
//     `;

//     db.run(updateQuery, [status, ResultDesc, mpesaReceiptNumber, transactionDate, CheckoutRequestID], (err) => {
//       if (err) {
//         console.error("Error updating transaction:", err);
//       } else {
//         console.log(`Transaction updated: ${CheckoutRequestID}`);
//       }
//     });
//   }

//   res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
// });

// // Transactions listing
// app.get("/transactions", (req, res) => {
//   db.all("SELECT * FROM transactions ORDER BY timestamp DESC", (err, rows) => {
//     if (err) return res.status(500).json({ error: "DB Error" });
//     res.json(rows);
//   });
// });

// // Individual transaction by checkoutRequestId
// app.get("/transaction/:checkoutRequestId", (req, res) => {
//   const { checkoutRequestId } = req.params;
//   db.get("SELECT * FROM transactions WHERE checkoutRequestId = ?", [checkoutRequestId], (err, transaction) => {
//     if (err) return res.status(500).json({ error: "DB Error" });
//     if (!transaction) return res.status(404).json({ error: "Transaction not found" });
//     res.json(transaction);
//   });
// });

// // Timeout checker (optional)
// app.get("/check-timeouts", (req, res) => {
//   const sql = `
//     UPDATE transactions 
//     SET status = 'Timeout', responseDescription = 'Transaction timed out'
//     WHERE status = 'Pending' AND datetime(timeout_at) <= datetime('now')
//   `;
//   db.run(sql, function (err) {
//     if (err) return res.status(500).json({ error: "DB update failed" });
//     res.json({ message: "Timeouts updated", updated: this.changes });
//   });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);
//   res.status(500).json({ error: "Server Error" });
// });

// // Start server
// const port = process.env.PORT || 3000;
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on port ${port}`);
// });

// Full STK Push implementation with validation merged into your original structure

// const express = require("express");
// const axios = require("axios");
// const bodyParser = require("body-parser");
// const sqlite3 = require("sqlite3").verbose();
// const moment = require("moment-timezone");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// app.use(bodyParser.json());

// const db = new sqlite3.Database("transactions.db", (err) => {
//   if (err) {
//     console.error("Error opening database:", err);
//     process.exit(1);
//   }
// });

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS transactions (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       phoneNumber TEXT,
//       amount REAL,
//       requestId TEXT,
//       checkoutRequestId TEXT,
//       timestamp TEXT,
//       status TEXT DEFAULT 'Pending',
//       responseDescription TEXT,
//       timeout_at TEXT,
//       mpesa_receipt_number TEXT,
//       transaction_date TEXT
//     )
//   `);
// });

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const generateToken = async () => {
//   const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
//   const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

//   const response = await axios.get(
//     "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
//     {
//       headers: { Authorization: `Basic ${auth}` },
//     }
//   );
//   return response.data.access_token;
// };

// const generateAuthDetails = () => {
//   const date = new Date();
//   const timestamp =
//     date.getFullYear() +
//     ("0" + (date.getMonth() + 1)).slice(-2) +
//     ("0" + date.getDate()).slice(-2) +
//     ("0" + date.getHours()).slice(-2) +
//     ("0" + date.getMinutes()).slice(-2) +
//     ("0" + date.getSeconds()).slice(-2);

//   const shortCode = process.env.BUSINESS_SHORT_CODE;
//   const passKey = process.env.PASSKEY;
//   const password = Buffer.from(shortCode + passKey + timestamp).toString("base64");

//   return { shortCode, timestamp, password };
// };

// const stkPush = async (token, phone, amount) => {
//   const { shortCode, timestamp, password } = generateAuthDetails();
//   const payload = {
//     BusinessShortCode: shortCode,
//     Password: password,
//     Timestamp: timestamp,
//     TransactionType: "CustomerPayBillOnline",
//     Amount: amount,
//     PartyA: `254${phone}`,
//     PartyB: shortCode,
//     PhoneNumber: `254${phone}`,
//     CallBackURL: process.env.CALLBACK_URL,
//     AccountReference: "RFID Payment",
//     TransactionDesc: "RFID Triggered Payment",
//   };

//   const response = await axios.post(
//     "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
//     payload,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   return response.data;
// };

// const querySTKPushStatus = async (checkoutRequestId, token) => {
//   const { shortCode, timestamp, password } = generateAuthDetails();
//   const payload = {
//     BusinessShortCode: shortCode,
//     Password: password,
//     Timestamp: timestamp,
//     CheckoutRequestID: checkoutRequestId,
//   };

//   const response = await axios.post(
//     "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data.ResultCode;
// };

// const validateTransaction = async (checkoutRequestId, token) => {
//   const retryInterval = 10000;
//   const maxRetries = 6;

//   for (let i = 0; i < maxRetries; i++) {
//     await delay(retryInterval);
//     const status = await querySTKPushStatus(checkoutRequestId, token);

//     if (status === "0") return "Success";
//     if (["1032", "1", "1019", "2001", "1025", "1037"].includes(status)) {
//       return status;
//     }
//   }
//   return "Timeout";
// };

// app.post("/stkpush", async (req, res) => {
//   try {
//     const { phoneNumber, amount } = req.body;
//     if (!/^254\d{9}$/.test(phoneNumber)) {
//       return res.status(400).json({ error: "Invalid phone number" });
//     }
//     if (amount < 1 || amount > 150000) {
//       return res.status(400).json({ error: "Amount must be 1 - 150000" });
//     }

//     const token = await generateToken();
//     const phone = phoneNumber.substring(3); // remove 254
//     const response = await stkPush(token, phone, amount);
//     const { MerchantRequestID, CheckoutRequestID, ResponseDescription } = response;

//     const timeoutAt = moment().tz("Africa/Nairobi").add(5, "minutes").format();
//     db.run(
//       `INSERT INTO transactions (phoneNumber, amount, requestId, checkoutRequestId, timestamp, status, responseDescription, timeout_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//       [
//         phoneNumber,
//         amount,
//         MerchantRequestID,
//         CheckoutRequestID,
//         moment().tz("Africa/Nairobi").format(),
//         "Pending",
//         ResponseDescription,
//         timeoutAt,
//       ]
//     );

//     const result = await validateTransaction(CheckoutRequestID, token);
//     res.status(200).json({ CheckoutRequestID, message: result });
//   } catch (error) {
//     console.error("STK Error:", error);
//     res.status(500).json({ error: error.message || "STK Push failed" });
//   }
// });

// app.post("/callback", (req, res) => {
//   const callbackData = req.body;
//   if (callbackData?.Body?.stkCallback) {
//     const {
//       CheckoutRequestID,
//       ResultCode,
//       ResultDesc,
//       CallbackMetadata,
//     } = callbackData.Body.stkCallback;

//     let status = ResultCode === 0 ? "Successful" : "Failed";
//     let amount = null,
//       mpesaReceiptNumber = null,
//       phoneNumber = null,
//       transactionDate = null;

//     if (ResultCode === 0 && CallbackMetadata?.Item) {
//       CallbackMetadata.Item.forEach((item) => {
//         if (item.Name === "Amount") amount = item.Value;
//         if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
//         if (item.Name === "PhoneNumber") phoneNumber = item.Value;
//         if (item.Name === "TransactionDate") transactionDate = item.Value;
//       });
//     }

//     db.run(
//       `UPDATE transactions SET status = ?, responseDescription = ?, mpesa_receipt_number = ?, transaction_date = ? WHERE checkoutRequestId = ?`,
//       [status, ResultDesc, mpesaReceiptNumber, transactionDate, CheckoutRequestID]
//     );
//   }
//   res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const moment = require("moment-timezone");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

/* ----------------------------- SQLite Setup ----------------------------- */
const db = new sqlite3.Database("transactions.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phoneNumber TEXT,
      amount REAL,
      requestId TEXT,
      checkoutRequestId TEXT,
      timestamp TEXT,
      status TEXT DEFAULT 'Pending',
      responseDescription TEXT,
      timeout_at TEXT,
      mpesa_receipt_number TEXT,
      transaction_date TEXT
    )
  `);
});

/* -------------------------- STK Push Functions -------------------------- */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateToken = async () => {
  const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );
  return response.data.access_token;
};

const generateAuthDetails = () => {
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const shortCode = process.env.BUSINESS_SHORT_CODE;
  const passKey = process.env.PASSKEY;
  const password = Buffer.from(shortCode + passKey + timestamp).toString("base64");

  return { shortCode, timestamp, password };
};

const stkPush = async (token, phone, amount) => {
  const { shortCode, timestamp, password } = generateAuthDetails();
  const payload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: "RFID Payment",
    TransactionDesc: "RFID Triggered Payment",
  };

  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

const querySTKPushStatus = async (checkoutRequestId, token) => {
  const { shortCode, timestamp, password } = generateAuthDetails();
  const payload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestId,
  };

  const response = await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.ResultCode;
};

const validateTransaction = async (checkoutRequestId, token) => {
  const retryInterval = 10000;
  const maxRetries = 6;

  for (let i = 0; i < maxRetries; i++) {
    await delay(retryInterval);
    const status = await querySTKPushStatus(checkoutRequestId, token);

    if (status === "0") return "Success";
    if (["1032", "1", "1019", "2001", "1025", "1037"].includes(status)) {
      return status;
    }
  }
  return "Timeout";
};

/* --------------------------- STK Push Endpoint --------------------------- */
app.post("/stkpush", async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;
    if (!/^254\d{9}$/.test(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }
    if (amount < 1 || amount > 150000) {
      return res.status(400).json({ error: "Amount must be 1 - 150000" });
    }

    const token = await generateToken();
    const phone = phoneNumber.substring(3); // remove '254'
    const response = await stkPush(token, phone, amount);
    const { MerchantRequestID, CheckoutRequestID, ResponseDescription } = response;

    const timeoutAt = moment().tz("Africa/Nairobi").add(5, "minutes").format();
    db.run(
      `INSERT INTO transactions (phoneNumber, amount, requestId, checkoutRequestId, timestamp, status, responseDescription, timeout_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        phoneNumber,
        amount,
        MerchantRequestID,
        CheckoutRequestID,
        moment().tz("Africa/Nairobi").format(),
        "Pending",
        ResponseDescription,
        timeoutAt,
      ]
    );

    const result = await validateTransaction(CheckoutRequestID, token);
    res.status(200).json({ CheckoutRequestID, message: result });
  } catch (error) {
    console.error("STK Error:", error);
    res.status(500).json({ error: error.message || "STK Push failed" });
  }
});

/* --------------------------- Callback Endpoint --------------------------- */
app.post("/callback", (req, res) => {
  const callbackData = req.body;
  if (callbackData?.Body?.stkCallback) {
    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = callbackData.Body.stkCallback;

    let status = ResultCode === 0 ? "Successful" : "Failed";
    let amount = null,
      mpesaReceiptNumber = null,
      phoneNumber = null,
      transactionDate = null;

    if (ResultCode === 0 && CallbackMetadata?.Item) {
      CallbackMetadata.Item.forEach((item) => {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
        if (item.Name === "PhoneNumber") phoneNumber = item.Value;
        if (item.Name === "TransactionDate") transactionDate = item.Value;
      });
    }

    db.run(
      `UPDATE transactions SET status = ?, responseDescription = ?, mpesa_receipt_number = ?, transaction_date = ? WHERE checkoutRequestId = ?`,
      [status, ResultDesc, mpesaReceiptNumber, transactionDate, CheckoutRequestID]
    );
  }
  res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
});

/* --------------------------- Cards Endpoint --------------------------- */
app.get("/cards", (req, res) => {
  const filePath = path.join(__dirname, "cards.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading cards.json:", err);
      return res.status(500).json({ error: "Failed to load card data" });
    }
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

/* --------------------------- Start Server --------------------------- */
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Server running on port ${port}`));
