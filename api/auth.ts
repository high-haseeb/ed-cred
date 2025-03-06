const API_BASE_URL = 'http://localhost:6969/auth';

export async function signup(username: string, email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) return data;
    return data;
}

export async function login(identifier: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }), // identifier can be username or email
    });

    const data = await response.json();
    console.log(data);
    if (data.error) return data;
    localStorage.setItem('token', data.accessToken);
    return { success: true };
}

export async function getProfile() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User not authenticated');

    const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }

    return await response.json();
}

export function logout() {
    localStorage.removeItem('token');
}
