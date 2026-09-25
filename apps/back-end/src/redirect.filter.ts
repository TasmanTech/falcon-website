import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class RedirectFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Nest reports unmatched routes as "Cannot <METHOD> <path>"; a 404 thrown by a handler
    // (e.g. an invoice that does not exist) is a real API response and is returned as JSON.
    if (!exception.message.startsWith('Cannot ')) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    // Redirect to the frontend for any unhandled routes (snoops)
    response.redirect(302, process.env.FRONTEND_URL || 'https://falconaccess.co.nz');
  }
}
