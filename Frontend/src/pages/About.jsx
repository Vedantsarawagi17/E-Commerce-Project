import { Title } from '../components/Title'
import { assets } from '../assets/frontend_assets/assets';
import { NewsletterBox } from '../components/NewsletterBox';

export const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16 '>
         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about_img" />
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut quisquam itaque odit? Dolorum animi facilis repellat nam quae eius perspiciatis voluptatem iste optio beatae vitae, cupiditate enim placeat non. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, quas.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima minus fugiat corporis amet! Quaerat distinctio alias natus possimus. Exercitationem, praesentium. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro dicta eius optio veritatis nulla earum quas quam temporibus doloribus recusandae.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus minus dolor dolorem blanditiis quas dicta cupiditate iure magni placeat. Esse? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, rem!</p>
         </div>
      </div>
      <div className='text-xl py-4 '>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className=' flex flex-col md:flex-row text-sm mb-20'>
         <div className='border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assurance:</b>
          <p className='text-gray-600 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur velit nobis amet. Eligendi doloribus quae dicta ea hic placeat molestiae officia fuga voluptatibus. Reiciendis eveniet iste eligendi? Corporis, sunt ratione.</p>
         </div>
         <div className='border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience:</b>
          <p className='text-gray-600 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur velit nobis amet. Eligendi doloribus quae dicta ea hic placeat molestiae officia fuga voluptatibus. Reiciendis eveniet iste eligendi? Corporis, sunt ratione.</p>
         </div>
         <div className='border border-gray-100 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur velit nobis amet. Eligendi doloribus quae dicta ea hic placeat molestiae officia fuga voluptatibus. Reiciendis eveniet iste eligendi? Corporis, sunt ratione.</p>
         </div>
      </div>
      <NewsletterBox />
    </div>
  )
}


