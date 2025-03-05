"use client";
import { useState } from 'react'
import Button from './ui/Button';
import { CircleXIcon } from 'lucide-react';

const Signup = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="border" onClick={() => setOpen(true)}>Join Now</Button>
            <div className='fixed bottom-0 left-0 flex h-[93vh] w-screen flex-col items-center justify-center gap-4 rounded-t-2xl bg-white font-sans font-[400] shadow-inner transition-[bottom] p-6 sm:p-8'
                style={{ bottom: open ? "0" : "-100%" }}
            >
                <div className='text-2xl sm:text-3xl font-bold'>Sign Up below</div>
                <form className='flex w-full max-w-md flex-col gap-4'>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            className='w-full p-3 border rounded-md'
                            type='email'
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            className='w-full p-3 border rounded-md'
                            type='text'
                            required
                            placeholder='Username'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type='password'
                            required
                            className='w-full p-3 border rounded-md'
                            placeholder='Password (minimum 8 characters)'
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type='password'
                            required
                            className='w-full p-3 border rounded-md'
                            placeholder='Confirm Password'
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <input type="checkbox" id="newsletter" className="h-5 w-5 cursor-pointer accent-primary" />
                        <label htmlFor="newsletter" className="cursor-pointer text-black/70">
                            I'd like to receive newsletters & paid plans.
                        </label>
                    </div>
                    <Button variant='primary' type="submit" className="w-full">
                        <div className='text-lg'>Join Now</div>
                    </Button>
                </form>
                <div className="flex items-center gap-4 w-full max-w-md">
                    <div className="h-px flex-1 bg-gray-400"></div>
                    <div className="text-black">OR</div>
                    <div className="h-px flex-1 bg-gray-400"></div>
                </div>
                <div className='flex w-full max-w-md flex-col gap-3'>
                    <button className='w-full rounded-2xl bg-[#F3F9FA] px-6 py-3'>
                        Sign up with Google
                    </button>
                    <button className='w-full rounded-2xl bg-[#F3F9FA] px-6 py-3'>
                        Sign up with Facebook
                    </button>
                    <div className="text-center">Already have an account? <span className='text-primary cursor-pointer'>Sign in</span></div>
                </div>
                <CircleXIcon onClick={() => setOpen(false)} size={40} strokeWidth={1} stroke='#00000099' className='absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer' />
            </div>
        </>
    )
}

export default Signup;
