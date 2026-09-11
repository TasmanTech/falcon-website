import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('ContactController', () => {
  let controller: ContactController;
  let service: ContactService;

  beforeEach(async () => {
    const mockContactService = {
      submitContactForm: jest.fn().mockResolvedValue({
        success: true,
        message: 'Message sent successfully.',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: mockContactService,
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call submitContactForm on the service', async () => {
    const dto = {
      name: 'Test',
      email: 'test@example.com',
      message: 'Test message',
      service: 'general',
    };

    const result = await controller.submitContactForm(dto);
    expect(service.submitContactForm).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ success: true, message: 'Message sent successfully.' });
  });
});
