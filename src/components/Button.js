import React from 'react'

const Button = ({text, styling, bg, action}) => {
  return (
    <button onClick={action} className={`${bg?bg: "bg-black"} ${styling}   `}>{text}</button>
  )
}

export default Button
