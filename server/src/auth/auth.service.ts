import { Injectable, UnauthorizedException, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { UserRole } from "./../../types/user";
import { Category } from 'src/category/category.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        private jwtService: JwtService,
    ) {}

    async signup(username: string, email: string, password: string) {

        const existingUser = await this.userRepository.findOne({
            where: [{ username }, { email }] 
        });

        if (existingUser) {
            if (existingUser.username === username) {
                throw new ConflictException('Username already taken');
            }
            if (existingUser.email === email) {
                throw new ConflictException('Email already registered');
            }
        }

        if (password.length < 8) {
            throw new BadRequestException({
                message: "Weak password",
                reason: "Password must be at least 8 characters",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            username,
            email,
            password: hashedPassword,
            role: UserRole.USER,            // default role is USER
            permissions: [],                // no permissions allowed
        });
        await this.userRepository.save(newUser);

        const token = this.jwtService.sign({ 
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            category: newUser.category,
            subscription: newUser.subscription,
            permissions: newUser.permissions,
        });

        return { token };
    }

    async login(identifier: string, password: string) {
        const user = await this.userRepository.findOne({
            where: [{ email: identifier }, { username: identifier }],
        });

        if (!user) throw new UnauthorizedException("Invalid credentials");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

        // Sign the JWT claims
        const token = this.jwtService.sign({ 
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            category: user.category,
            subscription: user.subscription,
            permissions: user.permissions,
        });

        return { token };
    }

    async getProfile(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: [
                'id',
                'username',
                'email',
                'role',
                'category',
                'permissions',
                'subscription',
                'isVerified'
            ],
            relations: ["category"],
        });

        if (!user) throw new UnauthorizedException("User not found");
        return {name: user.username, ...user};
    }

    async getUsers() {
        const users = await this.userRepository.find({
            select: [
                'id',
                'username',
                'email',
                'category',
                'role',
                'isVerified',
                'subscription',
                'createdAt'
            ],
            relations: ['category'],
        });

        return users;
    }

    async updateUserRole(id: number, role: UserRole): Promise<User> {
        await this.userRepository.update(id, { role });
        return await this.userRepository.findOneOrFail({ where: { id }, select: ['id', 'username', 'role']},)
    }

    async updateUserCategory(userId: number, categoryId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        user.category = category;
        await this.userRepository.save(user);
        return user.category;
    }

    async findUserById(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['id', 'username', 'email']
        });
        if (!user) throw new UnauthorizedException("User not found");
        return user;
    }
}
