import { AppleIcon } from "lucide-react";

const Feedbacks = () => {

    const FeedbackCards = [
        {
            name: "Sarah K.",
            occupation: "Teacher @ UET",
            review: "Absolutely loved the service! The user-friendly interface and seamless experience made everything so much easier.",
            rating: 4,
            color: "#FF5050"
        },
        {
            name: "James L.",
            occupation: "Software Engineer",
            review: "A top-notch platform! Everything works smoothly, and the attention to detail in the design is impressive.",
            rating: 5,
            color: "#439E5E"
        },
        {
            name: "Emma R.",
            occupation: "Designer @ Creative Co.",
            review: "Incredible service! The support team was responsive, and the overall experience exceeded my expectations.",
            rating: 4.5,
            color: "#FFC944"
        },
        {
            name: "David W.",
            occupation: "Marketing Specialist",
            review: "Fast, reliable, and intuitive! I highly recommend this to anyone looking for a hassle-free experience.",
            rating: 5,
            color: "#3A8DFF"
        },
    ];

    return (
        <div className="my-20 flex h-auto w-full flex-col items-center justify-center gap-14 md:my-40">
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='text-3xl font-[400] md:text-4xl'>Recent <span className="font-[700]">Feedbacks</span></div>
                <div className='text-sm md:text-base'>See how our forum is making an impact!</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-10 md:w-2/3 md:flex-row md:gap-14 md:p-0 ">
                {
                    FeedbackCards.map((category, index) => <Card {...category} key={`card-${index}`} />)
                }
            </div>
        </div>
    )
}

const Card = ({ name, occupation, review, color }) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg md:w-1/4">
            <div className="flex flex-col items-center justify-center gap-1">
                <div className="text-xl font-[600]">{name}</div>
                <div className="font-[400] text-[#374151]">{occupation}</div>
            </div>
            <div className="font-[400]">{review}</div>
            <div className="flex gap-2">
                {
                    Array.from({ length: 5 }).map((_, idx) => <AppleIcon fill={idx < 4 ? color : "transparent"} stroke={color} key={`apple-${idx}`}/>)

                }
            </div>
        </div>
    )
}

export default Feedbacks;
