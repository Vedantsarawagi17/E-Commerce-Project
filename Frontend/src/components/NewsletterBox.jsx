export const NewsletterBox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }
  return (
    <div className='text-center '>
      <p className='tetx-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Lorem ipsum, dolor sit ametd, corrupti sint debitis vel rem quaerat earum impedit?</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-200 pl-3'>
        <input className='w-full sm:flex-1 outline-none  ' type="email" placeholder='Enter your email' required/>
        <button className='bg-black text-white text-xs py-4 px-10' type='submit' >SUBSCRIBE</button>
      </form>
    </div>
  )
}