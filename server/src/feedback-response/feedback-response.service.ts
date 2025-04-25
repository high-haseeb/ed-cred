import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedbackResponse } from './entities/feedback-response.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { CreateFeedbackResponseDto } from './dto/create-feedback-response.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FeedbackResponseService {
    constructor(
        @InjectRepository(FeedbackResponse)
        private readonly feedbackResponseRepository: Repository<FeedbackResponse>,

        @InjectRepository(FeedbackForm)
        private readonly feedbackFormRepository: Repository<FeedbackForm>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Create a new feedback response
    async createResponse(dto: CreateFeedbackResponseDto): Promise<FeedbackResponse> {
        const feedbackForm = await this.feedbackFormRepository.findOne({
            where: { id: Number(dto.feedbackFormId) },
        });

        if (!feedbackForm) {
            throw new NotFoundException('Feedback form not found');
        }

        const user = await this.userRepository.findOne({
            where: { id: Number(dto.authorId) },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const feedbackResponse = this.feedbackResponseRepository.create({
            feedbackForm,
            details: dto.details,
            answers: dto.answers,
            comments: dto.comments,
            submittedAt: new Date(dto.submittedAt),
            author: user,
        });

        return await this.feedbackResponseRepository.save(feedbackResponse);
    }

    // Get all responses for a specific feedback form
    async getResponsesByForm(feedbackFormId: string): Promise<FeedbackResponse[]> {
        return await this.feedbackResponseRepository.find({
            where: { feedbackForm: { id: Number(feedbackFormId) } },
            relations: ['feedbackForm'],
        });
    }

    // Get a specific feedback response
    async getResponseById(responseId: string): Promise<FeedbackResponse> {
        const response = await this.feedbackResponseRepository.findOne({
            where: { id: responseId },
            relations: ['feedbackForm'],
        });

        if (!response) {
            throw new NotFoundException('Feedback response not found');
        }

        return response;
    }

    // Delete a feedback response
    async deleteResponse(responseId: string): Promise<void> {
        const result = await this.feedbackResponseRepository.delete(Number(responseId));
        if (result.affected === 0) {
            throw new NotFoundException('Feedback response not found');
        }
    }
}
