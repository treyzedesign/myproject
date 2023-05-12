import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaBreadSlice } from 'react-icons/fa'
const MyOrder = ({id, Order}) => {
//   const [Order, setOrders] = useState([])
  const [details, setDetails]= useState(false)
  const [dItem, setdItem] = useState([])
//   const [index, setIndex] = useState()

   
    const orderInfo = (item, index)=>{

        setDetails(true)
        setdItem(item)
        // setIndex(index)
      
    }
   
    
    const myorders = Order.map((item, index)=>{
        // const orderdate = 
        return <div key={index}>
            <div className='col-sm-12 '>
                <hr/>
            <div className='row'>
                    <div className='col-sm-6'>
                        <div><h6>Order No. : {item.refId}</h6></div>
                    </div>
                    <div className='col-sm-6 text-right'><h6> on {item.createdAt.slice(0,10)}</h6></div>
                </div>
                <hr/>
                <div className='row'>
                    <div className="col-sm-5">
                        <div><strong>products :</strong> <span className='text-muted'>{item.product.length} items</span></div>
                        <div><strong>payment method :</strong> <span className='text-muted'>{item.payment} </span></div>
                    </div>
                    <div className='col-sm-4'>
                        <div><button className='btn btn-outline-primary' onClick={()=> orderInfo(item, index)}>see details</button></div>
                    </div>
                    <div className='col-sm-3 text-right'>
                        <div><strong>Status :</strong>  {item.status}</div>
                    </div>
                </div>
            </div>
               <hr/>
            </div>
    })
    

    
    const orderprod = Order.map((item, index)=>{
        // console.log(item.product[index].productId);
        return <div key={index}></div>
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
        {myorders}
        {Order.length == 0 && <>
            <div className='text-center' style={{marginTop:"20vh",}}>
                <h3>You have not placed any order</h3>
            </div>
        </>}
    </div>
  )
}

export default MyOrder