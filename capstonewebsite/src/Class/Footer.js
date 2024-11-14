import React from 'react'

function Footer() {
    return (
        <div className='bg-black w-full drop-shadow-md h-[50vh] grid grid-cols-1 overflow-hidden'>
            <div className=' flex justify-center items-center content-center text-white '>
                <div className='text-center w-full'>
                    <div className='text-3xl text-center text-yellow-300'>Developers</div>
                    <div className='mt-3 hover:scale-110 cursor-pointer transition-all duration-500'>Christine Gonzales</div>
                    <div className='mt-1 hover:scale-110 cursor-pointer transition-all duration-500'>Johsua Villegas</div>
                    <div className='mt-1 hover:scale-110 cursor-pointer transition-all duration-500'>Edrian Loberiano</div>
                    <div className='mt-1 hover:scale-110 cursor-pointer transition-all duration-500'>Christian Dalida</div>

                </div>
                <div className='w-full text-center text-xl'>
                    <div>Copyright © 2024 GAPP ®. All rights reserved</div>
                    <div className='flex text-blue-500 text-center justify-center'>
                        <button className='mr-5 hover:underline'>Privacy Policy</button>
                        <button className='mr-5 hover:underline'>Cookies Policy</button>
                        <button className='mr-5 hover:underline'>Term of Use</button>

                    </div>
                </div>
                <div className='w-full text-center'>
                    <div className='text-3xl text-center text-blue-300'>Links</div>
                    <div className='mt-3 hover:scale-110 cursor-pointer transition-all duration-500'>Contact us</div>
                    <div className='mt-1 hover:scale-110 cursor-pointer transition-all duration-500'>About us</div>
                    <div className='mt-1 hover:scale-110 cursor-pointer transition-all duration-500'>Directions</div>
                    <div className='mt-1 hover:scale-110 cursor-pointer transition-all duration-500'>Blog</div>

                </div>
            </div>
            <div className='mt-1'>
                <div className='text-center text-white text-xl mb-2 mt-5'>Send us your message about this website</div>
                <div className='flex justify-center items-center content-center'>
                    <input className='px-5 rounded-l-md text-lg' type='email' placeholder='send message to our email' />
                    <button className='px-2 rounded-r-md bg-green-800 text-lg'>send</button>

                </div>
            </div>

        </div>
    )
}

export default Footer