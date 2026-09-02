import { Injectable, Logger } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  submitContactForm(createContactDto: CreateContactDto): {
    success: boolean;
    message: string;
  } {
    this.logger.log(
      `Received contact form submission from ${createContactDto.email}`,
    );

    // In a real application, you would save this to a database or send an email here.

    return {
      success: true,
      message: 'Thank you for contacting us. We will get back to you shortly.',
    };
  }
}
