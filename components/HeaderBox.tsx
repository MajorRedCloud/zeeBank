import React from 'react'

const HeaderBox = ({type, title, user, desc} : HeaderBoxProps) => {
  return (
    <div className='header-box'>
        <h1 className='header-box-title'>
            {title}
            {type === 'greeting' && 
            <span className='text-bankGradient'>
                {` ${user}`}
            </span>} 
        </h1>
        <p className='header-box-subtext'>
            {desc}
        </p>
    </div>
  )
}

export default HeaderBox