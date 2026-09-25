import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';

/**
 * Builds the Postgres connection options, following the Tasman Tech main website.
 *
 * - Cloud Run (`K_SERVICE` set): `DB_HOST` is the Cloud SQL socket directory
 *   (`/cloudsql/<project>:<region>:<instance>`), so no SSL is needed.
 * - Locally: `DB_HOST` is either the instance's public IP (SSL on) or `127.0.0.1`
 *   when using the Cloud SQL Auth Proxy (SSL off; the proxy encrypts the connection).
 *
 * @param {ConfigService} config - Environment configuration (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`).
 * @returns {TypeOrmModuleOptions} TypeORM options.
 */
export function buildDatabaseOptions(config: ConfigService): TypeOrmModuleOptions {
  const host = config.get<string>('DB_HOST') ?? '127.0.0.1';
  const isCloudRun = !!config.get<string>('K_SERVICE');
  const isLocalProxy = ['127.0.0.1', 'localhost'].includes(host);
  const useSsl = !isCloudRun && !isLocalProxy;

  return {
    type: 'postgres',
    host,
    port: 5432,
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASS'),
    database: config.get<string>('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true,
    ssl: useSsl ? { rejectUnauthorized: false } : false,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: buildDatabaseOptions,
    }),
    ContactModule,
    AuthModule,
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
