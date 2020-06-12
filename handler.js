"use strict";

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
    const { name, email, subject, message } = event.body;
    const mailOptions = {
      to: process.env.TO_EMAIL,
      subject: `Mail from portfolio - ${subject}`,
      html: `
      <p><strong> Sender :${name} ( ${email} ) </strong></p>
      <p>
        ${message}
      </p>
      `,
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
