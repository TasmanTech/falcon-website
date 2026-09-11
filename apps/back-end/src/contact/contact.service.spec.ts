import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { InternalServerErrorException } from '@nestjs/common';
import * as nodemailerModule from 'nodemailer';

describe('ContactService', () => {
  let service: ContactService;
  const mockSendMail = jest.fn() as any;

  beforeEach(async () => {
    jest.spyOn(nodemailerModule, 'createTransport').mockReturnValue({
      sendMail: mockSendMail,
    } as unknown as nodemailerModule.Transporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submitContactForm', () => {
    const dto = {
      name: 'John',
      email: 'john@example.com',
      message: 'Hello',
      service: 'general',
    };

    it('should send email and return success', async () => {
      mockSendMail.mockResolvedValue(true);

      const result = await service.submitContactForm(dto);

      expect(result).toEqual({ success: true, message: 'Message sent successfully.' });
      expect(mockSendMail).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if sending email fails', async () => {
      mockSendMail.mockRejectedValue(new Error('SMTP Error'));

      await expect(service.submitContactForm(dto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
