import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// This is the main function that will handle the request
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { itemName, quantity, phoneNumber } = req.body;

      // Get access token using refresh token
      const accessToken = await oauth2Client.getAccessToken();

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
        port: 587, // Use STARTTLS port
        secure: false,
      });

      // Set up email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'satyamg.tt.23@nitj.ac.in', // Replace with the recipient email
        subject: `Order Confirmation: ${itemName}`,
        text: `
          You have received a new order:
          -----------------------------------
          Item: ${itemName}
          Quantity: ${quantity}
          Customer Phone: ${phoneNumber}
          -----------------------------------
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Order email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}