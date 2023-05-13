import React, { useState, useEffect } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa'
import {BsListUl} from 'react-icons/bs'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { getToken, logOutSession } from '../../helper/SessionHelper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, getCatTile, removeCategory } from '../../features/api/category/categorySlice';
import { AiOutlineLogout } from 'react-icons/ai';
import { fetchProductBySearch } from '../../features/api/search/searchSlice';
const Navbar = () => {
 
   const {email} = useSelector(state=> state.login.loginWithGoogle)
   const {products} =useSelector(state=> state.products) 

   let dispatch=useDispatch()

  const [sidebarOpen, setSideBarOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [catItem, setCatItem] = useState('');
  const [search,setSearch] =useState('')
  const [searchBarOpen, setSearchBarOpen] = useState(false)



  const handleOpen=()=>{
    setSideBarOpen(!sidebarOpen)
  }


const searchBarOpenHandler=()=>{
   setSearchBarOpen(!searchBarOpen)
}
  const handleOpenCategory=()=>{
    setCategoryOpen(!categoryOpen)
  }

  let token =getToken('token')
  let Token=token || email
  const handleLogout=()=>{
   logOutSession()

   
 }

 useEffect(()=>{
    dispatch(fetchCategory(catItem))
  
 },[dispatch, catItem])


 let catTitle=products.data?.map(item=> item.category)
 

 const getCategory=(cat)=>{
       setCatItem(cat)  
 }

 useEffect(()=>{
   if(search !== ''){
      dispatch(fetchProductBySearch(search))
   }
 },[dispatch,search])

 const hanldeRemoveCatItemFromState=()=>{
   dispatch(removeCategory())
}


    return (
       <>
         <nav className='bg-primary top-16 z-40 hidden md:block'>
             <div className="container">
                 <div className="flex">
                    <div className="px-8 py-4 bg-green-900 
                     flex items-center cursor-pointer group relative">
                        
                        <span  className='text-white'>
                            <FaBars />
                         </span>
                         <span onClick={hanldeRemoveCatItemFromState} className='text-white capitalize ml-2 font-semibold'>All Categories</span>
                       
                      
                       <div className="absolute left-0 top-full w-full bg-white 
                         shadow-md invisible
                        opacity-0 group-hover:opacity-100 
                        group-hover:visible transition duration-300
                         z-50 divide-y divide-gray-300 divide-dashed">
                      
                          {[...new  Set(catTitle)].map((cateItem, ind)=>(
                           <button key={ind} onClick={()=>getCategory(cateItem)} className=' flex items-center w-full px-6 py-3
                           hover:bg-primary hover:text-white transition overflow-hidden'>
                            {cateItem}
                          </button>

                          ))}
                       
                        
                       </div>
                    </div>
                  
                   <div className=" flex items-center justify-between  flex-grow pl-12 text-white">
                       <div className="flex items-center space-x-6 text-base capitalize">
                          <Link to='/' className='text-white hover:text-gray-200 transition'>Home</Link>
                          <Link to='/shop' className='text-white hover:text-gray-200 transition'>Shop</Link>
                          <Link to='/about' className='text-white hover:text-gray-200 transition'>About Us</Link>
                          <Link to='/contactus' className='text-white hover:text-gray-200 transition'>Contact Us</Link>
                       </div> 
                       <div>
                       {!Token && <Link to='/login' className='cursor-pointer text-white hover:text-gray-200 transition'>Login/Register</Link>}
                   {Token && <Link to='/'>  <span  onClick={()=>handleLogout()} className='cursor-pointer text-white hover:text-gray-200 transition'>
                   <span  className='flex items-center px-6 py-3 gap-1'>
                        
                        <AiOutlineLogout className='bg-[#14532D] px-1 py-1 w-[30px] h-[30px]  rounded-full  text-white ' /> Logout
             
                     </span>
                   </span>
                   </Link> }
                       </div>
                   </div>

                 </div>
             </div>
        </nav>


        {/* mobile menu bar */}
        <div className="fixed z-50 w-screen broder-gray-200 shadow-sm bg-white py-3 bottom-0 left-0 p-x-5  flex  justify-between items-center px-6 md:hidden">
           <div onClick={handleOpen}  className='block text-center text-gray-700 hover:text-primary transition ralative'>
              <div className='text-2xl' id='menuBar'>
                 <FaBars />
              </div>
              <div className="text-xs leading-3 ">Menu</div>
           </div>
           <div onClick={handleOpenCategory}  className='block text-center text-gray-700 hover:text-primary transition ralative'>
              <div className='text-2xl' id='Category'>
                 <BsListUl />
              </div>
              <div className="text-xs leading-3 ">Categories</div>
           </div>

     
           <button onClick={searchBarOpenHandler}  className='block text-center cursor-pointer text-gray-700 hover:text-primary transition ralative'>
             
              <div className='text-2xl' id='search'>
                 <TbSearch />
              </div>
              <div className="text-xs leading-3 ">Search</div>
           </button>
        </div>
        
        {/* mobile sidebar */}
         <div className={`fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-30 transition duration-300 shadow ${!sidebarOpen ? 'hidden' : 'block'}`}>
            <div className="absolute left-0 top-0 w-72 h-full z-50 bg-white shadow transition duration-300">
                <div onClick={handleOpen} className=" hover:text-red-800 absolute right-3 top-3 text-white">
                  <FaTimes />
                </div>
                <h3 className="text-xl font-semibold  mb-2 font-roboto pl-4 pt-4 pb-4 bg-primary text-white ">Menu</h3>
            <Link to='/' className="block py-4 px-4 font-medium transition hover:bg-gray-200 border-b"> Home</Link>
            <Link to='/shop' className="block py-4 px-4 font-medium transition hover:bg-gray-200 border-b"> Shop</Link>
            <Link to='/' className="block py-4 px-4 font-medium transition hover:bg-gray-200 border-b"> About Us</Link>
            <Link to='/' className="block py-4 px-4 font-medium transition hover:bg-gray-200 border-b"> Contact Us</Link>
            </div>
         </div>
        {/* mobile Categorice */}
         <div className={`fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-30 transition duration-300 shadow ${!categoryOpen ? 'hidden' : 'block'}`}>
            <div className="absolute left-0 top-0 w-72 h-full z-50 bg-white shadow transition duration-300">
                <div onClick={handleOpenCategory} className=" hover:text-red-800 absolute right-3 top-3 text-white">
                  <FaTimes />
                </div>
                <h3 className="text-xl font-semibold  mb-2 font-roboto pl-4 pt-4 pb-4 bg-primary text-white ">Categrise</h3>
                {[...new  Set(catTitle)].map((cateItem, ind)=>(
                           <button key={ind} onClick={()=>getCategory(cateItem)} className=' flex items-center w-full px-6 py-3
                           hover:bg-primary hover:text-white transition overflow-hidden'>
                            {cateItem}
                          </button>

                          ))}
            </div>
         </div>
      {/* mobile Search Input */}
        <div className="md:hidden relative">
        <div className={` flex justify-center items-center  fixed z-50 left-0 top-20 w-full   ${searchBarOpen === true  ? 'block' : 'hidden'}`}>
            <span className='relative'>
            <TbSearch className='absolute left-5 -top-2  text-lg text-gray-400' />
            </span>
            <input type='text' onChange={(e)=> setSearch(e.target.value)} value={search}  className='pl-12 w-full sm:w-3/4 border   border-r-0 border-primary py-3 rounded-2-md focus:ring-primary' placeholder='Search' />
            <button  className='bg-primary border border-primary text-white px-2 py-3'> Search</button>
      </div>
        </div>
       </>
    );
};

export default Navbar;