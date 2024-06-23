import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should return correct TypeOrmModuleOptions', async () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_USER = 'user';
    process.env.DB_PASS = 'pass';
    process.env.DB_NAME = 'test';
    process.env.DB_DROP_SCHEMA = 'true';
    process.env.DB_SYNCRONIZE = 'true';
    process.env.DB_LOGGING = 'true';

    const result = await service.createTypeOrmOptions();
    expect(result).toEqual({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'test',
      entities: ['dist/entities/*.entity{.ts,.js}'],
      migrations: ['dist/db/migrations/*{.ts,.js}'],
      dropSchema: true,
      synchronize: true,
      migrationsTableName: 'migrations',
      logging: true,
    });
  });

  it('should return correct TypeOrmModuleOptions with default values if environment variables are not defined', async () => {
    delete process.env.DB_HOST;
    delete process.env.DB_PORT;
    delete process.env.DB_USER;
    delete process.env.DB_PASS;
    delete process.env.DB_NAME;
    delete process.env.DB_DROP_SCHEMA;
    delete process.env.DB_SYNCRONIZE;
    delete process.env.DB_LOGGING;

    const result = await service.createTypeOrmOptions();

    expect(result).toEqual({
      type: 'postgres',
      host: undefined,
      port: NaN,
      username: undefined,
      password: undefined,
      database: undefined,
      entities: ['dist/entities/*.entity{.ts,.js}'],
      migrations: ['dist/db/migrations/*{.ts,.js}'],
      dropSchema: false,
      synchronize: false,
      migrationsTableName: 'migrations',
      logging: false,
    });
  });
});
