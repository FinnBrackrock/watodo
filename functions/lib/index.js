"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: false });
const crypto = require('crypto');
const admin = require("firebase-admin");
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'app.watodo@gmail.com',
        pass: 'gcupgydbmnnecpzs',
    }
});

exports.sendVerificationEmail = functions.auth.user().onCreate(async (user) => {
    const dest = user.email;
    const userID = user.uid;
    const name = user.displayName;
    const placeholder = 'i have no clue what I am doing';
    const buf = crypto.randomBytes(64).toString('hex');
    await admin.firestore().doc(`codes/${buf}`).set({uid: userID});
    cors(dest, placeholder, () => {
        const mailOptions = {
            from: 'Watodo <app.watodo@gmail.com',
            to: dest,
            subject: 'Hello from Firebase',
            html: `
                     <p style="font-size: 16px;">Hello, ${name}</p>
                        <br />
                     <a href="http://127.0.0.1:5001/watodo-1baf8/us-central1/verifyAccount?vfc=${buf}">Click here to verify your account</a>
                     <br />
    <img src="https://i.kym-cdn.com/entries/icons/original/000/032/180/cover4.jpg" />
                  `
        };
        return transporter.sendMail(mailOptions);
    });
    return null;
});


exports.verifyAccount = functions.https.onRequest(async (req, res) => {
   const docID = req.query.vfc;
   const db = admin.firestore();
   const response = await db.collection('codes').doc(docID).get();
   const query = response.data();
   admin.auth().updateUser(query.uid, { emailVerified: true });
   await db.collection('codes').doc(docID).delete();
   res.json({result: query.uid});
  });