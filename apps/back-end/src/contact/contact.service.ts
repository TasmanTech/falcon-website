import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_FROM,
        serviceClient: process.env.SERVICE_ACCOUNT_CLIENT_ID,
        privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });
  }

  async submitContactForm(createContactDto: CreateContactDto): Promise<{ success: boolean; message: string }> {
    const companyEmailHtml = `
      <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; background-color: #f3f4f6; color: #1f2937;">
        <div style="background-color: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); max-width: 600px; margin: 0 auto; border: 1px solid #f3f4f6;">
          <div style="border-bottom: 2px solid #f9fafb; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #111827; margin: 0; font-size: 24px; font-weight: 700;">New Inquiry Received</h2>
            <p style="color: #6b7280; margin-top: 8px; font-size: 14px;">Via Falcon Access Website</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Contact Details</p>
            <p style="margin: 0 0 4px; font-size: 15px;"><strong>Name:</strong> ${createContactDto.name}</p>
            <p style="margin: 0 0 4px; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${createContactDto.email}" style="color: #0284c7; text-decoration: none;">${createContactDto.email}</a></p>
          </div>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 12px; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Message Content</p>
            <p style="margin: 0; white-space: pre-wrap; color: #374151; line-height: 1.6; font-size: 15px;">${createContactDto.message}</p>
          </div>
        </div>
      </div>
    `;

    const customerEmailHtml = `
      <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px; background-color: #f3f4f6; color: #1f2937;">
        <div style="background-color: #ffffff; padding: 40px 32px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); max-width: 600px; margin: 0 auto; border: 1px solid #f3f4f6;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #111827; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.02em;">Falcon Access</h1>
          </div>
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 16px; font-weight: 600;">Hello ${createContactDto.name},</h2>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 24px; font-size: 16px;">
            Thank you for reaching out to us. We have successfully received your inquiry and our team will get back to you as soon as possible.
          </p>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px left solid #e5e7eb; border-left: 4px solid #0284c7; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">A copy of your message</p>
            <p style="margin: 0; white-space: pre-wrap; color: #4b5563; line-height: 1.6; font-style: italic; font-size: 15px;">"${createContactDto.message}"</p>
          </div>
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 8px; font-size: 16px;">
            Best regards,
          </p>
          <p style="color: #111827; font-weight: 700; margin: 0; font-size: 16px;">
            The Falcon Access Team
          </p>
        </div>
      </div>
    `;

    try {
      await Promise.all([
        // Email to the company
        this.transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: process.env.SMTP_FROM, // Send to the company's email
          subject: `New Inquiry: ${createContactDto.name}`,
          text: `Name: ${createContactDto.name}\nEmail: ${createContactDto.email}\n\nMessage:\n${createContactDto.message}`,
          html: companyEmailHtml,
        }),
        // Auto-reply to the sender
        this.transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: createContactDto.email,
          subject: 'We received your inquiry - Falcon Access',
          text: `Hello ${createContactDto.name},\n\nThank you for reaching out. We have received your message and will respond shortly.\n\nYour message:\n${createContactDto.message}\n\nBest regards,\nThe Falcon Access Team`,
          html: customerEmailHtml,
        }),
      ]);

      return { success: true, message: 'Message sent successfully.' };
    } catch (error) {
      Logger.error('Failed to send contact email', error);
      throw new InternalServerErrorException(
        'We could not send your message due to a server issue. Please try again later.',
      );
    }
  }
}
