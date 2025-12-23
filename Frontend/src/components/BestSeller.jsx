import { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { Title } from './Title.jsx'; 
import { ProductItem } from './ProductItem.jsx';
import { useWindowWidth } from '../hooks/useWindowWidth.jsx';

export const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);
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
       const bestProduct = products.filter((item)=>(item.bestseller))   
       setBestSeller(bestProduct.slice(0,limit))
    },[products, limit])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, voluptatibus asperiores nemo rerum facere deserunt itaque et quaerat tempore provident quos debitis aut pariatur nam culpa minus laboriosam quibusdam molestias.</p>
        </div>      
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

{/*rafce*/}
