import React from 'react'

export const HowToBuy = () => {
    return (
        <div className='flex justify-center m-8'>
            <div className='max-w-5xl flex flex-wrap gap-10'>
                <img src="/Areas/BuyNow.png" alt="" className='h-[400px] w-[400px] md:h-[600px] rounded-br-[100px]' />
                <div className='max-w-[400px] flex flex-col gap-3 my-10'>
                    <h1 className='text-5xl text-[#A39D9D]'>How to Buy</h1>
                    <h3 className='text-2xl'>Property in offplan ?</h3>
                    <p className='text-[16px]'>
                        If you want to buy off-plan property by Emaar Properties you should know a few things beforehand. For example, Emaar Properties offers frequently great deals in Dubai market.
                        Today, Dubai's best areas by Emaar such as Emaar Beachfront, Downtown Dubai and Dubai Hills Estate are considered to be one of the most popular residential, tourist and business destinations.
                        Purchasing an off-plan apartment such as Emaar IL Primo comes with many benefits. For a start, off-plan property is cheaper than ready one providing high returns of investments (ROI) too.
                        Moreover, Emaar features many attractive offers including easy payment plan, DLD fees waiver or free of service charge.
                        In addition, Emaar's off-plan property is a good investment as well, given that the prices of real estate in Dubai remain stable and favorable for buyers and investors.
                        </p>
                </div>
            </div>
        </div>
    )
}
