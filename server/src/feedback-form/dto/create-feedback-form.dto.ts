
// Optional details toggles
export interface FeedbackDetails {
    name:    boolean;
    country: boolean;
    dates:   boolean;
    salary:  boolean;
    web:     boolean;
}

export interface Question {
    id: string;
    text: string;
    type: "rating" | "multiple_choice" | "true_false" | "open_ended";
    options?: string[];
    correctAnswer?: string;
}

export class CreateFeedbackFormDto {
    categoryId: number;

    // TODO:This should also be a ID that links to the subcategory table.
    subCategory: string;

    authorId: number;
    title: string;
    isDraft: boolean;
    details: FeedbackDetails;
    questions: Question[];
}
