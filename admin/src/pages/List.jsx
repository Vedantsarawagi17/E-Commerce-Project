import { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../assets/assets'
import { PopUp } from '../components/PopUp'
// POST: Method :- It takes 3 arguments (URL, Body, Headers) .
// GET: Method :- It takes 2 arguments (URL, Headers).
// Headers :- Information about the request eg:- token, Content-Type
// Body :- The actual data eg:- name, price, images

// GET: The URL might look like .../api/order/list?token=123. This is bad because URLs are saved in browser history, server logs, and visible to anyone looking at the screen.

// POST: The data is hidden inside the Request Body. Using POST is a common pattern when developers want to ensure that "nothing is visible in the URL." 

export const List = ({token}) => {

  const [list,setList] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl  + '/api/product/list',{ headers: { token }})

      if (response.data.success) {
       setList(response.data.products); 
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowPopup(true);
  }

  const confirmDelete = async (enteredPassword) => {
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (enteredPassword !== ADMIN_PASSWORD) {
      return toast.error("Incorrect Password!");
    }

    // Close popup and proceed with deletion
    setShowPopup(false);

    try {
      const response = await axios.post(backendUrl + '/api/product/remove',{id : selectedId},{headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2 '>
        {/*----------- List Table Title ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* ----------- Product List ------------ */}
        {
          list.map((item,index)=> (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm   ' key={index} >
              <img className='w-12 ' src={item.image[0]} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <img className='w-4 h-4 md:m-auto cursor-pointer hover:scale-125 transition-all duration-200' onClick={()=>openDeleteModal(item._id)} src = {assets.cross_icon} alt = "cross_icon" />
            </div>
          ))
        }
      </div>
      {showPopup && (
        <PopUp 
          onConfirm={confirmDelete} 
          onClose={() => setShowPopup(false)} 
        />
      )}
    </>
  )
}
