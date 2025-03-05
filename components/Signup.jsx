"use client";
import { useState } from 'react'
import Button from './ui/Button';
import { CircleXIcon } from 'lucide-react';

const Signup = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="border" onClick={() => setOpen(true)}>Join Now</Button>
            <div className='fixed bottom-0 left-0 flex h-[93vh] w-screen flex-col items-center justify-center gap-4 rounded-t-2xl bg-white font-sans font-[400] shadow-inner transition-[bottom]'
                style={{ bottom: open ? "0" : "-100%" }}
            >
                <div className='text-3xl font-bold'>Sign Up below</div>
                <form className='flex w-1/4 flex-col gap-2'>
                    <div>
                        <label>Email</label>
                        <input
                            className='input'
                            type='email'
                            required
                            placeholder='Enter Email'
                        />
                    </div>
                    <div>
                        <label>Username</label>
                        <input
                            className='input'
                            type='text'
                            required
                            placeholder='Username' />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type='password'
                            required
                            className='input'
                            placeholder='Password (minimum 8 characters)'
                        />
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            required
                            className='input'
                            placeholder='Confirm Password'
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                        <input type="checkbox" id="newsletter" className="h-5 w-5 cursor-pointer accent-primary" />
                        <label htmlFor="newsletter" className="cursor-pointer text-black/70">
                            I'd like to receive newsletter & paid plans.
                        </label>
                    </div>
                    <Button variant='primary' type="submit"><div className='text-lg'>Join Now</div></Button>
                </form>
                <div className="flex items-center gap-4 w-1/4">
                    <div className="h-px flex-1 bg-gray-400"></div>
                    <div className="text-black">OR</div>
                    <div className="h-px flex-1 bg-gray-400"></div>
                </div>
                <div className='flex w-1/4 flex-col gap-2'>
                    <button className='rounded-2xl bg-[#F3F9FA] px-8 py-4'>
                        Sign in with Google
                    </button>
                    <button className='rounded-2xl bg-[#F3F9FA] px-8 py-4'>
                        Sign in with Facebook
                    </button>
                    <div>Already have an account? <span className='text-primary'>Sign in</span></div>
                </div>
                <CircleXIcon onClick={() => setOpen(false)} size={50} strokeWidth={1} stroke='#00000099' className='absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer' />
            </div>
        </>
    )
}

export default Signup
