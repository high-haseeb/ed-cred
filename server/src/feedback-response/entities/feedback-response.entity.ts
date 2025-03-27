import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { FeedbackForm } from "src/feedback-form/entities/feedback-form.entity";

@Entity()
export class FeedbackResponse {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => FeedbackForm, (feedbackForm) => feedbackForm.responses, { onDelete: "CASCADE" })
    feedbackForm: FeedbackForm;

    @Column("jsonb")
    details: {
        name?: string;
        country?: string;
        dates?: string;
        salary?: string;
        web?: string;
    };

    @Column("jsonb")
    answers: {
        questionId: string;
        answer: string | string[] | boolean | number;
    }[];

    @Column({ type: "text", nullable: true })
    comments?: string;

    @CreateDateColumn()
    submittedAt: Date;
}
