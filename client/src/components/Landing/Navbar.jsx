"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, XIcon } from 'lucide-react';
import Signup from '@/components/Landing/Signup';
import Signin from '@/components/Landing/Signin';
import { getProfile } from '@/api/auth';
import { UserNav } from '../Common/Navbar';

const NavigationItems = [
    { title: "Home", link: "/" },
    { title: "Write a Feedback", link: "/feedback/create/" },
    { title: "Read Feedbacks", link: "/feedback/" },
    { title: "Posts", link: "/posts/" },
    { title: "Forums", link: "/forum" },
];

const Navbar = () => {

    const [user, setUser] = useState();
    const setup = async() => {
        const user = await getProfile();
        if (!user.error && !user.message) {
            setUser(user);
        }
    }

    useEffect(() => {
        setup();
    }, []);

    return (
        <div className="fixed top-0 left-0 flex h-max w-screen items-center justify-between bg-white px-4 py-2 shadow-md md:px-8 z-50 text-black">
            <div className="flex items-center justify-center gap-2 md:gap-4">
                <SideMenu />
                <div><Image src="/images/logo.png" width={80} height={80} alt="ed-cred logo" className="w-8 md:w-[80px]" /></div>
                <div className="text-lg font-[500] md:text-2xl">Ed-Cred</div>
            </div>
            <div className="hidden gap-8 font-[400] md:flex">
                {
                    NavigationItems.map((item, index) => <NavigationItem {...item} key={index} />)
                }
            </div>
            {
                user ? 
                    <UserNav />
                :
                <div className="flex gap-2 md:gap-4">
                    <Signup />
                    <Signin />
                </div>
            }
        </div>
    )
};

const NavigationItem = ({ title, link }) => (
    <Link href={link}>{title}</Link>
);

const SideMenu = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="block cursor-pointer md:hidden" onClick={() => setOpen(true)}>
                <MenuIcon />
            </div>
            <div
                className="absolute top-0 flex h-screen w-screen flex-col gap-10 bg-white p-10 pt-20 transition-[left]"
                style={{ left: open ? "0%" : "-100%" }}
            >
                <div className="absolute top-4 right-4">
                    <XIcon onClick={() => setOpen(false)} />
                </div>
                <div className="flex gap-4 md:gap-4">
                    <div><Image src="/images/logo.png" width={80} height={80} alt="ed-cred logo" className="w-12" /></div>
                    <div className="text-2xl font-[500]">Ed-Cred</div>
                </div>

                <div className="flex flex-col gap-2">
                    {
                        NavigationItems.map((item, index) => <NavigationItem {...item} key={index} />)
                    }
                </div>
            </div>
        </>
    )
};

export default Navbar
