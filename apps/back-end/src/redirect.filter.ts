import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class RedirectFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Redirect to the frontend for any unhandled routes (snoops)
    response.redirect(302, process.env.FRONTEND_URL || 'https://falconaccess.co.nz');
  }
}
