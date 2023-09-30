import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='bg-black'>
        <Header></Header>
        <main className='max-w-[1300px] m-auto'>
        {children}
        </main>
        <Footer/>
    </div>
  )
}


export default Layout
