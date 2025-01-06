import React, { useEffect, useState } from 'react'
import './NewCollection.css'
// import new_collection from '../assets/new_collections' 
// we will fetch it from the database last 8 recently addded products 
import Item from '../Item/Item';

 const NewCollection = () => {
  const [new_collection,setNewCollection]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/newcollection")
    .then((res)=>res.json())
    .then((data)=>{
      setNewCollection(data);
    })
  })
  
  return (
    <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
        {new_collection.map((item, i) => (
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
  )
}
export default NewCollection;