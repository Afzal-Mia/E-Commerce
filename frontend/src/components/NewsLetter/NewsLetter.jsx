import React from 'react'
import './NewsLetter.css'
function NewsLetter() {
  return (
    <div className="newsletter">
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscriber to our newletter and stay updated</p>
        <div>
            <input type="email" placeholder='Enter your email id' />
            <button>Subcribe</button>
            
        </div>
    </div>
  )
}

export default NewsLetter;