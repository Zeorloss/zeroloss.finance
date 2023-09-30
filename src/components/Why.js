import React from 'react'

const Why = () => {
  return (
    <section className='flex flex-wrap text-center lg:text-left flex-col-reverse items-center justify-center lg:flex-row gap-10  bg-slate-700 text-white px-4 py-40'>
        <div className='basis-5/12 sm:max-w-3xl'>
            <h2 className='text-4xl mb-10'>Why <span className='text-yellow-400 '>ZEROLOSS</span></h2>
            <h3 className='font-bold text-lg'>The Future of Stable Decentralized Finance</h3>
            <p className='my-5 leading-relaxed'>{"ZEROLOSS is a smart DeFi dApp and exchange platform built for a sustainable future for every crypto user with the POE and Proactive Market Making (PMM) algorithm. it was developed entirely in-house by the DODO team and is an elegant, on-chain generalization of orderbook trading. It is adapted and optimized for operations on the blockchain and has proven itself to be highly performant and capital-efficient (as its high volume/TVL ratio can attest) with many innovative, flexible use cases in market making with very reduced risk."}</p>
            <p className='my-5 leading-relaxed'>{"ZLT is a great asset to earn value on your long term stablecoins, BTC, ETH, BNB and and other crypto holdings, all interoperable, unstoppable and onchain through our PMMe stake pool! There's a time lock on the zeroloss utility contract, IZO and other Defi Blue Chips, which makes ZLT sustainable."}</p>
            <p className='my-5 leading-relaxed'>{"Zeroloss is a fork in the road. It takes us from where we’ve been to where we’re destined to go: a global society that is secure, transparent, and fair, and which serves the many as well as the few. Like the technological revolutions that have come before, it offers a new template for how we work, interact, and create, as individuals, businesses, and societies. Leap on the ZEROLOSS Rug-proof dApp to Profit in Defi 3.0."}</p>
        </div>
        <div className='basis-5/12 '>
            <img className='block m-auto' src={"/images/Zeroloss_inside.png"} alt="zeroloss logo" width="300px" />
        </div>
    </section>
  )
}

export default Why
