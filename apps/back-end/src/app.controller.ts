import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Main application controller handling root endpoints.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handles the root GET request.
   * @returns {string} A basic greeting string.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
