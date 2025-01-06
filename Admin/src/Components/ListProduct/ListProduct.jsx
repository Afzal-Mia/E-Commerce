import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'



function ListProduct() {
    const [allproducts, setAllProducts] = useState([]);
    const fetchInfo = async () => {
        await fetch('https://e-commerce-a4no.onrender.com/allproducts')
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data);
            })
    }
    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product=async(id)=>{
        console.log("clicked on remove icon")
        await fetch('https://e-commerce-a4no.onrender.com/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }
    return (
        <div className='list-product'>
            <h1>All Products Lists</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return <React.Fragment key={product.id}>
                    <div className="listproduct-format-main  listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>&#x20B9;{product.old_price}</p>
                        <p>&#x20B9;{product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
                    </div>
                    <hr/>
                    </React.Fragment>
                })}

            </div>
        </div>
    )
}

export default ListProduct;
