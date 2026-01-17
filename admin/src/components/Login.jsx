import axios from 'axios'
import { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify' 
 
export const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [show, setShow] = useState(false); // show: Toggles whether to show or hide the password text (dots vs readable text).
    const handleClick = () => setShow(!show);
 

    const onSubmithandler = async (e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    } 
     
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white shadow-md rounded-lg  px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

        <form onSubmit={onSubmithandler}>

            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value = {email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
            </div>

            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <div className='relative'>
                        <input 
                            onChange={(e)=>setPassword(e.target.value)} 
                            value = {password} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type={show ? "text" : "password"}
                            placeholder='Enter your password' 
                            required 
                            autoComplete='password'
                        />
                        <button
                            type="button"
                            className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-[10px] font-bold uppercase tracking-wide text-gray-400 hover:text-black transition-colors"
                            onClick={handleClick}
                        >
                            {show ? "Hide" : "Show"}
                        </button>
                    </div>
            </div>

            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' onClick={()=>{
          setEmail("admin@forever.com");
          setPassword("admin@123");
        }}>
          Guest Admin Credentials
      </button>

        </form>

      </div>
    </div>
  )
}