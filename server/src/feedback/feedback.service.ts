import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback)
        private feedbackRepository: Repository<Feedback>,
    ) {}

    async createFeedback(feedbackDto: CreateFeedbackDto): Promise<Feedback> {
        const feedback = this.feedbackRepository.create(feedbackDto);
        return this.feedbackRepository.save(feedback);
    }

    async getAllFeedbacks(): Promise<Feedback[]> {
        return this.feedbackRepository.find();
    }

    async getFeedbackById(id: string): Promise<Feedback | undefined> {
        return this.feedbackRepository.findOne({ where: { id } });
    }
}
