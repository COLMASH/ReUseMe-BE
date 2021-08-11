const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

async function verify() {
  const connection = await transporter.verify();

  if (connection) {
    console.log("Server ready to take messages");
  }
}

async function welcome({ email, name }) {
  await transporter.sendMail({
    from: `"${process.env.MAILER_USERNAME}" <${process.env.MAILER_USER}>`,
    to: email,
    subject: "Welcome",
    html: `
      <div>
        <h1>Hello ${name}</h1>
        <p>Welcome to ReUseMe!!!</p>
        <p></p>
        <img width="500" height="300" src="https://res.cloudinary.com/mashcol/image/upload/v1628699567/reuseme-images/mailImage_uijkbb.jpg" />
      </div>
    `,
  });
}

module.exports = {
  transporter,
  verify,
  welcome,
};
