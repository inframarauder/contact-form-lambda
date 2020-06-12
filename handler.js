"use strict";
require("dotenv");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.staticSiteMailer = async (event) => {
  try {
    const mailOptions = {
      from: event.body.email,
      to: "subhasisdas125@gmail.com",
      subject: event.body.subject,
      body: event.body.message,
    };
    await transport.sendMail(mailOptions);
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        error: error.message,
      },
    };
  }
};
