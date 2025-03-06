"use client";
import { getProfile } from '@/api/auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [profile, setProfile] = useState<any>(null);
    useEffect(() => {
        const setup = async () => {
            const profile = await getProfile();
            setProfile(profile);
        }
        setup();
    });

    return (
        <ProtectedRoute>
            <div>
                <div>Dashboard</div>
                {
                    profile && profile.username
                }
            </div>
        </ProtectedRoute>
    )
};

export default Dashboard;
