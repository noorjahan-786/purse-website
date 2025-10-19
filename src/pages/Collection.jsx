import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem';
import { FaFilter } from "react-icons/fa";
import { HiSortDescending } from "react-icons/hi";

const Collection = () => {
  const {products,search, showSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const[category,setCategory] = useState([]);
  const [sortType,setSortType] = useState('relevant')
  // const [subcategory,setSubcategory] =useState([])
  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !==e.target.value))
      
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  const applyFilter = () =>{
    let productsCopy = products.slice();

    if (showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length >0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy)
  }
  
  const sortProduct = ()=>{
    let fpCopy = filterProducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)))
        break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
          break;

        default:
          applyFilter();
          break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category,setCategory, search, showSearch]);
  // also can add (,subCategory)
  useEffect(()=>{
    sortProduct();
    
  }, [sortType])



  return (
    <div className='flex flex-col sm:ml-0 ml-2 sm:flex-row gap-15 sm:gap-10 pt-10 sm:border-t'>
      {/* Desktop Filter */}
      <div className={` ml-10 sm:min-w-60  ${showFilter ? '' :'hidden'} sm:block`}>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2 '>FILTERS</p>
        {/* category Filter */}
        <div className='border border-gray-300 pl-5 py-3 mt-6 '>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className=' flex flex-col gap-2 text-sm font light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3 ' type='checkbox' value={'men-purse'} onChange={toggleCategory}/>Men's Purse
            </p>
            <p className='flex gap-2'>
              <input className='w-3 ' type='checkbox' value={'men-belt'} onChange={toggleCategory}/>Men's Belt
            </p>
              <p className='flex gap-2'>
              <input className='w-3 ' type='checkbox' value={'men-jacket'} onChange={toggleCategory}/>Men's Jackets
            </p>
            <p className='flex gap-2'>
              <input className='w-3 ' type='checkbox' value={'women-purse'} onChange={toggleCategory}/>Women's Purse
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className='flex-1 mr-10'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
           <Title text1={'ALL '} text2={'COLLECTION'}/>
           {/* product sort */}
           <select  onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 py-1'>
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">sort by: High to LOw</option>
           </select>
        </div>
        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} originalPrice={item.originalPrice} discount={item.discount} image={item.image}/>
            ))
          }
        </div>
      </div>
    {/* Mobile Bottom Bar */}
      <div className='sm:hidden fixed bottom-0 left-0 w-full flex justify-around bg-white text-black h-12 border-t z-50'>
        <button className='flex items-center gap-1' onClick={()=>setShowFilter(!showFilter)}>
          <FaFilter />
          <span>FILTER</span>
        </button>
        <button className='flex items-center gap-1'>
          <HiSortDescending />
          <span>SORT</span>
        </button>
      </div>

      {/* Mobile Filter Slide-in */}
      {showFilter && (
        <div className='fixed inset-0 bg-black/50 z-50 flex'>
          <div className='bg-white w-3/4 p-5 overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>Filters</h2>
              <button onClick={()=>setShowFilter(false)} className='text-xl font-bold'>&times;</button>
            </div>
            {/* Filter content same as desktop */}
            <div className='flex flex-col gap-3'>
              <p className='text-sm font-medium'>CATEGORIES</p>
              <label className='flex items-center gap-2'>
                <input type='checkbox' value='men-purse' onChange={toggleCategory} className='w-4 h-4'/>
                Men's Purse
              </label>
              <label className='flex items-center gap-2'>
                <input type='checkbox' value='men-belt' onChange={toggleCategory} className='w-4 h-4'/>
                Men's Belt
              </label>
              <label className='flex items-center gap-2'>
                <input type='checkbox' value='men-jacket' onChange={toggleCategory} className='w-4 h-4'/>
                Men's Jackets
              </label>
              <label className='flex items-center gap-2'>
                <input type='checkbox' value='women-purse' onChange={toggleCategory} className='w-4 h-4'/>
                Women's Purse
              </label>
            </div>
          </div>
          <div className='flex-1' onClick={()=>setShowFilter(false)}></div>
        </div>
      )}
          
    </div>
  )
}

export default Collection