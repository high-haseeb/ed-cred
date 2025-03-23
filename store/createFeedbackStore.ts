import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface Feedback {
    id: string;
    title: string;
    category: string;
    subcategory: string;
    status: "active" | "inactive";
    details: {
        name: boolean;
        country: boolean;
        dates: boolean;
        salary: boolean;
        web: boolean;
    }
}

interface FeedbackSotre {
    feedback: Feedback | null;
    setFeedback: (feedback: Feedback) => void;
    sendFeedback: () => Promise<void>;
}

export const useFeedbackStore = create<FeedbackSotre>()(
    persist(
        (set, get) => ({
            feedback: null,
            setFeedback: (feedback) =>
                set(() => ({ feedback })),
            sendFeedback: async () => {
                const { feedback } = get();
                try {
                    const response = await fetch("https://your-api.com/questions", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ feedback }),
                    });

                    if (!response.ok) throw new Error("Failed to send questions");

                    set({ feedback: null }); 
                } catch (error) {
                    toast(`Error saving the feedback: ${error}`);
                    console.error("Error sending questions:", error);
                }
            },
        }),
        { name: "question-store" }
    )
);
