import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  submitContactForm(@Body() createContactDto: CreateContactDto): {
    success: boolean;
    message: string;
  } {
    return this.contactService.submitContactForm(createContactDto);
  }
}
