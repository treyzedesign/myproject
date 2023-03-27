import axios from 'axios';
import React from 'react'
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie'
import "../admin.css"
const AdminUser = () => {
  const [Users, setUsers] = useState([]);
  const [mailbox, setmailbox] = useState(false)
  const [mItem, setmItem] = useState([])
  const [filter, setfilter] = useState("")
  const subjectRef = useRef(null)
  const bodyRef = useRef(null)

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

  const mail_user = (item)=>{
      setmItem(item)
      setmailbox(true)
  }
  const sendmail = async (data)=>{
    if(data.email.length == 0 || data.firstName.length == 0 || subjectRef.current.value.length == 0 || bodyRef.current.value.length == 0){
      alert("fill the input fields")
    }else{
      const token = Cookies.get('AccessToken')
      const mail = {
        email: data.email,
        name: data.firstName,
        subject: subjectRef.current.value,
        body: bodyRef.current.value
      }  
      await axios.post(`http://localhost:3001/api/v1/signup/send-message`, mail, {
        headers:{
          "token" : token
        }
      }).then((feedback)=>{
        console.log(feedback);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
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
    <th></th>
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
    <td><FaEnvelope style={{fontSize:"25px", cursor:"pointer"}} onClick={()=> mail_user(item)}/></td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
  })
  
  return (
    <div>
      {mailbox && 
        <div className='detail-box '>
            <div className='prod-detailbox' style={{height:"80vh",marginTop:"10vh",left:"28vw", width:"40vw"}}>
              <button type="button" class="close det-close" onClick={()=> setmailbox(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4>send a message</h4>
              <hr/>
              <div>
                <label>subject:</label>
                <input type="text" className='form-control' ref={subjectRef}/>
              </div>
              <div>
                <label>body:</label><br/>
                <textarea cols="60" rows="8" ref={bodyRef}></textarea>
              </div>
              <div>
                <button className='btn btn-success w-25' onClick={()=> sendmail(mItem)}><FaPaperPlane/></button>
              </div>
            </div>
        </div>
}
        <section class="ftco-section product">
        <div class="container table-cont">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section bg-secondary mt-5">Users Table</h2>
            </div>
          </div>
          <div className='mb-5'> 
              <h5>filter</h5>
              <input placeholder='by id, firstname, lastname, email' className='form-control shadow-lg' onChange={(e)=>{setfilter(e.target.value)}}/> 
            </div>
           {myUsers}
        </div>
        {/* <div className='text-center'><button className='btn btn-warning'>see all</button></div> */}
      </section>
    </div>
  )
}

export default AdminUser