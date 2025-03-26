import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackResponseService } from './feedback-response.service';
import { CreateFeedbackResponseDto } from './dto/create-feedback-response.dto';
import { UpdateFeedbackResponseDto } from './dto/update-feedback-response.dto';

@Controller('feedback-response')
export class FeedbackResponseController {
  constructor(private readonly feedbackResponseService: FeedbackResponseService) {}

  @Post()
  create(@Body() createFeedbackResponseDto: CreateFeedbackResponseDto) {
    return this.feedbackResponseService.create(createFeedbackResponseDto);
  }

  @Get()
  findAll() {
    return this.feedbackResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackResponseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackResponseDto: UpdateFeedbackResponseDto) {
    return this.feedbackResponseService.update(+id, updateFeedbackResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackResponseService.remove(+id);
  }
}
