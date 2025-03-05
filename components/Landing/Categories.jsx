import Image from "next/image";

const Categories = () => {

    const CategoriesCards = [
        { title: "Teachers", icon: "teacher.png", description: "Lorem Ipsum is simply dummy text of the printing." },
        { title: "Leadership Members", icon: "leadership-members.png", description: "Lorem Ipsum is simply dummy text of the printing." },
        { title: "Staff Members", icon: "staff-members.png", description: "Lorem Ipsum is simply dummy text of the printing." },
        { title: "Districts", icon: "districts.png", description: "Lorem Ipsum is simply dummy text of the printing." },
    ];

    return (
        <div className="flex h-auto w-full flex-col items-center justify-center gap-14 pb-20">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-max rounded-full bg-[#A1AF001A] p-2 px-4 font-sans text-xs  font-[400] tracking-widest text-[#439E5E] md:text-base">
                    CATEGORIES
                </div>
                <div className="text-3xl font-[400]">What are <span className="font-bold">you looking for?</span></div>
            </div>
            <div className="flex w-2/3 items-center justify-center gap-8 flex-wrap md:flex-nowrap">
                {
                    CategoriesCards.map((category, index) => <Card {...category} key={`card-${index}`} />)
                }
            </div>
        </div>
    )
}

const Card = ({ title, icon, description }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg">
            <div><Image src={`/icons/${icon}`} width={100} height={300} alt={title} /></div>
            <div className="text-xl font-[600]">{title}</div>
            <div className="font-[400]">{description}</div>
        </div>
    )
}

export default Categories;
