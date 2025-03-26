import { User } from "src/auth/user.entity";
import { Category } from "src/category/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FeedbackDetails, Question } from "../dto/create-feedback-form.dto";

@Entity()
export class FeedbackForm {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.feedbackForms, { onDelete: 'CASCADE' })
    author: User;

    @ManyToOne(() => Category, (category) => category.feedbackForms, { onDelete: 'CASCADE' })
    category: Category;

    // TODO:This should also be a ID that links to the subcategory table.
    @Column({ type: "text" })
    subCategory: string;

    @Column({ type: "text" })
    title: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @Column({ default: true })
    isDraft: boolean;

    @Column({ type: "jsonb" })
    details: FeedbackDetails;

    @Column({ type: "jsonb" })
    questions: Question[];
}
