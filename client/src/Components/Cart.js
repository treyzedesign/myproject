import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import "./Comp.css"
const Cart = ({cart, handleChange, clearCart, price, deleteCartItem}) => {
  
const navigate = useNavigate()
  // handlePrice()

const ship_page =()=>{
  if(cart == null){
    navigate('/cart')
  }else{
    navigate('/shipping_page')

  }
}
  const placeCart = cart.map((item, index)=>{
    return <tbody >
    <tr key={index}>
        <td>
            <div class="product-item">
                <img className='Cart-image' src={item.poster} alt="Product"/>
                <div class="product-info">
                    <h6 class="product-title">{item.title}</h6>
                </div>
            </div>
        </td>
        <td class="text-center ">
            <div class="count-input ">
              <span className='btn' onClick={() => handleChange(item, -1)}><FaMinus/></span>
              <span className='btn'>{item.amount}</span>
            <span className='btn' onClick={() => handleChange(item, 1)}><FaPlus/></span>
            </div>
        </td>
        <td class="text-center text-lg text-medium">&#8358;{item.price}</td>
        <td class="text-center"><FaTrash onClick={()=> deleteCartItem(item)}/></td>
    </tr>
    </tbody>
  })

 
 
  
  return (
    <div className='cart'>
        <div class="container-fluid padding-bottom-3x mb-1">
          <div className='col-sm-12'>
            <div className='row'>
               <div className='col-sm-9'>
               <div class="table-responsive shopping-cart">
                  <table class="table">
                  <thead className='bg-gray'>
                  <tr>
                      <th>Product Name</th>
                      <th class="text-center">Quantity</th>
                      <th class="text-center">price</th>
                      <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#" onClick={()=> clearCart()}>Clear Cart</a></th>
                  </tr>
                  </thead>
                   {placeCart}
                  </table>
                </div>
                </div>
                <div className='col-sm-3 mt-2 shadow-lg sub-total'>
                <div>
                  <div>
                    <h4>
                      Cart summary
                    </h4>
                    <hr/>
                  </div>
                   <h5>
                   <span>Subtotal:</span> 
                   <span> &#8358;{price}</span>
                   </h5>
                   <hr/>
                   <button className='btn btn-warning mt-3 w-100' onClick={()=>ship_page()}> Checkout (&#8358;{price})</button>
                </div> 
                </div>
            </div>
          </div>    
        </div>
    </div>   
  )
}

export default Cart