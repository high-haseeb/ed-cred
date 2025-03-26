import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async createCategory(name: string, status: "active" | "draft", permissions: string[]): Promise<Category> {
        const category = this.categoryRepository.create({
            name,
            status,
            permissions: permissions as any,
            createdAt: new Date(),
        });

        return await this.categoryRepository.save(category);
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
        return category;
    }

    async removeCategory(id: number): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}
