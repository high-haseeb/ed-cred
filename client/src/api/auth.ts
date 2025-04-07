import { toast } from "sonner";

const BASE_URL = "188.132.135.5"  
export const API_BASE_URL = `http://${BASE_URL}:6969/auth`;

export async function signup(username: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    return data;
}

export async function login(identifier: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.error) return data;
    localStorage.setItem('token', data.token);
    return { success: true };
}

export async function getProfile() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        toast("token expired! please log in again.");
        window.location.replace("/login");
    }

    return await response.json();
}

export function logout() {
    localStorage.removeItem('token');
}
