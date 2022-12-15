import React from 'react'
import { useState, useEffect } from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import "./Comp.css"
const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [price, setprice] = useState();
  const fetchCart = ()=>{
    const cartItem = JSON.parse(localStorage.getItem("cart"))
    if(cartItem){
     setCart(cartItem)
     console.log(Cart);
    }
  }
  const handleChange = (item, d) => {
    const ind = Cart.indexOf(item);
    const arr = Cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
    handlePrice()
  };
  let ans = 0
  const handlePrice = () => {
    Cart.map((item) => {ans += item.amount * item.price});
    setprice(ans);
  };
  // handlePrice()
  useEffect(()=>{
    fetchCart();
    handlePrice();
 },[])
  const placeCart = Cart.map((item, index)=>{
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
        <td class="text-center text-lg text-medium">{item.price}</td>
        <td class="text-center"><FaTrash onClick={()=> deleteItem(item)}/></td>
    </tr>
    </tbody>
  })

  const deleteItem = (item)=>{
    const cartid = item.id
    let cartCopy = JSON.parse(localStorage.getItem('cart'))
  
    cartCopy = cartCopy.filter(item => item.id != cartid);
    //update state and local
    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem('cart', cartString)
    // window.location.reload()
    handlePrice()
  }

 
  
  return (
    <div className='cart'>
        <div class="container-fluid padding-bottom-3x mb-1">    
          <div class="table-responsive shopping-cart">
            <table class="table">
              <thead>
                  <tr>
                      <th>Product Name</th>
                      <th class="text-center">Quantity</th>
                      <th class="text-center">price</th>
                      <th class="text-center"><a class="btn btn-sm btn-outline-danger" href="#">Clear Cart</a></th>
                  </tr>
              </thead>
                   {placeCart}
                <div>
                   <h3>
                   <span>SubTotal:</span> &#8358;{price}
                   </h3>
                </div> 

                    
                  
            </table>
          </div>
        </div>
    </div>   
  )
}

export default Cart