import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP host (smtp.gmail.com)
    port: process.env.SMTP_PORT, // 465 [for gmail]
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // Your email that will be used to send emails
        pass: process.env.SMTP_PASS // Your app password
    },
})

const sendWelcomeEmail = async (email, username) => {
    try {
        const mailOptions = {
            from: '"B2B App Store"',
            to: email,
            subject: 'Welcome to Our Store!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4a6baf;">Welcome, ${username}!</h1>
                    <p>Thank you for registering with us. We're excited to have you on board.</p>

                                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Your Account Details:</h3>
                        <p><strong>Username:</strong> ${username}</p>
                    </div>
                    
                    <p>If you didn't create this account, please contact our support team immediately.</p>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="/auth/login" 
                           style="background-color: #4a6baf; color: white; padding: 10px 20px; 
                                  text-decoration: none; border-radius: 5px;">
                            Login to Your Account
                        </a>
                    </div>
                    
                    <p style="margin-top: 30px; font-size: 12px; color: #777;">
                        © ${new Date().getFullYear()} Your App Name. All rights reserved.
                    </p>

                </div>
            `,
            // For users that don't support HTML
            text: `Welcome ${username}!\n\nThank you for registering with us.\n\nUsername: ${username}\n\nLogin: http://yourapp.com/login`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendWelcomeEmail;