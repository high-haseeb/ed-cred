import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackFormDto } from './dto/create-feedback-form.dto';
import { FeedbackForm } from './entities/feedback-form.entity';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';

@Injectable()
export class FeedbackFormService {
    constructor(
        @InjectRepository(FeedbackForm)
        private readonly feedbackFormRepository: Repository<FeedbackForm>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Subcategory)
        private readonly subcategoryRepository: Repository<Subcategory>,
    ) {}

    async create(createFeedbackFormDto: CreateFeedbackFormDto): Promise<FeedbackForm> {
        const { categoryId, subCategoryId, authorId, ...rest } = createFeedbackFormDto;

        // Fetch user and category
        const user = await this.userRepository.findOne({ where: { id: authorId } });
        if (!user) throw new NotFoundException(`User with ID ${authorId} not found`);

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw new NotFoundException(`Category with ID ${categoryId} not found`);

        const subcategory = await this.subcategoryRepository.findOne({ where: { id: subCategoryId } });
        if (!subcategory) throw new NotFoundException(`SubCategory with ID ${subCategoryId} not found`);

        // Create new FeedbackForm
        const feedbackForm = this.feedbackFormRepository.create({
            ...rest,
            category,
            subcategory,
            author: user,
        });

        return await this.feedbackFormRepository.save(feedbackForm);
    }

    async findAll(): Promise<FeedbackForm[]> {
        return await this.feedbackFormRepository.find({ relations: ['author', 'category', 'subcategory', 'responses', 'responses.author'] });
    }

    async findOne(id: number): Promise<FeedbackForm> {
        const feedbackForm = await this.feedbackFormRepository.findOne({
            where: { id },
            relations: ['author', 'category', 'subcategory', 'responses', 'responses.author'],
        });

        if (!feedbackForm) throw new NotFoundException(`FeedbackForm with ID ${id} not found`);
        return feedbackForm;
    }

    async findByCategoryId(categoryId: number): Promise<FeedbackForm[]> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        return await this.feedbackFormRepository.find({
            where: { category },
            relations: ['author', 'category', 'subcategory', 'responses'],
        });
    }

    async findByCategoryAndSubcategory(categoryId: number, subcategoryId: number): Promise<FeedbackForm[]> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        const subcategory = await this.subcategoryRepository.findOne({ where: { id: subcategoryId, parentCategory: category } });
        if (!subcategory) {
            throw new NotFoundException(`Subcategory with ID ${subcategoryId} not found in Category ${categoryId}`);
        }

        return await this.feedbackFormRepository.find({
            where: { category, subcategory: subcategory },
            relations: ['author', 'category', 'subcategory', 'responses'],
        });
    }

    async remove(id: number): Promise<void> {
        const result = await this.feedbackFormRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`FeedbackForm with ID ${id} not found`);
        }
    }
}
