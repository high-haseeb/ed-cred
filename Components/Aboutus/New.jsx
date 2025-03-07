<div className="relative flex justify-center">
    {/* Larger Image */}
    <div className="relative w-5 h-56 md:w-45 md:h-45 md:-right-20">
        <Image
            src="/AboutUs/Papers.jpeg"
            alt="Educational setting"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl border-7 border-white shadow-lg"
        />
    </div>

    {/* Overlapping Smaller Image */}
    <div className="absolute w-40 h-40 md:w-40 md:h-50 top-28  md:top-32 ">
        <Image
            src="/AboutUs/meeting.jpeg"
            alt="Learning environment"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl border-7 border-white shadow-lg"
        />
    </div>
</div>