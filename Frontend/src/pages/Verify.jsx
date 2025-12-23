import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const Verify = () => {
    const {navigate,token ,setCartItems ,backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
         try {
            if (!token) {
                return null
            }
            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe', 
                {success ,orderId}, 
                {headers : {token}}
            )

            if (response.data.success ) {
                setCartItems({});
                toast.success("Payment Successful!");
                navigate('/orders');
            }else{
                toast.error("Payment Failed");
                navigate('/cart')
            }

         } catch (error) {
            console.log(error)
            toast.error(error.message)
         }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
    </div>
  )
}

