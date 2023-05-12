import React from 'react'
import { useState, useEffect , useRef} from 'react'
import { BsTrash, BsPlusCircle } from 'react-icons/bs'
import {AiOutlineUserDelete, AiOutlineUsergroupDelete} from 'react-icons/ai'

import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import "../admin.css"


const AdminSettings = () => {
  const [cat, setcategory] = useState([])
  const [addCat , setAddCat] = useState(false)
  const [allAdmin, setAllAdmin] = useState([])
  const  categoryRef= useRef(null)
  const fetchcategory = async()=>{
    await axios.get(`http://localhost:3001/api/v1/category`).then((feedback)=>{
      // console.log(feedback.data.msg);
      setcategory(feedback.data.msg)
    }).catch((error)=>{
      console.log(error.message);
    })
    await axios.get(`http://localhost:3001/api/v1/getAllAdmin`,{
      headers:{
        "usertoken": cookie
      }
    }).then((feedback)=>{
      // console.log(feedback.data.data);
      setAllAdmin(feedback.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  const cookie = Cookies.get("UserLoginToken")
  const categorysaver = async()=>{
    const obj ={
      category_name : categoryRef.current.value
    }
    await axios.post(`http://localhost:3001/api/v1/category`, obj, {
      headers:{
        "usertoken": cookie
      }
    }).then((feedback)=>{
      // console.log(feedback);
      setAddCat(false)
    }).catch((err)=>{
      console.log(err);
      setAddCat(true)
    })
  }
  const delCategory = async(id)=>{
    await axios.delete(`http://localhost:3001/api/v1/category/${id}`,{
      headers:{
        "usertoken": cookie
      }
    }).then((feedback)=>{
      console.log(feedback);
      toast.success(feedback.data.msg, {
        theme: "colored",
      })
    }).catch((err)=>{
      console.log(err);
      toast.error(err.data.msg, {
        theme: "colored",
      })
    })
  }
  const delAdmin = async(id)=>{
    let accept = window.confirm("Are you sure about this?")
    if(accept){
      await axios.patch(`http://localhost:3001/api/v1/removeAdmin/${id}`,{},{
        headers:{
          "usertoken": cookie
        }
      }).then((feedback)=>{
        console.log(feedback);
        toast.success(feedback.data.message)
      }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message)  
      })
    }
  }

  const removeAllAdmin = async()=>{
    let accept = window.confirm("Are you sure about this")
    if (accept){
      await axios.patch(`http://localhost:3001/api/v1/removeAllAdmin`,{},{
        headers:{
          "usertoken": cookie
        }
      }).then((feedback)=>{
        console.log(feedback);
        toast.success(feedback.data.message)
      }).catch((err)=>{
        console.log(err);
        toast.error(err.response.data.message)  
      })
    }
  }
  useEffect(() => {
    fetchcategory()

  }, [cat, allAdmin]);
  // cat
  return (
    <div>
     <ToastContainer/>
      <div className='col-lg-12'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='rounded-lg shadow-lg mt-3 py-2 px-2' >
               <h5 className='px-2'>Categories</h5><hr/> 
              <table class="table  table-borderless">
                <tbody>
                  <tr>
                    {addCat && <>
                      <td><input type="text" className='form-control' style={{border:"none", borderBottom: "1px solid green"}} ref={categoryRef}/></td>
                      <td><button onClick={()=> categorysaver()} className='btn btn-outline-success'>save</button></td>
                    </>
                      
                    }
                  </tr>
                  {
                    cat.map((item,index)=>{
                      return(
                        <tr key={index}>
                          <td className='font-weight-bolder'>{item.category_name}</td>
                          <td><BsTrash className='pointer fs-5 text-danger' onClick={()=> delCategory(item.id)} style={{cursor:"pointer"}}/></td>
                        </tr>
                      )
                    })
                  }
                  <tr className='text-center'>
                    <td className='text-center' colSpan={3} style={{cursor:"pointer"}}><BsPlusCircle className='fs-3' onClick={()=> setAddCat(true)}/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='rounded-lg shadow-lg mt-3 py-2 px-2' >
               <h5 className='px-2'>Admins</h5><hr/> 
              <table class="table  table-borderless">
                <tbody>
                  {allAdmin.length == 0 && <h6 className='text-center px-3 font-weight-bolder'>No user has been assigned as an Admin</h6> }

                  {
                    allAdmin.map((item,index)=>{
                      return(
                        <tr key={index}>
                          <td className='font-weight-bolder'>{item.email}</td>
                          <td><AiOutlineUserDelete className='pointer fs-5 text-danger' onClick={()=> delAdmin(item.id)} style={{cursor:"pointer"}}/></td>
                        </tr>
                      )
                    })
                  }
                  <tr className='text-center'>
                    <td className='text-center' colSpan={3} style={{cursor:"pointer"}}><AiOutlineUsergroupDelete className='fs-3' onClick={()=> removeAllAdmin()}/></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings