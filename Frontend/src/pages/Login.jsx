import { useState ,useContext, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const {token, setToken, navigate, backendUrl , syncCartData , getUserCart }  = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const [show, setShow] = useState(false); // show: Toggles whether to show or hide the password text (dots vs readable text).
  const handleClick = () => setShow(!show);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
         const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
         if(response.data.success){
          const newToken = response.data.token; 
          setToken(newToken);
          localStorage.setItem('token', newToken);
          await syncCartData(newToken);            // Syncing of data from guest user to login user.
          getUserCart(newToken);
         }else{
          toast.error(response.data.message)
         }
      }else{
        const response = await axios.post(backendUrl + '/api/user/login',{email,password})
        if(response.data.success){
          const newToken = response.data.token;
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          await syncCartData(newToken);             // Syncing of data from guest user to login user.
          await getUserCart(newToken);
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  } 

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ?
       '': <input onChange={(e)=>setName(e.target.value )} value={name} className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' required />
      }

      <input onChange={(e)=>setEmail(e.target.value )} value={email} className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />

      <div className='relative w-full'>
        <input 
        className='w-full px-3 py-2 border border-gray-800' 
        value={password} 
        onChange={(e)=>setPassword(e.target.value )} 
        type={show ? "text" : "password"} 
        placeholder='Password' 
        required 
        />
        <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-black"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </button>
      </div>

      <div className='w-full flex justify-between text-sm mt-[-8px ]'>
         <p className='cursor-pointer'>Forget your password ?</p>
         {
          currentState === 'Login' ?
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> :
          <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
         }
      </div>
      <button className='w-full bg-black text-white font-light px-8 py-2 mt-4 '>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>

      {currentState === 'Login' ? (
      <button className='w-full bg-black text-white font-light px-8 py-2 mt-4 ' onClick={()=>{
          setEmail("guest@example.com");
          setPassword("1234567890");
        }}>
          Get Guest User Credentials
      </button>
      ) : 
      <button className='w-full bg-black text-white font-light px-8 py-2 mt-4 ' onClick={()=>{
          setName("Guest User")
          setEmail("guest@example.com");
          setPassword("1234567890");
        }}>
          Get Guest User Credentials
      </button>}
    </form>
  )
}
