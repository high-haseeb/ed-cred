import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/post.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { ForumQuestionModule } from './forum-question/forum-question.module';
import { ForumReplyModule } from './forum-reply/forum-reply.module';
import { FeedbackFormModule } from './feedback-form/feedback-form.module';
import { FeedbackResponseModule } from './feedback-response/feedback-response.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { Subcategory } from './subcategory/subcategory.entity';
import { RoleModule } from './role/role.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Category, Subcategory]),
        AuthModule,
        PostModule,
        CategoryModule,
        SubcategoryModule,
        ForumQuestionModule,
        ForumReplyModule,
        FeedbackFormModule,
        FeedbackResponseModule,
        RoleModule,
    ],
})
export class AppModule {}
