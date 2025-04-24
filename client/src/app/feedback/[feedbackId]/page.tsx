"use client";
import { fetchFeedbackById } from "@/api/feedback";
import { FeedbackResponse } from "@/api/feedback-response";
import { UserProfile, Category } from "@/types/user";
import { Stats } from "@/components/Common/Stats";
import { Title } from "@/components/Common/Title";
import {  SubCategory } from "@/store/categoryStore";
import { use, useEffect, useState } from "react";

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

interface Feedback {
    id: number;
    title: string;
    author: UserProfile;
    category: Category;
    subcategory: SubCategory;
    details: FeedbackDetails;
    questions: Question[];
    responses: FeedbackResponse[];
    createdAt: Date;
}

export default function PostPage({ params }: { params: Promise<{ feedbackId: string }> }) {

    const { feedbackId } = use(params);
    const [feedback, setFeedback] = useState<Feedback>();

    const setup = async() => {
        const response = await fetchFeedbackById(feedbackId);
        setFeedback(response);
    }

    useEffect(() => {
        setup();
    }, []);

    const stats = [
        {
            title: "Total responses",
            value: feedback?.responses.length.toString() || "0",
        }
    ]

    return(

        <div className="w-3xl mx-auto my-10 flex max-w-4xl flex-col">
            <Title 
                title={feedback?.title ?? ""}
                desc={ `created by ${feedback?.author.name} on ${new Intl.DateTimeFormat("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }).format(new Date(feedback?.createdAt ?? new Date))}
                            ` }
            />
            <Stats stats={stats}/>
            <FeedbackResponses responses={feedback?.responses || []} questions={feedback?.questions || []} />
        </div>
    )
}

const FeedbackResponses = ({ responses, questions }: {responses: FeedbackResponse[]; questions: Question[] }) => {
    if (!responses || responses.length === 0) {
        return <p className="text-muted-foreground">No responses available.</p>;
    }

    return (
        <div className="space-y-6">
            {responses.map((response) => (
                <div key={response.id} className="p-4 border rounded-md shadow-md">
                    {/* Details Section */}
                    <div className="mt-2">
                        <h4 className="font-medium text-muted-foreground">Details:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {response.details.name && <li><strong>Name:</strong> {response.details.name}</li>}
                            {response.details.country && <li><strong>Country:</strong> {response.details.country}</li>}
                            {response.details.dates && <li><strong>Dates:</strong> {response.details.dates}</li>}
                            {response.details.salary && <li><strong>Salary:</strong> {response.details.salary}</li>}
                            {response.details.web && <li><strong>Website:</strong> {response.details.web}</li>}
                        </ul>
                    </div>

                    {/* Answers Section */}
                    <div className="mt-2">
                        <h4 className="font-medium text-muted-foreground">Answers:</h4>
                        <ul className="list-disc list-inside text-sm">
                            {response.answers.map((answer, index) => (
                                <li key={index}>
                                    <strong>{questions.filter(question => question.id == answer.questionId)[0].text}:</strong> {Array.isArray(answer.answer) ? answer.answer.join(", ") : String(answer.answer)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Comments */}
                    {response.comments && (
                        <p className="mt-2 italic text-muted-foreground">"{response.comments}"</p>
                    )}

                    {/* Submission Date */}
                    <p className="mt-2 text-xs text-muted-foreground">Submitted at: {new Date(response.submittedAt).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};
