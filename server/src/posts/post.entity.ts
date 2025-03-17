import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Content } from '@tiptap/react';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: ['active', 'draft'] })
    status: 'active' | 'draft';

    @Column({ default: false })
    featured: boolean;

    @Column({ nullable: true })
    image: string;

    @Column({ type: 'jsonb' })
    body: Content;

    @CreateDateColumn()
    createdAt: Date;
}
