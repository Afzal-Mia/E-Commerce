import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
const CartItems = () => {
    const { all_product, cartItems, removeFromCart,getTotalCartAmount} = useContext(ShopContext);
    return (
        <div className="cartitem">
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((item) => {
                if (cartItems[item.id] > 0) {
                    return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={item.image} alt="" className='carticon-product-icon' />
                            <p>{item.name}</p>
                            <p>&#x20B9;{item.new_price}</p>
                            <button className="cartitems-quantity">{cartItems[item.id]}</button>
                            <p>&#x20B9;{item.new_price * cartItems[item.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(item.id) }} alt="" />
                        </div>
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>&#x20B9;{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Free</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            
                            <h3>Total</h3>
                            <h3>&#x20B9;{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode or voucher ,Enter here to get the discount</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='promocode' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems