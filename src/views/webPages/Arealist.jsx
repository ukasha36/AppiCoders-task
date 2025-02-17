import React from 'react'
import { Banner } from '../webComponents/Areas/Banner'
import { AreaList } from '../webComponents/Areas/AreaList'
import { HowToBuy } from '../webComponents/Areas/HowToBuy'
import PropertyList from '../webComponents/Home/PropertyList/PropertyList'
import PopularAreas from '../webComponents/Home/PopularAreas/PopularAreas'
import { GetInTouch } from '../webComponents/Areas/GetInTouch'
import { Faqs } from '../webComponents/Areas/Faqs'
import { Inquiry } from '../webComponents/Areas/Inquiry'
import AgentSlider from '../webComponents/Home/AgentSlider/AgentSlider'

export const Arealist = () => {
  return (
    <div>
        <Banner />
        <AreaList />
        <HowToBuy />
        <GetInTouch />
        <PopularAreas />

        <div className='flex flex-col lg:flex-row justify-center'>
        <div className='w-full lg:w-2/3'>
        <Faqs />
        </div>
        <div className='w-'>
            <Inquiry />
        </div>
        </div>

        <AgentSlider />
        <PropertyList />

    </div>
  )
}
