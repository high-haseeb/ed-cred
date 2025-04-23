import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackResponse } from 'src/feedback-response/entities/feedback-response.entity';
import { Repository } from 'typeorm';
import { FeedbackForm } from "src/feedback-form/entities/feedback-form.entity";

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(FeedbackResponse)
    private readonly feedbackResponseRepository: Repository<FeedbackResponse>,
    @InjectRepository(FeedbackForm)
    private readonly feedbackFormRepository: Repository<FeedbackForm>,
  ) {}

  async search(query: string) {
    return await this.feedbackResponseRepository
      .createQueryBuilder("feedback_response")
      .leftJoinAndSelect("feedback_response.feedbackForm", "feedback_form")
      .where("feedback_response.details::text ILIKE :query", { query: `%${query}%` })
      .orWhere("feedback_form.title ILIKE :query", { query: `%${query}%` })
      .getMany();
  }
}
