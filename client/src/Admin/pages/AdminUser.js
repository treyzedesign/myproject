import axios from 'axios';
import React from 'react'
import { useState, useEffect, useRef} from 'react'
import "../admin.css"
const AdminUser = () => {
  const [Users, setUsers] = useState([]);
  const [filter, setfilter] = useState("")
  const user_url = `http://localhost:3001/api/v1/signup/`
  const fetchUsers = async(user_url)=>{
     await axios.get(user_url).then((feedback)=>{
      console.log(feedback.data)
      let data = feedback.data
      setUsers(feedback.data)

     })
  }
  useEffect(() => {
    fetchUsers(user_url)
  }, []);
  const life = filter
  const myUsers = Users.filter(item => item.id.includes(life) ||
                                       item.firstName.trim().includes(life) ||
                                       item.lastName.trim().includes(life) ||
                                       item.email.trim().includes(life)).map((item, index)=>{
    return <div class="row">
    <div class="col-md-12">
    <div class="table-wrap">
    <table class="table text-center">
    <thead class="thead-primary">
    <tr key={index} className="text-black bg-secondary">
    <th>#</th>
    <th>Id</th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Email</th>
    <th>State</th>
    <th>Country</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>{index + 1}</td>
    <td>{item.id}</td>
    <td>{item.firstName}</td>
    <td>{item.lastName}</td>
    <td>{item.email}</td>
    <td>{item.state}</td>
    <td>{item.country}</td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
  })
  
  return (
    <div>
        <section class="ftco-section product">
        <div class="container table-cont">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section bg-secondary mt-5">Users Table</h2>
            </div>
          </div>
          <div className='mb-5'> 
              <h5>filter</h5>
              <input placeholder='by id, firstname, lastname, email' className='form-control' onChange={(e)=>{setfilter(e.target.value)}}/> 
            </div>
           {myUsers}
        </div>
        {/* <div className='text-center'><button className='btn btn-warning'>see all</button></div> */}
      </section>
    </div>
  )
}

export default AdminUser