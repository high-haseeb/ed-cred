import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/feedback.dto';

@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Post()
    async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @Get()
    async getAllFeedbacks() {
        return this.feedbackService.getAllFeedbacks();
    }

    @Get(':id')
    async getFeedbackById(@Param('id') id: string) {
        return this.feedbackService.getFeedbackById(id);
    }
}
