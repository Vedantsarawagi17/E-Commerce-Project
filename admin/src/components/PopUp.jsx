import { useState , useRef } from 'react';
import { assets } from '../assets/assets'

export const PopUp = ({onClose , onConfirm}) =>{
    const [password, setPassword] = useState('');
    const popUpRef = useRef();

    const closePopUp = (e) =>{
        if(popUpRef.current === e.target){
            onClose();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(password);
    }

  return (
    <div className='fixed inset-0 bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50' ref={ popUpRef } onClick = {closePopUp} >
        <div className='bg-white p-8 rounded-lg shadow-2xl w-[90%] max-w-md flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>Admin Verification</h1>
                <img onClick={onClose}
                className="w-4 cursor-pointer hover:scale-110 transition-all"
                src={assets.cross_icon}
                alt="x_icon" />
            </div>
            <h1 className='text-gray-500 text-sm'> Please Enter the Password. </h1>
                
            <form className='flex flex-col gap-4' onSubmit = { handleSubmit } >
                    <input className='border border-gray-300 px-4 py-2 rounded outline-none focus:border-orange-500 transition-all'
                    type="password" 
                    placeholder='Enter Password'
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                    required />
                    <button 
                    className='bg-black text-white py-2 rounded font-medium hover:bg-gray-600 transition'
                    type="submit"> Confirm </button>
            </form>
      </div>
    </div>
  );
};