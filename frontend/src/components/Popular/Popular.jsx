import './Popular.css';
// import data_product from '../assets/data'; in place of this popular_products
import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';

const Popular = () => {
  const [popular_products,setPopularProducts]=useState([]);
  useEffect(()=>{
    fetch('https://e-commerce-a4no.onrender.com/popularinwomen')
    .then((res)=>res.json())
    .then((data)=>{
      setPopularProducts(data);
    })
  })

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popular_products.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
