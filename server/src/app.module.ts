import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { Feedback } from './feedback/feedback.entity';
import { PostModule } from './posts/post.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Feedback]),
        AuthModule,
        FeedbackModule,
        PostModule,
    ],
})
export class AppModule { }
