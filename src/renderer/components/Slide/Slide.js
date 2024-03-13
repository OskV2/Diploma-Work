import React from 'react'
import './Slide.scss'

const Slide = (props) => {
  return (
    <div className='Slide'>
        <img className='Slide__image' src={props.img} alt="Slide image" />
        <h2 className='Slide__title' >{props.title}</h2>
    </div>
  )
}

export default Slide