import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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
}
