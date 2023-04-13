import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef} from 'react'
import "../admin.css"
import { FaBoxOpen, FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import Cookies from 'js-cookie'

export const AdminOrder = ({del_order, del_all_order}) => {
  const [orders, setorders] = useState([]);
  const [filter, setfilter] = useState("ref")
  // const [search, setsearch] = useState("")
  const [details, setDetails]= useState(false)
  const [dItem, setdItem] = useState([])
  const [Page, setPage] = useState(1);
  const cookie = Cookies.get("UserLoginToken")

  const order_url = `http://localhost:3001/api/v1/order?date=desc&search=${filter}`
  const fetchOrders = async(order_url)=>{
     await axios.get(order_url).then((feedback)=>{
      // console.log(feedback.data)
      let data = feedback.data
      setorders(feedback.data)

     }).catch((err)=>{
        console.log(err)
     })
  }
  const status_update = async ()=>{
    await axios.patch('http://localhost:3001/api/v1/order/status').then((feedback)=>{
      console.log(feedback);
    }).catch((err)=>{
      console.log(err);
    })
  }
   const orderInfo = (item, index)=>{
        setDetails(true)
        setdItem(item)
    }

  useEffect(() => {
    fetchOrders(order_url)
    status_update()
  }, [filter]);
  const life = String(filter)
  const myOrders = orders.map((item, index)=>{
    return <tbody>
       <tr className='t-row' key={index}>
    <td>{index + 1}</td>
    <td>{item.refId}</td>
    <td>{item.email}</td>
    <td>&#8358;{item.amount}</td>
    <td>{item.product.length}</td>
    <td>{item.payment}</td>
    <td>{item.createdAt.slice(0,10)}</td>
    <td><FaEye className='order_btn' onClick={()=> orderInfo(item)}/></td>
    <td><FaTrash className='order_btn' onClick={()=> del_order(item)}/></td>
    </tr>
    </tbody>
   
  }).slice(Page * 20 - 20, Page * 20)
  // console.log(Page);
  const selectPageHandler = (selectedPage)=>{
    if (selectedPage >= 1 && selectedPage <= orders.length / 20 || selectedPage >= orders.length / 20  && selectedPage !== Page && Math.ceil(orders.length/20) >  Page) {
      setPage(selectedPage)
    }
  }
  return (
    <div>
       {details && 
        <div className='detail-box'>
            <div className='prod-detailbox'>
            <button type="button" class="close det-close" onClick={()=> setDetails(false)}>
              <span aria-hidden="true">&times;</span>
              </button>
                <div>
                    <h4>Order details</h4>
                    <hr/>
                    <div className='d-each-box'>
                        <div>
                            <strong>Order No :</strong> <span>{dItem.refId}</span>
                        </div>
                        <div>
                            <strong>placed on :</strong> <span>{dItem.createdAt.slice(0, 10)}</span>
                        </div>
                        <div>
                            <strong>total fee :</strong> <span> &#8358; {dItem.amount}</span>
                        </div>
                        <div>
                            <strong>Payment method :</strong> <span> {dItem.payment}</span>
                        </div>
                    </div>
                    <hr/>
                    <h4>Address details</h4>
                    <div className='d-each-box'>
                        <ul type="none">
                            <li><strong>Fullname : </strong> {dItem.firstname} {dItem.lastname}</li>
                            <li><strong>Address : </strong> {dItem.address}, {dItem.state}, Nigeria.</li>
                            <li><strong>Region : </strong>  {dItem.state}, Nigeria.</li>
                        </ul>
                    </div>
                    <hr/>
                    <h4>Product details</h4>
                    <div className='d-each-box'>
                        {dItem.product.map((item, index)=>{
                            return <ul type="none" key={index}>
                                <li>
                                     <div className='d-flex'>
                                        {/* <div><img src={pro} alt="" /></div> */}
                                        <div>
                                            <div><strong>Product Id : </strong>{item.productId} </div>
                                            <h6>Product Name : {item.productName}</h6>
                                            <h6>Quantity : {item.quantity}</h6>
                                        </div>
                                     </div>
                                </li>
                                <hr/>
                            </ul>
                        })}
                    </div>
                </div>
            </div>
        </div>}
       <section class="ftco-section product mb-3">
        <div class="container table-cont">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section bg-secondary mt-5">Orders Table</h2>
            </div>
          </div>
          <div className='mb-5'> 
            <div className='col-12'>
              <div className='row'>
                <div className='col-9'>
                <h5>filter</h5>
                 <input placeholder='by order_Id , email, payment type' className='form-control shadow-lg' onChange={(e)=>{setfilter(e.target.value)}}/> 
                </div>
                <div className='col-3 text-right mt-1'>
                <button className='btn btn-danger mt-4' onClick={()=> del_all_order()}> delete table</button>
                </div>
              </div>
            </div>    
          </div>
           
          <div class="table-wrap">
          <table class="table text-center table-borderless">
          <thead class="thead-primary">
          <tr className="text-black bg-secondary">
          <th>s/n</th>
          <th>OrderId</th>
          <th>Email</th>
          <th>Amount</th>
          <th>Product No</th>
          <th>Payment</th>
          <th>Date</th>
          <th></th>
          <th></th>
          </tr>
          </thead>
           {orders.length > 0 ? <>{myOrders}</> : 
            <div> No orders made yet</div>
            }
           </table>
          </div>

           <div>
              {orders.length > 0 && <nav aria-label="Page navigation example mb-3">
                      <ul class="pagination justify-content-center my-3 mb">
                        <li class="page-item">
                          <span class="page-link" onClick={()=> selectPageHandler(Page - 1)}>⏪</span>
                        </li>
                        {
                          [...Array(Math.ceil(orders.length/20))].map((_, i)=>{
                                return <li className='page-item'><a key={i} className='page-link' onClick={()=> selectPageHandler(i + 1)}>{i + 1}</a></li>
                                // return i
                          })
                        }
                        <li class="page-item">
                          <span class="page-link" onClick={()=> selectPageHandler(Page + 1)}>⏩</span>
                        </li>
                      </ul>
                  </nav>
                }
           </div>
        </div>
        {/* <div className='text-center'><button className='btn btn-warning'>see all</button></div> */}
      </section>
    </div>
  )
}
