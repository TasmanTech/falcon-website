import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedirectFilter } from './redirect.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply Helmet to prevent MIME sniffing and other vulnerabilities
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Catch 404s and redirect snoops
  app.useGlobalFilters(new RedirectFilter());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
