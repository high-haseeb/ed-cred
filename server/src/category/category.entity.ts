import { User } from 'src/auth/user.entity';
import { FeedbackForm } from 'src/feedback-form/entities/feedback-form.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export type Permission = "post" | "feedback" | "review";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'enum', enum: ["active", "draft"], default: "active" })
    status: "active" | "draft";

    @CreateDateColumn()
    createdAt: Date;

    @Column("simple-array", { nullable: true })
    permissions?: Permission[];

    @Column("boolean")
    requiresVerification: boolean;

    // There are multiple users in a category
    @OneToMany(() => User, (user) => user.category)
    users: User[];

    // A category can be linked with multiple feedback forms
    @OneToMany(() => FeedbackForm, (feedbackForm) => feedbackForm.category)
    feedbackForms: FeedbackForm[];

    @OneToMany(() => Subcategory, (subcategory) => subcategory.parentCategory)
    subCategories: Subcategory[];
}
