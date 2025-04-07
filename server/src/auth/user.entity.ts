import { ForumQuestion } from 'src/forum-question/entities/forum-question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { ForumReply } from 'src/forum-reply/entities/forum-reply.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { UserRole, UserCategory, Permission, SubscriptionPlan } from "./../../types/user";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    // TODO: keep the last login time
    //@Column()
    //lastLogin: Date;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ type: 'enum', enum: UserCategory })
    category: UserCategory;

    @Column({ type: 'enum', enum: Permission, array: true })
    permissions: Permission[];

    @Column({ type: 'jsonb', default: { status: 'free' } })
    subscription: {
        status: 'free' | 'subscribed';
        plan?: SubscriptionPlan;
        expiresAt?: Date;
    };

    @Column({ nullable: true })
    profile_picture?: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ type: 'jsonb', nullable: true })
    preferences?: Record<string, any>;

    // A user can ask multiple questions and multiple replies
    // This is a relationship that defines this.
    @OneToMany(() => ForumQuestion, (question) => question.author)
    questions: ForumQuestion[];

    @OneToMany(() => ForumReply, (reply) => reply.author)
    replies: ForumReply[];

    // A User can publish multiple feedback forms
    @OneToMany(() => FeedbackForm, (form) => form.author)
    feedbackForms: FeedbackForm[];
}
