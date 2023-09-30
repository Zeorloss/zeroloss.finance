import React from 'react'
import Typewriter from 'typewriter-effect';
import Button from '../Button';
import {Link} from "gatsby"

const Landing = () => {
  return (
    <div className='mt-10 flex text-center md:text-left flex-wrap-reverse  md:justify-evenly items-center justify-center gap-10 text-white bg-black px-4 pb-10 '>
        <div className='basis-full md:basis-5/12'>
            <div className=' font-extrabold m-auto  text-3xl md:text-5xl'>
                <Typewriter 
                    style={{
                        fontFamily: "sans-serif",
                        fontWeight: 800,
                        fontSize: "50px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        color: "gold",
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Best Web3 experience Guaranteed!!")
                          .pauseFor(1000)
                          .deleteAll()
                          .typeString(
                            '<strong>This is <span style="color: gold;">Zeroloss</span></strong>'
                          )
                          .start();
                      }}/>
            </div>

            <p className=' md:border-l-8 md:border-solid md:mt-14 md:border-b-stone-800 mt-4 md:text-left sm:pl-2'>DeFi 3.0 dApp | ZeroVerse POWERED BY ZLT</p>
            <p className='mt-4 md:mt-16'> Zeroloss is the utility, ZLT is the currency with PMM algorithm.</p>
            <Link to="/swap">
              <Button styling="text-yellow-400 m-auto block md:m-0 mt-4 py-1 px-2 rounded-md" text="Buy ZLT"></Button>
            </Link>
        </div>
        <div className='basis-5/12'>
            <img src='/images/zeroloss-dev1.png' className="max-w-xs md:max-w-full " alt='landing from' />
        </div>
    </div>

  )
}

export default Landing