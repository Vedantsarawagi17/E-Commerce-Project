import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { Title } from '../components/Title'
import { ProductItem } from '../components/ProductItem';
import { useWindowWidth } from '../../src/hooks/useWindowWidth.jsx';

export const RelatedProducts = ({category,subCategory}) => {
    const {products} = useContext(ShopContext);
    const [related,setRelated] = useState([]);
    const {productId} = useParams();
    const windowWidth = useWindowWidth();

    let limit = 2;
    if (windowWidth >= 1024) {
      limit = 5;
    } else if (windowWidth >= 768) {
      limit = 4;
    } else if (windowWidth >= 640) {
      limit = 3;
    }

    useEffect(()=>{
        if (products.length>0){ 
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category && item._id !== productId );
            setRelated(productsCopy.slice(0,limit));
        }
    },[products, limit , category , productId ])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8 '>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}