import { Injectable } from '@nestjs/common';

/**
 * Main application service for root-level business logic.
 */
@Injectable()
export class AppService {
  /**
   * Returns a basic greeting string.
   * @returns {string} The greeting message.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
