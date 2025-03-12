import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define question types
type QuestionType = "rating" | "multiple_choice" | "true_false" | "open_ended";

interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[]; // Only for multiple_choice
    answer?: string | number | boolean; // Placeholder for response
}

interface QuestionStore {
    questions: Question[];
    addQuestion: (question: Question) => void;
    removeQuestion: (id: string) => void;
    sendQuestions: () => Promise<void>;
}

// Create the Zustand store
export const useQuestionStore = create<QuestionStore>()(
    persist(
        (set, get) => ({
            questions: [],
            addQuestion: (question) =>
                set((state) => ({ questions: [...state.questions, question] })),
            removeQuestion: (id) =>
                set((state) => ({
                    questions: state.questions.filter((q) => q.id !== id),
                })),
            sendQuestions: async () => {
                const { questions } = get();
                try {
                    const response = await fetch("https://your-api.com/questions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ questions }),
                    });

                    if (!response.ok) throw new Error("Failed to send questions");

                    set({ questions: [] }); // Clear after sending
                } catch (error) {
                    console.error("Error sending questions:", error);
                }
            },
        }),
        { name: "question-store" } // Persist to local storage
    )
);
