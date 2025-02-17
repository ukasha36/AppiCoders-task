import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { TiMinus, TiPlus } from 'react-icons/ti';

export const Faqs = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: 'Do I really need a Realtor when buying a home?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing do eumod tempor incidunt labore dolore magna aliqua enim minim veniam. quis nostrud exercitation laboris nis aliquip ex ea comodo consequat duis aute irure.'
        },
        {
            question: 'Can a home depreciate in value?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing do eumod tempor incidunt labore dolore magna aliqua enim minim veniam. quis nostrud exercitation laboris nis aliquip ex ea comodo consequat duis aute irure.'
        },
        {
            question: 'Is an older home as good a value as a new home?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing do eumod tempor incidunt labore dolore magna aliqua enim minim veniam. quis nostrud exercitation laboris nis aliquip ex ea comodo consequat duis aute irure.'
        },
        {
            question: 'Who pays the Realtor fees when buying a home?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing do eumod tempor incidunt labore dolore magna aliqua enim minim veniam. quis nostrud exercitation laboris nis aliquip ex ea comodo consequat duis aute irure.guidelines.'
        },
        {
            question: 'How much should I offer the sellers?',
            answer: 'Lorem ipsum dolor sit amet consectetur adipisicing do eumod tempor incidunt labore dolore magna aliqua enim minim veniam. quis nostrud exercitation laboris nis aliquip ex ea comodo consequat duis aute irure.and assistance.'
        }
    ];
    return (
        <div
            className="flex justify-center items-start p-6 lg:p-24 gap-4 flex-col bg-transparent text-white"
        >
            <h1 className='md:text-4xl text-2xl text-gray-500 py-8'>Frequently asked questions</h1>
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="w-full mb-2">
                    <div className="transition duration-300 ">
                        <div
                            className={`flex justify-between items-center roundedxl cursor-pointer `}
                            onClick={() => toggleAccordion(index)}
                        >
                            <h1 className='md:text-xl text-lg text-gray-600 py-4'>{faq.question}</h1>
                            <span className='md:text-2xl text-xl px-4 text-gray-600'>
                                {activeIndex === index ? <IoIosArrowUp className='animate-bounce' /> : <IoIosArrowDown />}
                            </span>
                        </div>
                        {activeIndex === index && (
                            <div className="p-4 text-gray-500 rounded-b-xl">
                                <p className='text-sm md:text-lg px-4'>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
