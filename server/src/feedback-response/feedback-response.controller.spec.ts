import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackResponseController } from './feedback-response.controller';
import { FeedbackResponseService } from './feedback-response.service';

describe('FeedbackResponseController', () => {
  let controller: FeedbackResponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackResponseController],
      providers: [FeedbackResponseService],
    }).compile();

    controller = module.get<FeedbackResponseController>(FeedbackResponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
