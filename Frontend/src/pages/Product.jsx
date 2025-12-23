import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { RelatedProducts } from '../components/RelatedProducts';

export const Product = () => {
  // useParams is a hook provided by React Router to read the dynamic part of the URL address
  const {productId} = useParams();
  const {products , currency , addToCart} = useContext(ShopContext);
  // Re-renders the component to update it .
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('')

  useEffect(()=>{
    fetchProductData();
  },[productId,products])

  const fetchProductData = async () => {
    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }
  
  return productData?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
         {/* Product Images  */}
         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
         <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' src={item} key={index} alt="product-image"/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto ' src={image} alt="" />
          </div>
         </div>
         {/* Product Information */}
         <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2 '>
            <img className='w-3.5 ' src={assets.star_icon} alt="star-icon" />
            <img className='w-3.5 ' src={assets.star_icon} alt="star-icon" />
            <img className='w-3.5 ' src={assets.star_icon} alt="star-icon" />
            <img className='w-3.5 ' src={assets.star_icon} alt="star-icon" />
            <img className='w-3.5 ' src={assets.star_dull_icon} alt="star-dull-icon" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2 '>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`py-2 px-4 border border-gray-100 bg-gray-100
                  ${item === size ?'border-orange-500':'border-y-gray-300'}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)}  className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5 border-gray-100'/> 
          <div className='text-sm text-gary-500 mt-5 flex flex-col gap-1 '>
            <p className='text-gray-500'>100% Original Product.</p>
            <p className='text-gray-500'>Cash On delivery is available on this product</p>
            <p className='text-gray-500'>Easy returns and exchange policy within 7 days.</p>
          </div>
         </div>
      </div>
      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex '>
          <b className='border border-gray-200 px-5 py-3 text-sm '>Description</b>
          <p className='border border-gray-200 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='border-gray-200 flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 '>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat voluptatem adipisci, numquam, delectus aliquid unde itaque provident pariatur esse quisquam illo minus. Eos omnis tenetur necessitatibus eaque at ea, deleniti velit! Nesciunt saepe totam cupiditate id inventore ad praesentium cum, numquam ipsa odit impedit repudiandae, iusto quod eveniet ullam at reprehenderit sequi expedita officiis eligendi provid.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam blanditiis architecto, odio ipsam molestiae esse labore sint fugit officia distinctio vitae. Repellat quos harum omnis, corporis nihil earum quibusdam dolore</p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ): <div className='opacity-0'></div>
}



// Suggestions to make it "Better":
// 1. Optimization: Use .find() instead of .map() In your fetchProductData, replace the map with this:
// const fetchProductData = async () => {
//   const item = products.find(item => item._id === productId);
//   if (item) {
//     setProductData(item);
//     setImage(item.image[0]);
//   }
// }
// 2. User Feedback: Size Selection If a user clicks "ADD TO CART" without picking a size, nothing happens. You can improve the addToCart logic in your context or here:
// onClick={() => {
//   if (!size) {
//     alert("Please select a size first!");
//   } else {
//     addToCart(productData._id, size);
//   }
// }}

// Related Products