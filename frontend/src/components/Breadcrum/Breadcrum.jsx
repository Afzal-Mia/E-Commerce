import React from 'react'
import arrow_icon from '../assets/breadcrum_arrow.png'
import './Breadcrum.css'

const Breadcrum = (props) => {
  const {product}=props;
  return (
    <div className="breadcrum">
HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />
{product.category} <img src={arrow_icon} alt="" />
This is a bread crum on the product display components
    </div>
  )
}
export default Breadcrum;
