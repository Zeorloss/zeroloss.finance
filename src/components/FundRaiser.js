import React from 'react'
import Button from './Button'

const FundRaiser = () => {
  return (
    <section className="bg-[#F5F9FF] px-4 py-6 gap-4 ">
      <div className="flex justify-center">
        <div className="mb-20 md:basis-10/12  bg-black text-white flex flex-wrap  items-center gap-10 px-6 py-8 lg:py-24 lg:px-14 rounded-xl">
            <div className="text-center lg:basis-8/12">
                <h3 className="text-3xl px-4 font-medium mb-4">The official fundraiser for ZEROLOSS</h3>
                <p className="text-slate-300">We raise funds from our community for Charity and Community Building</p>
            </div>
            <div className="basis-full lg:basis-3/12"  >
                <div>
                    <Button bg="bg-yellow-400" styling="block ml-auto w-20 border-4 border-solid border-white text-black " text="Go!"/>
                </div>
            </div>
        </div>
      </div>

      <div >
        <div className="p-6 bg-white m-auto max-w-sm" >
            <h3 className="text-xl font-bold mb-10">ZEROLOSS is here to revolutionize how crypto users interact with DeFi and web3.0</h3>
            <p>read more</p>
        </div>
      </div>
    </section>
  )
}

export default FundRaiser
