import React from 'react'
import PerkItem from '../PerkItem'
import perks from '../../data/content'

const Perks = () => {
  return (
    <section className='px-4 py-10 bg-black text-white justify-evenly'>
        <div className='flex flex-wrap gap-10 sm:gap-2 justify-evenly'>
            {perks.map((item, index)=> <PerkItem key={index} content={item} />)}
        </div>
    </section>
  )
}

export default Perks