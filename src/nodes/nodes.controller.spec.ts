import { Test, TestingModule } from '@nestjs/testing';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';

describe('NodesController', () => {
  let controller: NodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodesController],
      providers: [NodesService],
    }).compile();

    controller = module.get<NodesController>(NodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
