import { IsBoolean, IsEnum, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

type QuestionType = "rating" | "multiple_choice" | "true_false" | "open_ended";

class QuestionDto {
    @IsString()
    id: string;

    @IsEnum(["rating", "multiple_choice", "true_false", "open_ended"])
    type: QuestionType;

    @IsString()
    text: string;

    @IsOptional()
    @IsArray()
    options?: any[];

    @IsOptional()
    answer?: string | number | boolean;
}

class FeedbackDetailsDto {
    @IsBoolean()
    name: boolean;

    @IsBoolean()
    country: boolean;

    @IsBoolean()
    dates: boolean;

    @IsBoolean()
    salary: boolean;

    @IsBoolean()
    web: boolean;
}

export class CreateFeedbackDto {
    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsString()
    subcategory: string;

    @IsEnum(["active", "inactive"])
    status: "active" | "inactive";

    @ValidateNested()
    @Type(() => FeedbackDetailsDto)
    details: FeedbackDetailsDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    questions: QuestionDto[];
}
