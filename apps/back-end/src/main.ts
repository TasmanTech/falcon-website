import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { RedirectFilter } from './redirect.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Cloud Run sits behind one Google front-end proxy; trust it so req.ip is the client's IP
  // (used by the login throttler).
  app.set('trust proxy', 1);

  // Apply Helmet to prevent MIME sniffing and other vulnerabilities
  app.use(helmet());
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Catch 404s and redirect snoops
  app.useGlobalFilters(new RedirectFilter());

  // e.g. "https://falconaccess.co.nz|https://www.falconaccess.co.nz". The admin portal sends
  // Bearer tokens only; refresh cookies are exchanged server-to-server by the Next.js server.
  const allowedOrigins = process.env.FRONTEND_URLS?.split('|')
    .map((url) => url.trim())
    .filter(Boolean);
  app.enableCors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
    // Lets the admin portal read the PDF filename and invoice number
    exposedHeaders: ['Content-Disposition', 'X-Invoice-Number'],
  });

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
