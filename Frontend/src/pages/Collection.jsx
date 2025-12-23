import { useContext, useEffect, useState } from 'react' ;
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { Title } from '../components/Title';
import { ProductItem } from '../components/ProductItem';

export const Collection = () => {
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]); 
  const {products , search ,showSearch} = useContext(ShopContext);
  const [filterProducts,setFilterProducts] = useState([])
  const [sortType,setSortType] = useState('relevant');
  const [showFilter,setShowFilter] = useState(false);

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  // useEffect is a "Listener".Watch these specific variables, and as soon as one of them changes,run this function automatically.
  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  const applyFilter = (()=>{
     // let productsCopy = [...products] // Another method to copy products
    let productsCopy = products.slice();
    if (showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    // Initially filterProducts is defined as empty array of products
    setFilterProducts(productsCopy)
  })

  // useEffect is a "Listener". Watch these specific variables, and as soon as one of them changes,run this function automatically.
  // Automatically re-order the products whenever the user changes the sort dropdown
  useEffect(()=>{
    sortProduct();
  },[sortType])

  const sortProduct = (()=>{
    // let fpCopy = [...filterProducts] // Another method to copy products
    let fpCopy = filterProducts.slice();
    switch(sortType){
      
      // If result of (a - b) is negative, 'a' stays first (Lower price first)
      case'low-high':
      setFilterProducts([...fpCopy].sort((a,b)=>(a.price - b.price)));
      break;
      
      // If result of (b - a) is negative, 'b' stays first (Higher price first)
      case'high-low':
      setFilterProducts([...fpCopy].sort((a,b)=>(b.price - a.price)));
      break;
      
      default:
        applyFilter();
        break;
      }
    })

  return (

    // sm -> Minimum Width 640 px   md -> Minimum Width 768 px   lg -> Minimum Width 1024 px
    // text-base -> 16px/1rem

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options*/}
      <div className='min-w-55'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-2xl text-gray-500 flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-4 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="dropdown_icon" />
        </p>

        {/* Category Filter */}
        {/* onChange is specially designed to detect a change in state like checkboxes and dropdowns */}
        <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-md font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Men'} />Men
            </p>
            <p className='flex gap-2 '>
              <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Women'} />Women
            </p>
            <p className='flex gap-2 '>
              <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Kids'} />Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter  */}
        {/* onChange is specially designed to detect a change in state like checkboxes and dropdowns */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?'':'hidden'} sm:block`}>
          <p className='mb-3 text-md font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Topwear'}/>Topwear
            </p>
            <p className='flex gap-2 '>
              <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Bottomwear'}/>Bottomwear
            </p>
            <p className='flex gap-2 '>
              <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Winterwear'}/>Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
         <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'All'} text2={'COLLECTIONS'}/> 

          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-400 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
          </div>
          
          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
            filterProducts.length > 0 ? filterProducts.map((item, index) => (
              <ProductItem 
              key={index} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} />
            )) : 
            <p className='col-span-full text-center text-gray-500 py-10'>
              No products found matching your filters.</p>
            }
          </div>
      </div>
    </div>
  )
}

// Features to add :-
// URL Synchronization like id also search based both
// Skeleton Loading States
// sort by price
// Result Count
// "Clear All Filters" Button