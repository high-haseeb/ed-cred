import { SearchIcon } from 'lucide-react'
import React from 'react'

const Searchbar = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <input type="text" placeholder='search' className="rounded-full border border-[#C7BAAF] bg-white p-2 px-4 md:p-4 md:px-8 shadow-md md:w-auto w-1/2" />
            <button className="cursor-pointer rounded-full bg-primary p-2 md:p-3"><SearchIcon color="white" strokeWidth={3} /></button>
        </div>
    )
}

export default Searchbar
