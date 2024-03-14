import { Test, TestingModule } from '@nestjs/testing';
import { EngageResolver } from './engage.resolver';

describe('EngageResolver', () => {
  let resolver: EngageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngageResolver],
    }).compile();

    resolver = module.get<EngageResolver>(EngageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
