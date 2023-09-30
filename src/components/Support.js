import React from 'react'
import Button from './Button'
import {Link} from "gatsby"

const Support = () => {
  return (
    <section className='bg-white text-center px-5 py-10 md:py-40'>
      <h2 className='text-3xl font-bold mb-5'>Officially Supported Wallets</h2>
      <p>Wallets for Bep20 and ERC20 Tokens</p>
      <div className='flex flex-wrap justify-center gap-5 my-10 md:my-20 items-center'>
        <img src='/images/trustwallet.png' alt='trust-wallet logo'  width="250px" />
        <img src='/images/metamask.png' alt='metamask logo'  width="250px"/>
        <img src='/images/ledger.png' alt='ledger logo' width="250px" />
        
      </div>
      <Link to="https://bscscan.com/token/0x05d8762946fa7620b263e1e77003927addf5f7e6">
        <Button styling="p-10 py-1 px-2 rounded-md"  bg="bg-yellow-400" text="Token Explorer"/>
      </Link>
    </section>
  )
}

export default Support
