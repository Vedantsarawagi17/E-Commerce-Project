import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Title } from './Title'
import { ProductItem } from './ProductItem';
import { useWindowWidth } from '../../src/hooks/useWindowWidth.jsx';

export const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const windowWidth = useWindowWidth(); 

  let limit = 8;
  if (windowWidth >= 1024) { 
      limit = 15;
  } else if (windowWidth >= 768) { 
      limit = 12;
  } else if (windowWidth >= 640) {
      limit = 9;
  }

  useEffect(() => {
    if(products.length > 0){
      setLatestProducts(products.slice(0, limit)); 
    }
  },[products, limit]);

  return (
   <div className='my-10'>
     <div className='text-center py-8 text-3xl'>
       <Title text1={'LATEST'} text2={"COLLECTIONS"} />
       <p className='w-3/4 m-auto tetx-xs sm:text-sm md:text-base text-gray-600'>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat iusto ullam, em qs.</p>
     </div>
     {/* Rendering Products*/}
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gay-y-6'>
      {
        latestProducts.map((item,index)=>(
           <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
      }
     </div>
   </div>
   )
 }
  