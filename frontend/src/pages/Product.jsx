import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; 
import Breadcrum from '../components/Breadcrum/Breadcrum';
import { ShopContext } from '../context/ShopContext';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

function Product() {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();//useParams is a React Router hook that allows you to access the URL parameters defined in a route.

  // Optionally find the specific product using productId
  const product = all_product.find((item) => item.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  );
}

export default Product;
