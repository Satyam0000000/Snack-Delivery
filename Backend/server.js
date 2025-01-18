import express from 'express';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import cors from 'cors'; // Import CORS
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// CORS configuration to allow specific origins (localhost and Vercel)
const corsOptions = {
  origin: ["https://snack-delivery-mu.vercel.app"], // Update with your Vercel URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

// Enable CORS with the defined options
app.use(cors(corsOptions));
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in JSON parsing in Express

const OAuth2 = google.auth.OAuth2;

// OAuth2 configuration
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Route for sending emails
app.post('/api/send-email', async (req, res) => {
  try {
    const {  itemName, quantity, phoneNumber } = req.body;

    // Get an access token using the refresh token
    const accessToken = await oauth2Client.getAccessToken();

    // Configure Nodemailer with OAuth2 authentication
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          // user: process.env.EMAIL_USER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
        port: 587, // Use STARTTLS port
        secure: false, // Secure false for STARTTLS
      });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'satyamg.tt.23@nitj.ac.in', // Recipient email (your email to receive orders)
      subject: `Order Confirmation: ${itemName}`,
      text: `
        You have received a new order:
        -----------------------------------
        Customer Email: NAN
        Item: ${itemName}
        Quantity: ${quantity}
        Customer Phone: ${phoneNumber}
        -----------------------------------
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    res.status(200).json({ success: true, message: 'Order email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
