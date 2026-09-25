import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { AppModule, buildDatabaseOptions } from './app.module';
import { Invoice } from './invoice/invoice.entity';
import { Admin } from './admin/admin.entity';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    // Stub the database so the module compiles without a Postgres connection
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getDataSourceToken())
      .useValue({})
      .overrideProvider(getRepositoryToken(Invoice))
      .useValue({})
      .overrideProvider(getRepositoryToken(Admin))
      .useValue({})
      .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});

describe('buildDatabaseOptions', () => {
  const configWith = (values: Record<string, string>) =>
    ({ get: (key: string) => values[key] }) as unknown as ConfigService;

  it('connects through the Cloud SQL socket without SSL on Cloud Run', () => {
    const options = buildDatabaseOptions(configWith({ K_SERVICE: 'falcon', DB_HOST: '/cloudsql/p:r:i', DB_NAME: 'falcon_db' }));
    expect(options).toMatchObject({ host: '/cloudsql/p:r:i', ssl: false, database: 'falcon_db' });
  });

  it('uses SSL for a remote host locally', () => {
    const options = buildDatabaseOptions(configWith({ DB_HOST: '34.1.2.3' }));
    expect(options).toMatchObject({ host: '34.1.2.3', ssl: { rejectUnauthorized: false } });
  });

  it('skips SSL for the local Cloud SQL Auth Proxy', () => {
    expect(buildDatabaseOptions(configWith({ DB_HOST: '127.0.0.1' }))).toMatchObject({ ssl: false });
  });
});
