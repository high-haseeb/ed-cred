import { toast } from "sonner";
//const API_BASE_URL  = "http://localhost:6969/posts"
const API_BASE_URL  = "http://188.132.135.5:6969/posts"

export interface Post {
    id?: string;
    title: string;
    description: string;
    status: "active" | "draft";
    featured: boolean;
    image: string | null;
    body: any;
    createdAt?: string;
}

// Generic function to handle API requests
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T | null> {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error: ${response.status} - ${errorText}`);
            toast.error(`Error: ${response.status} - ${errorText}`);
            return null;
        }
        return response.json();
    } catch (error) {
        console.error("Network error:", error);
        toast.error("Network error: Failed to connect to server");
        return null;
    }
}

// Function to fetch all posts (without body)
export async function getPosts(): Promise<Omit<Post, 'body'>[] | null> {
    return apiRequest<Omit<Post, 'body'>[]>(API_BASE_URL);
}

// Function to fetch a single post (with body)
export async function getPost(id: string): Promise<Post | null> {
    return apiRequest<Post>(`${API_BASE_URL}/${id}`);
}

// Function to save a new post
export async function savePost(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post | null> {
    return apiRequest<Post>(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });
}

// Function to update an existing post
export async function updatePost(id: string, post: Omit<Post, 'id' | 'createdAt'>): Promise<Post | null> {
    return apiRequest<Post>(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });
}

// Function to delete a post
export async function deletePost(id: string): Promise<boolean> {
    const response = await apiRequest<void>(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });
    return response !== null;
}
