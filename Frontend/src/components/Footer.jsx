import { assets } from '../assets/frontend_assets/assets'

export const Footer = () => {
  return (
    <div>
      <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small'>
         <div>
            <img className='mb-5 w-32 ' src={assets.logo } alt="logo" />
            <p className='w-full md:w-2/3 text-gray-600 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel laudantium, eveniet soluta magnam rerum dicta animi voluptas corporis quae explicabo ipsa voluptatem asperiores quod nam alias. Corrupti explicabo laudantium excepturi.</p>
         </div>
         <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                 <li>Home</li>
                 <li>About Us</li>
                 <li>Delivery</li>
                 <li>Privacy Policy</li>
            </ul>
         </div>
         <div>
            <p className='text-xl font-medium mb-5  '>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-9352281155</li>
                <li>+1-212-456-7890</li>
                <li>contact@ecommerce.com</li>
            </ul>
         </div>
      </div> 
      <div>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center '>Copyright 2025@ ecommerce.com All Right Reserved.</p>
      </div>
    </div>
  )
}
