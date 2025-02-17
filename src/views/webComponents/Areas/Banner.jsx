import React from 'react'
import { GoSearch } from 'react-icons/go'

export const Banner = () => {
    return (
        <div className="flex justify-center text-white">
            <div
                className="relative h-[34rem] md:h-[600px] w-[90%] md:w-[95%] md:pt-[140px] bg-cover bg-center rounded-bl-[50px] rounded-br-[50px]  md:rounded-bl-[90px] gap-[10px] md:rounded-br-[90px] flex flex-col items-center justify-center"
                style={{
                    backgroundImage: "url('/Areas/banner.png')",
                }}
            >
                <h1 className='text-2xl md:text-5xl'>All AREAS IN DUBAI</h1>
                <p className='text-lg md:text-xl '>Home \  All areas in Dubai</p>
                <div className='absolute -bottom-6 md:bottom-0 w-[300px] md:w-1/2 h-16 bg-white rounded-lg flex justify-center items-center'>
                    <input type="text" className='p-3 border-2 border-[#8F8F8F] w-[220px] md:w-[620px] text-black rounded-l-md'  placeholder='Search  areas in dubai' />
                    <div className='bg-[#8F8F8F] px-4 py-[12px] rounded-r-md'>
                    <GoSearch size={24} />
                    </div>
                </div>
            </div>
        </div>
    )
}
