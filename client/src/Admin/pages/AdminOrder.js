import React from 'react'
import axios from 'axios';
import { useState, useEffect, useRef} from 'react'
import "../admin.css"
import { FaBoxOpen, FaTrash } from 'react-icons/fa';
export const AdminOrder = ({del_order, del_all_order}) => {
  const [orders, setorders] = useState([]);
  const [filter, setfilter] = useState("ref")
  const [details, setDetails]= useState(false)
  const [dItem, setdItem] = useState([])

  const order_url = `http://localhost:3001/api/v1/order/`
  const fetchOrders = async(order_url)=>{
     await axios.get(order_url).then((feedback)=>{
      console.log(feedback.data)
      let data = feedback.data
      setorders(feedback.data)

     })
  }
  const status_update = async ()=>{
    await axios.patch('http://localhost:3001/api/v1/order/status').then((feedback)=>{
      console.log(feedback);
    })
  }
   const orderInfo = (item, index)=>{
        setDetails(true)
        setdItem(item)
    }
  useEffect(() => {
    fetchOrders(order_url)
    status_update()
  }, []);
  const life = String(filter)
  const myOrders = orders.filter(item => item.refId.includes(life) ||
                  item.email.trim().includes(life) || 
                  item.payment.trim().includes(life)).map((item, index)=>{
    return <div class="row">
    <div class="col-md-12">
    <div class="table-wrap">
    <table class="table text-center">
    <thead class="thead-primary">
    <tr key={index} className="text-black bg-secondary">
    <th>#</th>
    <th>OrderId</th>
    <th>Email</th>
    <th>Amount</th>
    <th>Product No</th>
    <th>payment</th>
     <th></th>
     <th></th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>{index + 1}</td>
    <td>{item.refId}</td>
    <td>{item.email}</td>
    <td>&#8358;{item.amount}</td>
    <td>{item.product.length}</td>
    <td>{item.payment}</td>
    <td><FaBoxOpen className='order_btn' onClick={()=> orderInfo(item)}/></td>
    <td><FaTrash className='order_btn' onClick={()=> del_order(item)}/></td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    </div>
  })
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
       <section class="ftco-section product">
        <div class="container table-cont">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section bg-secondary mt-5">Users Table</h2>
            </div>
          </div>
          <div className='mb-5'> 
            <div className='col-12'>
              <div className='row'>
                <div className='col-9'>
                <h5>filter</h5>
                 <input placeholder='by order_Id , email, payment type' className='form-control' onChange={(e)=>{setfilter(e.target.value)}}/> 
                </div>
                <div className='col-3 text-right mt-1'>
                <button className='btn btn-danger mt-4' onClick={()=> del_all_order()}> delete table</button>
                </div>
              </div>
            </div>    
          </div>
           {myOrders}
        </div>
        {/* <div className='text-center'><button className='btn btn-warning'>see all</button></div> */}
      </section>
    </div>
  )
}
