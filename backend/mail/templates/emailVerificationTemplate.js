const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>OTP Verification Email</title>
        <style>
            body { background-color: #f4f4f7; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; background-color: #ffffff; border-radius: 8px; margin-top: 20px; }
            .logo { max-width: 200px; margin-bottom: 20px; }
            .message { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
            .body { font-size: 16px; margin-bottom: 20px; }
            .highlight { font-weight: bold; color: #2563eb; font-size: 24px; }
            .support { font-size: 14px; color: #999999; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message">JobFlow OTP Verification Email</div>
            <div class="body">
                <p>Dear User,</p>
                <p>Thank you for registering with <strong>JobFlow</strong>. Please use the following OTP to verify your account:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 5 minutes. If you did not request this, please disregard this email.</p>
            </div>
            <div class="support">Reach out to us at <a href="mailto:info@jobflow.com">info@jobflow.com</a>.</div>
        </div>
    </body>
    </html>`;
};
module.exports = otpTemplate;