import { ForumQuestion } from 'src/forum-question/entities/forum-question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ForumReply } from 'src/forum-reply/entities/forum-reply.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // A user can ask multiple questions and multiple replies
    // This is a relationship that defines this.
    @OneToMany(() => ForumQuestion, (question) => question.author)
    questions: ForumQuestion[];

    @OneToMany(() => ForumReply, (reply) => reply.author)
    replies: ForumReply[];
}
