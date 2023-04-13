import React from 'react'
import { useState, useEffect } from 'react'
import { BsTrash, BsPlusCircle } from 'react-icons/bs'
import axios from 'axios'

const AdminSettings = () => {
  const [cat, setcategory] = useState([])
  
  const fetchcategory = async()=>{
    await axios.get(`http://localhost:3001/api/v1/category`).then((feedback)=>{
      console.log(feedback.data.msg);
      setcategory(feedback.data.msg)
    }).catch((error)=>{
      console.log(error.message);
    })
  }
  useEffect(() => {
    fetchcategory()
  }, []);
  return (
    <div>
      <div className='col-lg-12'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='rounded-lg shadow-lg mt-3 py-2 px-2' >
               <h5 className='px-2'>Categories</h5><hr/> 
              <table class="table  table-borderless">
                <tbody>
                  {
                    cat.map((item,index)=>{
                      return(
                        <tr key={index}>
                          <td className='fw-1'>{item.category_name}</td>
                          <td><BsTrash className='pointer fs-5 text-danger' style={{cursor:"pointer"}}/></td>
                        </tr>
                      )
                    })
                  }
                  <tr className='text-center'>
                    <td className='text-center' colSpan={3} style={{cursor:"pointer"}}><BsPlusCircle className='fs-3'/></td>
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