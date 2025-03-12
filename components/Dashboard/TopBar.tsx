"use client";
import { getProfile } from '@/api/auth';
import { BellIcon, MailIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const TopBar = () => {
    const [profile, setProfile] = useState<any>(null);
    useEffect(() => {
        const setup = async () => {
            const profile = await getProfile();
            setProfile(profile);
        }
        setup();
    }, []);

    return (
        <div className='fixed top-0 left-0 w-full shadow-sm h-max p-2 flex gap-8 items-center px-8 bg-white'>
            <Logo />
            <SearchBar />
            <div className='flex gap-4 ml-auto items-center justify-center'>
                <BellIcon size={20} />
                <MailIcon size={20}/>
                <div className='h-8 w-0.5 bg-black/10'></div>
                <Avatar />
                <div className='font-semibold text-left'>
                    {profile && profile.username}
                    <br />
                    <div className='font-normal text-xs'>{profile && profile.email}</div>
                </div>
            </div>
        </div>
    )
}

const Logo = () => (
    <div className='flex items-center justify-center gap-4 px-2' >
        <div><Image src='/images/logo.png' width={80} height={80} alt='ed-cred logo' className='w-8 md:w-[40px]' /></div>
        <div className='text-lg font-[500] md:text-2xl'>Ed-Cred</div>
    </div>
)

const Avatar = () => {
    return(
    <div className='w-10 h-8 rounded-full'><Image src={"/images/dp.png"} width={100} height={100} alt='profile-picture' /></div> 
    )
}

const SearchBar = () => {

    return (
        <div className='flex gap-2 items-center'>
            <input type="text" className='py-2 px-4 bg-black/5 rounded-md' placeholder='search' />
            <button className='bg-black/5 rounded-full p-2 cursor-pointer'><SearchIcon className='' /></button>
        </div>
    )
}

export default TopBar;
