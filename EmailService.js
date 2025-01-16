const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporterVerify = nodemailer.createTransport({
      host: "",
      port: ,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });


    this.transporterRecovery = nodemailer.createTransport({
      host: "",
      port: ,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    });
  }

  async sendMail(transporter, to, subject, htmlContent) {
    const mailOptions = {
      from: transporter.options.auth.user,
      to,
      subject,
      html: htmlContent,
    };
    try {
      let info = await transporter.sendMail(mailOptions);
        return true
    } catch (error) {
        return false
    }
  }

  async verifyEmail(to, verificationCode) {
    const subject = "["+verificationCode+"] is your verification code"
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="" alt="" style="width: 120px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #0052cc; text-align: center;">Welcome to !</h2>
        <p style="font-size: 16px; color: #333; text-align: center;">
          To complete your registration, please verify your email with the code below:
        </p>
        <div style="font-size: 24px; background-color: #f5f7fb; padding: 15px; text-align: center; color: #0052cc; font-weight: bold; margin: 20px 0; border-radius: 8px;">
          ${verificationCode}
        </div>
        <p style="font-size: 14px; color: #777; text-align: center;">
          If you did not request this email, please ignore it.
        </p>
        <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 30px;">
          &copy; ${new Date().getFullYear()} . All rights reserved.
        </p>
      </div>
    `;
    const res = await this.sendMail(this.transporterVerify, to, subject, htmlContent);
      if(res == true){
          return verificationCode
      }else{return 0}
  }

  async resetPassword(to, resetCode) {
    const subject = "["+resetCode + "] is your Password Reset Code for ";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="" alt="" style="width: 120px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #0052cc; text-align: center;">Password Reset</h2>
        <p style="font-size: 16px; color: #333; text-align: center;">
          Use the code below to reset your password:
        </p>
        <div style="font-size: 24px; background-color: #f5f7fb; padding: 15px; text-align: center; color: #0052cc; font-weight: bold; margin: 20px 0; border-radius: 8px;">
          ${resetCode}
        </div>
        <p style="font-size: 14px; color: #777; text-align: center;">
          If you did not request this password reset, please ignore this email.
        </p>
        <p style="font-size: 12px; color: #aaa; text-align: center; margin-top: 30px;">
          &copy; ${new Date().getFullYear()} . All rights reserved.
        </p>
      </div>
    `;
    const res = await this.sendMail(this.transporterRecovery, to, subject, htmlContent);
      if(res == true){
          return resetCode
          
      }else{return 0}
  }
}

module.exports = new EmailService();
