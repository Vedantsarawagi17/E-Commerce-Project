import { assets } from '../assets/frontend_assets/assets'

export const Hero = () => {
  // sm -> Minimum Width 640 px   md -> Minimum Width 768 px   lg -> Minimum Width 1024 px
  // text-base -> 16px/1rem
  return (        
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
       <div className='text-[#414141]'>
        <div className='flex items-center gap-2 '>
            <hr className='w-8 md:w-11  h-0.5 bg-[#414141]' />
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
        </div>
        <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
        <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p> 
            <hr className='w-8 md:w-11 h-0.5 bg-[#414141]'/>
        </div>
       </div>
      </div>
      {/* Hero Right side */}
      <img className='w-full sm:w-1/2  ' src={assets.hero_img} alt="hero_img" />
    </div>
  )
}