import React from 'react'

export const Inquiry = () => {
    return (
        <div className='flex justify-around p-6 lg:p-24'>
            <div className='py-8 px-4  border-2 border-gray-400 rounded-lg'>
                <h1 className='text-2xl text-gray-500'>Ask Your Valuable Questions</h1>
                <div className='flex flex-col gap-1 my-2'>
                <label className='text-md text-gray-500'>Full Name</label>
                <input 
                type="text"
                placeholder='Enter First Name' 
                className='w-full p-2 border-[1px] border-gray-400 rounded-md focus:outline-none'/>
                <label className='text-md text-gray-500'>Your Phone</label>
                <input 
                type="tel"
                placeholder='Enter First Name' 
                className='w-full p-2 border-[1px] border-gray-400 rounded-md focus:outline-none'/>
                <label className='text-md text-gray-500'>Email Address</label>
                <input 
                type="email"
                placeholder='Enter First Name' 
                className='w-full p-2 border-[1px] border-gray-400 rounded-md focus:outline-none'/>
                <label className='text-md text-gray-500'>Message</label>
                <textarea className='w-full p-2 border-[1px] border-gray-400 rounded-md focus:outline-none h-24 resize-none'></textarea>
                </div>
                
            </div>
        </div>
    )
}
