import React from 'react';

import { AiOutlineLogout} from 'react-icons/ai'

import {FaUserAlt} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { getToken, getUserDetails,  logOutSession } from '../../helper/SessionHelper';



const AdminNav=()=>{

const navigate=useNavigate()

const {email, photoURL,displayName} = useSelector(state=> state.login.loginWithGoogle)

let token =getToken('token')
let UserDetails=getUserDetails() 


let name;
let isAdmin;
if(!UserDetails){
    name=null;
    isAdmin=null
}else{
  name=  UserDetails[0]['name']
  isAdmin=UserDetails[0]['isAdmin']  
}




const handleLogout=()=>{
  logOutSession()

  navigate('/login')

}






let userName= name || displayName
let accessToken=token || email


    return(
        <header className='bg-slate-800 w-full sticky top-0 z-50 shadow-sm shadow-primary  py-4'>
            <div className='container flex items-center justify-between'>
               {/* logo start */}
               <NavLink to='/' className='text-white font-bold sm:w-1/4 '>
                   {/* <img src /> */} E-Plants-muscat 
                </NavLink>
              {/*End  logo start */}
    

      <div className='space-x-4 flex items-center'>
           {/* <Link to='/' className="block text-center  text-white hover:text-primary transition relative">
                 
                 <span className='absolute -top-4  right-1 w-5 h-5 bg-red-600  rounded-full  flex justify-center items-center text-xs'>5</span>
                 <div className="text-2xl select-all text-center flex items-center justify-center">
                    <AiFillHeart  />
                 </div>
                 <div className="text-sm font-semibold leading-3">Wish List</div>
           </Link> */}
       
           <div className="flex">
                 
                 <div className="px-8 py-4 bg-primary  flex items-center cursor-pointer group relative">
                    <span className='text-white'>
                      {photoURL  ? (<img src={photoURL} alt='profile' className='h-[32px]' />) : <FaUserAlt  /> } 
                    </span>
                 
                    <div className="text-sm font-semibold leading-3 text-white px-2">{!userName ? 'Account' : `${userName || name.name}`}</div>
                  {!accessToken ? (<div className="absolute left-0 top-full w-full bg-white 
                         shadow-md invisible
                        opacity-0 group-hover:opacity-100 
                        group-hover:visible transition duration-300
                         z-50 divide-y divide-gray-300 divide-dashed ">
                         <div className="flex flex-col">
                         <Link to='/login' className='flex items-center px-6 py-3'>Login</Link>
  
                         </div>
                         </div>) : 
                  (
                    <div className="absolute left-0 top-full w-full bg-white 
                         shadow-md invisible
                        opacity-0 group-hover:opacity-100 
                        group-hover:visible transition duration-300
                         z-50 divide-y divide-gray-300 divide-dashed ">
                         <div className="flex flex-col">
                         
                        
                         
                         
                        {isAdmin === true ?  <Link to='/CreateProduct' className='flex items-center px-1 py-3 gap-1' >Admin Dashboard</Link> : 
                        <Link to='/customerOrderInfo'> 
                        <button  className='flex items-center px-1 py-3 '>Customer DashBoard</button> 
                        </Link>
                        }
                        <Link  to='/'>
                            <span  className='flex items-center px-6 py-3 gap-1' onClick={handleLogout}>
                        
                             <AiOutlineLogout className='bg-[#14532D] px-1 py-1 w-[30px] h-[30px]  rounded-full  text-white ' /> Logout
                  
                          </span>
                            
                         </Link>
                         </div>
                         </div>)
                         }  
                 </div>
                 
           </div>
      </div>
            </div>
        </header>
    )
}

export default AdminNav
