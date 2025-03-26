import { toast } from "sonner";
import { API_BASE_URL } from "./config";

const API_URL = `${API_BASE_URL}/feedback-form`

export async function getFeedbackByCategory(catgeoryId: string) {
    try {
        const response = await fetch(`${API_URL}/category/${catgeoryId}`);
        const body = await response.json();
        return body;
    } catch (e) {
        toast.error("Something went wrong while fetching the feedback form");
        return false;
    }
    return true;
}

export async function sendFeedback(feedback: any) {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedback),
        });

        if (!response.ok) throw new Error('Failed to send feedback');
        const body = await response.json();
        console.log(body);
        toast(`<pre>${JSON.stringify(body, null, 2)}</pre>`);
        return body;
    } catch (error) {
        console.error("Error sending feedback:", error);
        return null;
    }
}

export async function fetchFeedbacks() {
    try {
        const response = await fetch(`${API_URL}`);

        if (!response.ok) throw new Error('Failed to fetch feedbacks');

        return await response.json();
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return [];
    }
}

export async function fetchFeedbackById(id: string) {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) throw new Error('Failed to fetch feedback');

        return await response.json();
    } catch (error) {
        console.error("Error fetching feedback:", error);
        return null;
    }
}
