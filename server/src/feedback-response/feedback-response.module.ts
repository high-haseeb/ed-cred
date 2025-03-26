import { Module } from '@nestjs/common';
import { FeedbackResponseService } from './feedback-response.service';
import { FeedbackResponseController } from './feedback-response.controller';

@Module({
  controllers: [FeedbackResponseController],
  providers: [FeedbackResponseService],
})
export class FeedbackResponseModule {}
