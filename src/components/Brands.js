import React from 'react'
import Button from './Button'
import {Link} from "gatsby"

const Brands = () => {
  return (
    <section className='text-white  px-5 py-10'>
      <h2 className='text-3xl font-bold mb-5'>AS SEEN ON TOP INDUSTRY BRANDS</h2>
      <p>Zeroloss partners with worlds leading companys</p>
      <div className='flex flex-wrap justify-center gap-10 my-10'>
        <img src='/images/kryptolite.png' alt='kryptolite offical logo' className='w-40 block' height="10px" />
        <img src='/images/binance-logo.jpg' alt='Binance official logo'  width="250px"/>
        <img src='/images/ledger.png' alt='ledger official logo' width="250px" />
        <img src='/images/pancake.png' alt='pancake-swap official logo'  width="250px" />
        <img src='/images/kimberlite.png' alt='Kimberlite logo' width="150px" />
        <img src='/images/mises.jpeg' alt='Mises logo' width="150px" />
        <img src='/images/taskon.png' alt='Task ON logo' width="150px" height="50px" />
        <img src='/images/blockem.jpeg' alt='ledger logo' width="200px" />
      </div>
      <div>
        <span>and more exchanges...</span>
        <Link to="/swap">
          <Button styling="p-10 py-1 px-2 rounded-md"  bg="bg-yellow-400" text="Buy ZLT"/>
        </Link>
      </div>
    </section>
  )
}

export default Brands
