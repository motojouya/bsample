import { Test, TestingModule } from '@nestjs/testing';
import { Rdb } from './rdb';

describe('Rdb', () => {
  let provider: Rdb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Rdb],
    }).compile();

    provider = module.get<Rdb>(Rdb);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
