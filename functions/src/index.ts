import functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: false});
import admin = require('firebase-admin');
import { UserRecord } from 'firebase-admin/auth';
admin.initializeApp({ projectId: "watodo-1baf8" });

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'app.watodo@gmail.com',
    pass: 'gcupgydbmnnecpzs',
  }
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user: UserRecord) => {
  const dest = user.email;
  const name = user.displayName;
  const placeholder = 'i have no clue what I am doing';
  cors(dest, placeholder, () => {
      const mailOptions = {
          from: 'Watodo <app.watodo@gmail.com',
          to: dest,
          subject: 'Hello from Firebase',
          html: `<p style="font-size: 16px;">Hello, ${name}</p>
    <br />
    <img src="https://i.kym-cdn.com/entries/icons/original/000/032/180/cover4.jpg" />`
      };
      return transporter.sendMail(mailOptions);
    });
  return null;
});