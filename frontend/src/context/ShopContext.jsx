import React, { createContext, useEffect, useState } from 'react'
// import all_product from '../components/assets/all_product' we will fetch it from the database using api

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product,setAll_product]=useState([]);
    const [cartItems,setCartItems]=useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{
            setAll_product(data);
        })
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    function addToCart(itemId) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));

        }
        else{
            alert('Login First');
        }
    }

    function removeFromCart(itemId) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data));

        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = all_product.find(product => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };
    function getTotalCartItems() {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }


    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
// wrap the outermost parent with this to make the context available for its children
// *****Like This******
// <ShopContextProvider>
//     <App/>
// <ShopContextProvider/>

//and to use inside a component
// const { }=useContext(ShopContext); 