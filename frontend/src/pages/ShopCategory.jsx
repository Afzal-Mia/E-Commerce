import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/assets/dropdown_icon.png'
import Item from '../components/Item/Item';
function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className='shopCategory-banner'  src={props.banner} alt="Banner" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>Out Of 36 Products
        </p>
        <div className="shop-category-sort">
          Sort by <img src={dropdown_icon} alt="Drop-Down" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}
export default ShopCategory;