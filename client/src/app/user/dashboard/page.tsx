"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import { useUserProfile } from "@/hooks/useProfile"
import { fetchFeedbacks } from "@/api/feedback";

const UserDashboardPage = () => {
    const { user } = useUserProfile();
    const [review, setReviews] = useState<any[]>([]);
    useEffect(() => {
        const setup = async () => {
            const reviews = await fetchFeedbacks();
            setReviews(reviews);
        }
        setup();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-cetner justify-between">
            <Navbar/>
            <div className="w-max mx-auto h-full flex flex-col items-center justify-center mt-40 gap-4">
                {
                    review.map((review) => (review.responses.map((response) => <ReviewCard response={response} key={response.id} />)))
                }
            </div>
        </div>
    )
}

        // salary:          boolean;
        // schoolName:      boolean;
        // schoolWebsite:   boolean;
        // schoolCountry:   boolean;
        // reportingPeriod: boolean;
        // pricipalName:    boolean;
        // pricipalDivison: boolean;
        // directorName:    boolean;

const ReviewCard = ({ response } : { response: any}) => {
    return (
        <div className="w-80 border-2 border-muted rounded-md px-3 py-2 flex flex-col gap-2 shadow-lg">
            {response.details?.pricipalName ?
            <div className="text-lg font-semibold">Pricipal {response.details.pricipalName}</div> : <></>
            }
            <div className="text-lg font-semibold">{response.details.schoolName}</div>
            <div className="text-base font-normal">{response.details.schoolWebsite}</div>
        </div>
    )
}

export default UserDashboardPage;
