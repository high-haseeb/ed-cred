"use client";
import { useEffect, useState } from "react";
import { fetchFeedbacks } from "@/api/feedback";

export default function FeedbacksPage() {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);

    useEffect(() => {
        async function loadFeedbacks() {
            const data = await fetchFeedbacks();
            setFeedbacks(data);
        }
        loadFeedbacks();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
            {feedbacks.length === 0 ? (
                <p>No feedbacks available.</p>
            ) : (
                <ul className="space-y-6">
                    {feedbacks.map((feedback) => (
                        <li key={feedback.id} className="border p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">{feedback.title}</h2>
                            <p className="text-gray-600">
                                {feedback.category} - {feedback.subcategory}
                            </p>
                            <p>
                                Status:{" "}
                                <span
                                    className={`font-bold ${
                                        feedback.status === "active"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {feedback.status}
                                </span>
                            </p>

                            {/* List of Questions */}
                            <h3 className="mt-4 text-lg font-semibold">Questions:</h3>
                            {feedback.questions.length === 0 ? (
                                <p className="text-gray-500">No questions available.</p>
                            ) : (
                                <ul className="mt-2 space-y-3">
                                    {feedback.questions.map((question: any) => (
                                        <li key={question.id} className="p-3 border rounded-md">
                                            <p className="font-medium">{question.text}</p>
                                            <p className="text-sm text-gray-500">
                                                Type: {question.type}
                                            </p>
                                            {/* Display options if available */}
                                            {question.options && question.options.length > 0 && (
                                                <ul className="mt-1 list-disc pl-5 text-sm text-gray-600">
                                                    {question.options.map((option: any, index: number) => (
                                                        <li key={index}>{option.value}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
