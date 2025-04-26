require('dotenv').config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
   host: 'smtp.sendgrid.net',
   port: 587,
   auth: {
       user: "apikey",
       pass: process.env.SENDGRID_API_KEY
   }
})

const sendMail = async ({ email, subject, link }) => {
  try {
      const mailOptions = {
          from: 'sandeshjadhwani@gmail.com',
          to: email,
          subject: subject,
          html: `
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Forgot Password</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 20px auto;
                      padding: 20px;
                      background-color: #fff;
                      border-radius: 5px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                      color: #333;
                      text-align: center;
                  }
                  p {
                      color: #555;
                  }
                  .btn {
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: #007bff;
                      color:#fcfcfc;
                      text-decoration: none;
                      border-radius: 5px;
                  }
                  .btn:hover {
                      background-color: #0056b3;
                      color:#fcfcfc;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Forgot Password</h1>
                  <p>Dear User,</p>
                  <p>We received a request to reset your password. Please click the link below to reset your password:</p>
                  <p><a class="btn" href=${link}>Reset Password</a></p>
                  <p>If you didn't request a password reset, you can ignore this email.</p>
              </div>
          </body>
          </html>
          `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
  } catch (error) {
      console.error('Error sending email:', error);
  }
};

module.exports = {
    sendMail
}
