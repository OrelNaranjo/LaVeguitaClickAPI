import { Test, TestingModule } from '@nestjs/testing';
import { PrivilegeService } from './privilege.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Privileges } from '../../entities/privileges.entity';

describe('PrivilegesService', () => {
  let service: PrivilegeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrivilegeService,
        {
          provide: getRepositoryToken(Privileges),
          useValue: {
            find: jest.fn(() => []),
            findOne: jest.fn(() => []),
            create: jest.fn(() => []),
            save: jest.fn(() => []),
            remove: jest.fn(() => []),
          },
        },
      ],
    }).compile();

    service = module.get<PrivilegeService>(PrivilegeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
