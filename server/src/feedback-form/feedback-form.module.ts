import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackFormService } from './feedback-form.service';
import { FeedbackFormController } from './feedback-form.controller';
import { FeedbackForm } from './entities/feedback-form.entity';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FeedbackForm, User, Category])],
    controllers: [FeedbackFormController],
    providers: [FeedbackFormService],
    exports: [FeedbackFormService],
})
export class FeedbackFormModule {}
