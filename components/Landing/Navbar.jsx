"use client";
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { MenuIcon, XIcon } from 'lucide-react';
import Signup from '../Signup';
import Signin from '../Signin';

const NavigationItems = [
    { title: "Home", link: "/home" },
    { title: "Write a Feedback", link: "/feedback/new" },
    { title: "Read Feedbacks", link: "/feedback/read" },
    { title: "Forums", link: "/forums" },
    { title: "Disscussion Boards", link: "/disscussion-boards" },
    { title: "Dispute Review", link: "/dispute-review" },
];

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 flex h-max w-screen items-center justify-between bg-white px-4 py-2 shadow-md md:px-8 z-50">
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
            <div className="flex gap-2 md:gap-4">
                <Signup />
                <Signin />
            </div>
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
