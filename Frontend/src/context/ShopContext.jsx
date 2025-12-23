// import { products } from "../assets/frontend_assets/assets"; // Without products in the mongoDB Database 
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// toast => for notifications
// useNavigate => for routing
// axios => for making api calls to the backend

export const ShopContext = createContext();

export const ShopContextProvider = (props)=>{ 

    // Hardcoded Values 

    const currency = '₹'; 
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    // VITE_BACKEND_URL = "http://localhost:xyz"
    
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
    if (localStorage.getItem('token')) {
        return {}; 
    }
    const savedCart = localStorage.getItem('guestCart');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');
    const navigate  = useNavigate(); 


    useEffect(()=>{
         getProductsData()
    },[])

    useEffect(() => {
        const initializeAuth = async () => {
            const localToken = localStorage.getItem('token');
            
            if (localToken) {
                setToken(localToken);
                
                // 1. First, check if there's a guest cart to merge
                // This handles items added right before a refresh
                await syncCartData(localToken);
                
                // 2. Then, fetch the final merged cart from DB
                await getUserCart(localToken);
            }
        };

        initializeAuth();
    }, []);
    
    // Fetches the complete, up-to-date catalog of products from your backend server
    const getProductsData = async () => { 
        try {
            const response = await axios.get(backendUrl +  '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    // Get the user saved products data from database ,Restores the user's saved cart
    const getUserCart = async(token) =>  {
         try {
            const response  = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}}) 
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
         } catch (error) {
            console.log(error)
            toast.error(error.message)
         }
    }    

    // Gatekeeper for adding products with specific sizes to your user's cart
    const addToCart = async (itemId,size) => {
        
        console.log("Frontend Token:", token);
        if (!size){ 
            // User must have selected the size 
            toast.error('Select Product Size');
            return ;
        }

        let cartData = structuredClone(cartItems); 
        if(cartData[itemId]){
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1 ;
            }  
            else{
                cartData[itemId][size] = 1; 
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1; 
        }
        setCartItems(cartData);

        if (token){
        try {
            await axios.post(backendUrl + '/api/cart/add',{itemId, size}, {headers:{token}})
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            }
        }else{
        // 3. If Guest, save to LocalStorage so it stays after refresh
        localStorage.setItem('guestCart', JSON.stringify(cartData));
        }
    }

    // Syncing of cart data for guest user to login user 
    const syncCartData = async (newToken) => {
    const localCart = JSON.parse(localStorage.getItem('guestCart'));
    
    if (localCart && Object.keys(localCart).length > 0) {
        try {
            // Send the entire local object to a new 'merge' endpoint
            const response = await axios.post(backendUrl + '/api/cart/merge', 
                { localCart }, 
                { headers: { token: newToken } }
            );
            
            if (response.data.success) {
                localStorage.removeItem('guestCart'); // Clear the guest data
            }
        }catch (error) {
                console.log("Merge error:", error);
            }
        }
    };
    
    // Changes the quantity in the cart
    const updateQuantity = async (itemId,size,quantity) =>{
        let cartData = structuredClone(cartItems);

        if (quantity === 0) {
            delete cartData[itemId][size];
        // If no sizes left for this item, delete the item entirely
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

         setCartItems(cartData);
         if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity}, {headers :{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
         } else{
            localStorage.setItem('guestCart', JSON.stringify(cartData));
         }
    } 

    // Number of Items in Your Cart 
    const getCartCount = () => {
        let totalCount = 0;

        // Safety: If products haven't loaded from the backend yet, return 0
        if (!products || products.length === 0) return 0;

        for(const items in cartItems){ // Product A/B
            const productExists = products.find(p => p._id === items);
            if (productExists && cartItems[items]) {
                for (const size in cartItems[items]) {
                    if (cartItems[items][size] > 0) {
                        totalCount += cartItems[items][size];
                    }
                }
            }
        }
        return totalCount; 
    }

    // Total Value of all the items 
    const getCartAmount = () => {
        let totalAmount = 0 ;
        for (const items in cartItems) {
            let itemsinfo = products.find((product) => product._id === items);

        if (!itemsinfo) {
            continue; 
        }
            for (const item in cartItems[items]){
                try {
                    if (cartItems[items][item]>0){
                        totalAmount += itemsinfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount;
    }

    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,syncCartData,setCartItems,
        getCartCount,updateQuantity,getCartAmount,getUserCart,
        navigate,backendUrl,setToken,token
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    ) 
}

// Missing Functions -> removeFromCart , loginUser, logoutUser , clearCart