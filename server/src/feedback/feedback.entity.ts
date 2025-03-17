import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    subcategory: string;

    @Column({ type: 'enum', enum: ['active', 'inactive'] })
    status: 'active' | 'inactive';

    @Column({ type: 'jsonb' })
    details: {
        name: boolean;
        country: boolean;
        dates: boolean;
        salary: boolean;
        web: boolean;
    };

    @Column({ type: 'jsonb' })
    questions: {
        id: string;
        type: 'rating' | 'multiple_choice' | 'true_false' | 'open_ended';
        text: string;
        options?: any[];
        answer?: string | number | boolean;
    }[];
}
