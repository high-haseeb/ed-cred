import { Injectable } from '@nestjs/common';
import { CreateFeedbackResponseDto } from './dto/create-feedback-response.dto';
import { UpdateFeedbackResponseDto } from './dto/update-feedback-response.dto';

@Injectable()
export class FeedbackResponseService {
  create(createFeedbackResponseDto: CreateFeedbackResponseDto) {
    return 'This action adds a new feedbackResponse';
  }

  findAll() {
    return `This action returns all feedbackResponse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackResponse`;
  }

  update(id: number, updateFeedbackResponseDto: UpdateFeedbackResponseDto) {
    return `This action updates a #${id} feedbackResponse`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackResponse`;
  }
}
