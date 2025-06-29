import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail", // or use another like "Outlook", "Yahoo", or SMTP config
    auth: {
        user: process.env.EMAIL_USER,     // your email address
        pass: process.env.EMAIL_PASSWORD, // your email app password (not your Gmail password)
    },
});

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

export default sendEmail;
