import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export interface EmailConfig {
  service?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export class EmailService {
  private transporter: Transporter;
  private fromEmail: string;
  private toEmail: string;

  constructor(config: EmailConfig, fromEmail: string, toEmail: string) {
    this.transporter = nodemailer.createTransport(config);
    this.fromEmail = fromEmail;
    this.toEmail = toEmail;
  }

  async sendContactEmail(data: EmailData): Promise<string> {
    const { name, email, message } = data;

    // Validate environment variables
    if (!this.fromEmail || !this.toEmail) {
      throw new Error('Email configuration is incomplete');
    }

    const html = this.generateHtmlEmail(name, email, message);
    const text = this.generateTextEmail(name, email, message);

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Portfolio Contact" <${this.fromEmail}>`,
      to: this.toEmail,
      subject: `New Contact: ${name} - Portfolio`,
      html,
      text,
      replyTo: email,
    };

    const info = await this.transporter.sendMail(mailOptions);
    return info.messageId;
  }

  private generateHtmlEmail(name: string, email: string, message: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${this.escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${this.escapeHtml(email)}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 4px;">
              ${this.escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              This email was sent from your portfolio website.
            </p>
          </div>
        </body>
      </html>
    `;
  }

  private generateTextEmail(name: string, email: string, message: string): string {
    return `
      NEW CONTACT FORM SUBMISSION
      ===========================
      
      Name: ${name}
      Email: ${email}
      Message:
      ${message}
      
      ---
      Sent from your portfolio website.
      Timestamp: ${new Date().toISOString()}
    `;
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email server connection verified');
      return true;
    } catch (error) {
      console.error('Email server connection failed:', error);
      return false;
    }
  }
}

// Factory function with validation
export function createEmailService(): EmailService {
  const requiredEnvVars = ['EMAIL_SERVER_USER', 'EMAIL_SERVER_PASSWORD', 'EMAIL_FROM', 'EMAIL_TO'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  const config: EmailConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  };

  return new EmailService(
    config,
    process.env.EMAIL_FROM,
    process.env.EMAIL_TO
  );
}