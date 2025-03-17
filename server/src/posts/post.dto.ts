import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Content } from '@tiptap/react';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(['active', 'draft'])
    status: 'active' | 'draft';

    @IsBoolean()
    featured: boolean;

    @IsOptional()
    @IsString()
    image?: string;

    body: Content;
}

export class UpdatePostDto extends CreatePostDto {}
