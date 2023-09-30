import React from 'react'

const CardItem = ({content}) => {
  return (
    <div className='shadow-xl border py-8 px-5 sm:basis-5/12 lg:basis-[25%]'>
      <div className='rounded-full w-[100px] h-[100px] bg bg-zinc-200 flex m-auto justify-center items-center  '>
        <img className='block m-auto' width="50px" src={`/images/${content.icon}`} alt={content.alt} />
      </div>
      <h3 className='text-2xl font-semibold my-8'>{content.lead}</h3>
      <p className='font-normal'>{content.sub}</p>
    </div>
  )
}

export default CardItem
