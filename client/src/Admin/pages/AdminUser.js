import axios from 'axios';
import React from 'react'
import { FaEnvelope, FaPaperPlane, FaEye , FaChessPawn, FaChessKnight, FaChessQueen} from 'react-icons/fa';
import { useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import "../admin.css"
const AdminUser = () => {
  const [Users, setUsers] = useState([]);
  const [mailbox, setmailbox] = useState(false)
  const [mItem, setmItem] = useState([])
  const [dItem, setdItem] = useState([])
  const [userOrder, setUserOrder] = useState([])
  const [token, setToken] = useState([])
  const [details, setDetails]= useState(false)
  const [filter, setfilter] = useState("")
  const subjectRef = useRef(null)
  const bodyRef = useRef(null)
// fetch all users
  const cookie = Cookies.get("UserLoginToken")
  const decoder = jwt_decode(cookie)
  const user_url = `http://localhost:3001/api/v1/signup/`
  const fetchUsers = async(user_url)=>{
     await axios.get(user_url, {
      headers:{
        "usertoken" : cookie
      }
     }).then((feedback)=>{
      console.log(feedback.data)
      let data = feedback.data
      setUsers(feedback.data)

     }).catch((err)=>{
        console.log(err);
     })
  }
  useEffect(() => {
    fetchUsers(user_url)
    setToken(decoder)
    // console.log(decoder);
  }, []);

  const mail_user = (item)=>{
      setmItem(item)
      setmailbox(true)
  }
 //get user orders 

  // send user mail
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
          "usertoken" : token
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
    return <tbody>
    <tr key={index}>
    <td>{index + 1}</td>
    <td>{item.id}</td>
    <td>{item.firstName}</td>
    <td>{item.lastName}</td>
    <td>{item.email}</td>
    <td>{item.state}</td>
    <td>{item.country}</td>
    <td><FaEye className='order_btn' onClick={()=> userInfo(item)}/></td>
    <td><FaEnvelope style={{fontSize:"25px", cursor:"pointer"}} onClick={()=> mail_user(item)}/></td>
    <td>{item.isAdmin == true && item.superAdmin == false ? <FaChessKnight/> : <FaChessPawn/> && item.superAdmin == true && item.isAdmin == false ? <FaChessQueen/> : <FaChessPawn/> || item.isAdmin == false  && item.superAdmin == false ? <FaChessPawn/> : <FaChessKnight/>}</td>
    </tr>
    </tbody>
  })
  const userInfo = async(item)=>{
    setDetails(true)
    setdItem(item)
     await axios.get(`http://localhost:3001/api/v1/order/${item.id}`).then((feedback)=>{
       console.log(feedback.data);
       setUserOrder(feedback.data)
     }).catch((err)=>{
        console.log(err);
     })
  
  }
 const makeAdmin = async()=>{
  let accept = window.confirm("Are you sure about this?")
  if(accept == true){
    await axios.patch(`http://localhost:3001/api/v1/makeAdmin/${dItem.id}`, {},{
      headers: {
        "usertoken": cookie
      }
    }).then((feedback)=>{
      // console.log(feedback);
      window.location.reload()
    }).catch((err)=>{
      console.log(err);
    })
  }
 }
 const removeAdmin = async()=>{
  let accept = window.confirm("Are you sure about this?")
  if(accept == true){
    await axios.patch(`http://localhost:3001/api/v1/removeAdmin/${dItem.id}`, {},{
    headers: {
      "usertoken": cookie
    }
    }).then((feedback)=>{
      // console.log(feedback);
      window.location.reload()
      
    }).catch((err)=>{
      console.log(err);
    })
  }
 }
 const delUser = async()=>{
  let accept = window.confirm("Are you sure about this?")
  if(accept == true){
    await axios.delete(`http://localhost:3001/api/v1/deleteUser/${dItem.id}`,{
      headers:{
        "usertoken": cookie
      }
    }).then((feedback)=>{
      // console.log(feedback);
      window.location.reload()
      
    }).catch((err)=>{
      console.log(err);
    })
  }
 }
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
      {details && 
        <div className='detail-box '>
            <div className='prod-detailbox' style={{height:"100vh",left:"20vw", width:"60vw"}}>
            <button type="button" class="close det-close" onClick={()=> setDetails(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
              <div>
                  <h4>user details</h4>
                  <hr/>
                  <div className='d-each-box'>
                      <div>
                          <strong>firstname :</strong> {dItem.firstName}
                      </div>
                      <div>
                          <strong>lastname :</strong> <span>{dItem.lastName}</span>
                      </div>
                      <div>
                          <strong>email :</strong> <span> {dItem.email}</span>
                      </div>
                      <div>
                          <strong>phone :</strong> <span>{dItem.tel}</span>
                      </div>
                      <div>
                          <strong>address :</strong> <span>{dItem.address}</span>
                      </div>
                      <div>
                          <strong>state :</strong> <span>{dItem.state}</span>
                      </div>
                      <div>
                          <strong>Role :</strong> <span>{dItem.isAdmin == true && dItem.superAdmin == false ? "Admin" : "User" && dItem.superAdmin == true && dItem.isAdmin == false ? "Super-Admin" : "User" || dItem.isAdmin == false  && dItem.superAdmin == false ? "User" : "Admin"}</span>
                      </div>
                      <div>
                        {
                          decoder.superAdmin == true && <>
                          {dItem.isAdmin == false ? <button className='btn btn-outline-success' style={{position:'absolute',top:"100px", right:"35px"}} onClick={()=> makeAdmin()}>make admin</button> : <button className='btn btn-outline-success mt-5' style={{position:'absolute',top:"50px", right:"35px"}} onClick={()=> removeAdmin()}>remove admin</button>}
                          </>
                        }
                      </div>

                  </div>
                  <h6 className="pt-3">user Stats </h6>
                  <div className='d-each-box'>
                      <div> 
                        <ul type="none">
                          <li>
                            <span className='pe-1'><b>Total amount spent :</b></span>
                             <span>
                             &#8358; 
                              {
                                userOrder.reduce((acc,item)=>{
                                  return acc+=item.amount
                                },0)
                              }
                             </span>
                            </li>
                            <li>
                            <span className='pe-1 pt-3'><b>No. of orders:</b></span>
                             <span>
                              {
                                userOrder.length
                              }
                             </span>
                          </li>
                        </ul>
                      </div>
                  </div>
                  <h6 className="pt-3">order history </h6>
                  <div className='d-each-box'>
                      <details>
                        <summary>history</summary>
                        <table class="table text-center table-borderless">
                        <thead class="thead-primary">
                        <tr className="text-black bg-secondary">
                        <th>s/n</th>
                        <th>OrderId</th>
                        <th>amount</th>
                        <th>payment</th>
                        <th>date</th>
                        </tr>
                        </thead>
                          <tbody>
                          {
                            userOrder.map((item,index)=>{
                           
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.refId}</td>
                                  <td> &#8358;{item.amount}</td>
                                  <td>{item.payment}</td>
                                  <td>{item.createdAt.slice(0,10)}</td>
                                </tr>
                              )
                            })
                          }
                          </tbody>
                         
                        </table>
                      </details>
                      
                  </div>
                 <div>
                 {decoder.superAdmin == true && <button className='btn btn-danger mt-4' onClick={()=> delUser()}>delete user</button>}
                 </div>
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
            <div class="row">
              <div class="col-md-12">
              <div class="table-wrap">
              <table class="table text-center table-borderless">
              <thead class="thead-primary">
              <tr className="text-black bg-secondary">
              <th>#</th>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>State</th>
              <th>Country</th>
              <th></th>
              <th></th>
              <th></th>
              </tr>
              </thead>
              {myUsers}
              </table>
              </div>
              </div>
              </div>
        </div>
        {/* <div className='text-center'><button className='btn btn-warning'>see all</button></div> */}
      </section>
    </div>
  )
}

export default AdminUser