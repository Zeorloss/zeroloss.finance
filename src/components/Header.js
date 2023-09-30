import React, { useState } from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineClose} from "react-icons/ai"
import { menuItem } from '../data/content'

const Header = () => {
    const [navOpen, setNavOpen] = useState(false)
    const toggle=()=> setNavOpen(!navOpen)
  return (
    <header className='bg-black text-white flex items-center px-4 py-4 relative max-w-[1300px] m-auto '>
        <Link to='/'>
            <img src='/images/tZeroloss_logo.png' width="80px" alt="zeroloss logo" />
        </Link>
        {/* <nav className={`${navOpen?"absolute top-[80px]  bg-black  w-screen translate-x-0":"md:translate-x-0 translate-x-[-1000px] sm:ml-auto sm:w-auto   sm:h-min"}      `} > */}
        <nav className={`${navOpen?" translate-x-0 top-[80px] z-50 h-[100vh]  w-screen":"translate-x-[-1000px] md:translate-x-0"} bg-black absolute md:!static md:ml-auto sm:w-auto   sm:h-min` } >
            <menu className='flex md:!flex-row flex-col  basis-full '>
                {menuItem.map((item,index)=> <li className='text-center p-5 text-xl' key={index}><a {...(item.download? "download": "")} href={item.url.toLowerCase()}>{item.linkText}</a></li>)}
            </menu>
        </nav>
        <div className='ml-auto lg:ml-10 flex gap-2'>
            <Link to="/swap">
                <Button text="Defi" bg="bg-yellow-400 " styling="py-1 px-2 rounded-md py-1 px-2"/>
            </Link>
            {/* <GrClose color='red' size="200px"/> */}
            {navOpen?<AiOutlineClose onClick={toggle} className="md:hidden"  color='white' size="30px"/>:<GiHamburgerMenu onClick={toggle} color="yellow" className='basis-full md:invisible' size="30px" />
             }
            <div className='flex'>
            </div>
        </div>

    </header>
  )
}

export default Header