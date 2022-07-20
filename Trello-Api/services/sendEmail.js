import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLOUD_CLIENT_ID,
  process.env.CLOUD_CLIENT_SECRET
);
OAuth2Client.setCredentials({ refresh_token: process.env.CLOUD_REFRESH_TOKEN });

const accessToken = OAuth2Client.getAccessToken();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "macharashvililuka12@gmail.com",
    clientId: process.env.CLOUD_CLIENT_ID,
    clientSecret: process.env.CLOUD_CLIENT_SECRET,
    refreshToken: process.env.CLOUD_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

function sendVerificationEmail(to, userId, userToken) {
  const mailOptions = {
    from: "Trello Project <macharashvililuka12@gmail.com>",
    to: to,
    subject: "Email Verification",
    text: "Email Verification",
    html: `<p>Dear User, please verify your email for Trello project.</p>
        <p>
            This <a href="https://serene-island-77008.herokuapp.com/api/auth/verify/${userId}/${userToken}">link</a> will verify your email address.
        </p>
        <p>
            If you did not registered on Trello project, you can just ignore this message and do not click on the link!
        </p>`,
  };

  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      return error;
    } else {
      return result;
    }
    transport.close();
  });
}

function sendPasswordResetEmail(to, userId, resetToken) {
  const mailOptions = {
    from: "Trello Project <macharashvililuka12@gmail.com>",
    to: to,
    subject: "Password Reset",
    text: "Password Reset",
    html: `<p>Dear User, you requested password reset.</p>
        <p>
            This <a href="https://trello-clone-a597d.web.app/resetpassword/${userId}/${resetToken}">link</a> will help you to reset your password.
        </p>
        <p>
            If it was not you, who requested password reset, you can just ignore this message and do not click on the link!
        </p>`,
  };
  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      return error;
    } else {
      return result;
    }
    transport.close();
  });
}

function sendTeamInvitationEmail(to, teamId, userId) {
  const mailOptions = {
    from: "Trello Project <macharashvililuka12@gmail.com>",
    to: to,
    subject: "Invitation To The Team",
    text: "Password Reset",
    html: `<p>Dear User, you were Invited To Trello Team.</p>
        <p>
        If you click on the <a href="https://serene-island-77008.herokuapp.com/api/team/acceptinvitation/${teamId}/${userId}">link</a>, you will accept invitation.
        </p>
        <p>
            If you don't want to accept invitation, you can just ignore this message and do not click on the link!
        </p>`,
  };
  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      return error;
    } else {
      return result;
    }
    transport.close();
  });
}

export {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendTeamInvitationEmail,
};
