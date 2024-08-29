const nodemailer = require('nodemailer');

// Function to generate a 4-digit code
function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Function to send the code via email
async function sendVerificationEmail(email, code) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '',
      pass: '',
    },
  });

  let info = await transporter.sendMail({
    from: '',
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${code}`,
  });

  console.log("Verification email sent:", info.messageId);
}



module.exports = { generateCode, sendVerificationEmail };
