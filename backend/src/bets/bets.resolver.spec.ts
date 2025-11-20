import { Test, TestingModule } from '@nestjs/testing';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';

describe('BetsResolver', () => {
  let resolver: BetsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BetsResolver,
        {
          provide: BetsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findByUser: jest.fn(),
            findByEvent: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<BetsResolver>(BetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
