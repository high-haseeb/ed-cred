'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { API_BASE_URL } from '@/api/config';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            return;
        }

        fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`, {
            method: 'GET',
        })
            .then(res => {
                if (res.ok) setStatus('success');
                else throw new Error();
            })
            .catch(() => setStatus('error'));
    }, [token]);

    if (status === 'loading') return <p>Verifying...</p>;
    if (status === 'success') return <p>Email verified successfully! 🎉</p>;
    return <p>Invalid or expired link 😢</p>;
}
