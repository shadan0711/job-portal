exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Updated - JobFlow</title>
        <style>
            body {
                background-color: #f4f4f7;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                border: 1px solid #e2e8f0;
            }

            .header {
                background-color: #111827; /* JobFlow Dark Theme */
                padding: 25px;
                text-align: center;
            }
    
            .logo-text {
                color: #ffffff;
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 2px;
                margin: 0;
                text-decoration: none;
            }
    
            .message {
                font-size: 22px;
                font-weight: 700;
                color: #1e293b;
                margin: 25px 0;
                text-align: center;
            }
    
            .body {
                padding: 0 40px;
                font-size: 16px;
                color: #475569;
            }

            .status-icon {
                font-size: 48px;
                text-align: center;
                margin-bottom: 10px;
            }
    
            .support {
                font-size: 14px;
                color: #94a3b8;
                margin-top: 30px;
                padding: 25px;
                background-color: #f8fafc;
                text-align: center;
                border-top: 1px solid #f1f5f9;
            }
    
            .highlight {
                font-weight: bold;
                color: #111827;
            }

            .footer-link {
                color: #3b82f6;
                text-decoration: none;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <div class="logo-text">JOBFLOW</div>
            </div>
            <div class="message">Password Updated Successfully</div>
            <div class="body">
                <div class="status-icon">✅</div>
                <p>Hey <span class="highlight">${name}</span>,</p>
                <p>We wanted to let you know that the password for your JobFlow account associated with <span class="highlight">${email}</span> has been successfully changed.</p>
                <p>If you made this change, you can safely disregard this email. You are all set to continue your job search!</p>
                <p style="background-color: #fff7ed; padding: 15px; border-left: 4px solid #f97316; color: #9a3412; font-size: 14px;">
                    <strong>Security Note:</strong> If you did <strong>not</strong> request this password change, please reach out to our support team immediately or reset your password to secure your account.
                </p>
            </div>
            <div class="support">
                Questions? Visit our <a class="footer-link" href="#">Help Center</a> or email 
                <a class="footer-link" href="mailto:support@jobflow.com">support@jobflow.com</a>
                <p style="margin-top: 10px;">&copy; 2026 JobFlow. All rights reserved.</p>
            </div>
        </div>
    </body>
    
    </html>`;
};