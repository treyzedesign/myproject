import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState, useRef , useEffect} from 'react'
import { handlePayment } from './PayStackInterface'
import payment_options from "./image/payment_options.webp"
import "./Comp.css"
import Cookies from 'js-cookie'

const Checkout = ({cart, price}) => {
  const [editAddress, seteditAddress] = useState(false);
  const [update, setupdate] = useState();
  let checkStore = JSON.parse(localStorage.getItem("userAddress"))
  console.log(checkStore.country);
  // const Cookie = Cookies.get("UserLoginToken")
  const firstref = useRef(null)
  const lastref = useRef(null)
  const emailref = useRef(null)
  const telref = useRef(null)
  const addressref = useRef(null)
  const stateref = useRef(null)
  // const countryref = useRef(null)

  
  

  const editinfo = ()=>{
    // if(firstname.length > 0 && lastName.length > 0 && email.length > 0 && address.length > 0 && state.length > 0 
    //    &&  tel.length > 0 ){
        const firstname = firstref.current.value 
        const lastName = lastref.current.value
        const email = emailref.current.value
        const tel = telref.current.value
        const address = addressref.current.value
        const state = stateref.current.value
    let userUpdate = {
      firstname: firstname,
      lastName : lastName,
      email : email,
      tel : tel,
      address : address,
      state : state
    }
    localStorage.setItem("userAddress", JSON.stringify(userUpdate))
    setupdate(userUpdate)
      seteditAddress(false)
  // }
  }
  const payOnline = ()=>{
    handlePayment(checkStore.email, price)
  }
  const navigate = useNavigate()
  const ship = 521
  const est = price + ship
  const cartItem = cart.map((item, index)=>{
    return <div  key={index}>
        <div className='check_prod'>
          <div className="col-sm-12">
            <div className='row'>
              <div className='col-sm-6'><img src={item.poster} alt="" className='check_prod-img'/></div>
              <div className='col-sm-6'>
                <h6 className='text-muted'>{item.title}</h6>
                <div className='text-muted'>Quantity: {item.amount}pcs</div>
                <div className='text-muted'>Prices: &#8358; {item.price}</div>
              </div>
            </div>
          </div>
          
        </div>
        <hr/>
    </div>
  })
  return (
    <div className='checkout'>
      {editAddress && 
        <div className='editAdd-box'>
            <div className='addbox shadow-lg'>
              <h3>Edit Shipping Address</h3><hr/>
              <button type="button" class="close modal-close" onClick={()=> seteditAddress(false)}>
              <span aria-hidden="true">&times;</span>
              </button>
                <div className='d-flex justify-content-around'>
                  <div className='input-sect form-group'>
                    <label>FirstName</label><br/>
                    <input type="text" className='form-control' ref={firstref}/>
                  </div>
                  <div className='input-sect form-group'>
                    <label>LastName</label><br/>
                    <input type="text" className='form-control' ref={lastref}/>
                  </div>
                </div>
                <div className='d-flex justify-content-around'>
                  <div className='input-sect  form-group'>
                    <label>Email</label><br/>
                    <input type="email" className='form-control' ref={emailref}/>
                  </div>
                  <div className='input-sect form-group'>
                    <label>Phone No.</label><br/>
                    <input type="number" className='form-control' ref={telref} />
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className='row'>
                  <div className='col-sm-8'>
                    <div className='input-sect form-group'>
                    <label>Full address</label><br/>
                    <input type="text" className='form-control' placeholder='No., street, city' ref={addressref}/>
                    </div>
                  </div>
                  <div className='col-sm-4'>
                  <div className='input-sect form-group'>
                    <label>State</label><br/>
                    <select className="browser-default custom-select" ref={stateref}>
                      <option disabled selected>Select State</option>
                      <option value="Abia">Abia</option>
                      <option value="Adamawa">Adamawa</option>
                      <option value="Akwa Ibom">Akwa Ibom</option>
                      <option value="Anambra">Anambra</option>
                      <option value="Bauchi">Bauchi</option>
                      <option value="Bayelsa">Bayelsa</option>
                      <option value="Benue">Benue</option>
                      <option value="Borno">Borno</option>
                      <option value="Cross Rive">Cross River</option>
                      <option value="Delta">Delta</option>
                      <option value="Ebonyi">Ebonyi</option>
                      <option value="Edo">Edo</option>
                      <option value="Ekiti">Ekiti</option>
                      <option value="Enugu">Enugu</option>
                      <option value="FCT">Federal Capital Territory</option>
                      <option value="Gombe">Gombe</option>
                      <option value="Imo">Imo</option>
                      <option value="Jigawa">Jigawa</option>
                      <option value="Kaduna">Kaduna</option>
                      <option value="Kano">Kano</option>
                      <option value="Katsina">Katsina</option>
                      <option value="Kebbi">Kebbi</option>
                      <option value="Kogi">Kogi</option>
                      <option value="Kwara">Kwara</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Nasarawa">Nasarawa</option>
                      <option value="Niger">Niger</option>
                      <option value="Ogun">Ogun</option>
                      <option value="Ondo">Ondo</option>
                      <option value="Osun">Osun</option>
                      <option value="Oyo">Oyo</option>
                      <option value="Plateau">Plateau</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Sokoto">Sokoto</option>
                      <option value="Taraba">Taraba</option>
                      <option value="Yobe">Yobe</option>
                      <option value="Zamfara">Zamfara</option>
                    </select>
                  </div>
                  </div>
                  </div>
                </div>
                <div className=''>
                  <button className='btn btn-warning w-25 ' onClick={()=> editinfo()}>Edit</button>
                </div>
                
            </div>

        </div>
      }
      <div className='container-xl'>
        <div className='col-lg-12'>
            <div className='row'>
                <div className='col-lg-8'>
                  <div className='bg-white payment'>
                   
                    <div>
                      <h4 className='pt-2 px-2'>1. Address</h4><hr/>
                      <div className='text-muted px-2 py-2'>
                        <div>
                          <h5>{checkStore.firstname} {checkStore.lastName}</h5>
                        </div>
                        <div>{checkStore.email}</div>
                        <div>+234 {checkStore.tel}</div>
                        <div>{checkStore.address}</div>
                        <div>{checkStore.state}, Nigeria.</div>
                        <div className='faedit'><FaEdit onClick={()=> seteditAddress(true)}/></div>
                      </div>
                      <hr/>
                      <div>
                        <h4 className='py-2 px-2'>2. Payment Methods</h4>
                      </div>
                      <div>
                        <div className=''>
                          <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-8">
                                <h5 ><u>Pay Now</u></h5>
                                  <div className='text-muted'><i>Pay instantly and securely on fleeks Store with your credit/debit card</i></div>
                                  <div className='mt-2'><img src={payment_options} alt="" /></div>
                                </div>
                                <div className="col-md-4 text-right">
                                  <button className='btn btn-outline-success' onClick={()=> payOnline()}>Pay Now</button>
                                </div> 
                              </div>
                            </div>
                        </div><hr/>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-8">
                            <h5 ><u>Pay On Delivery</u></h5>
                            <div className='text-muted'><i>Please note that you would have to make payment before opening your package. Once the seal is broken, the item can only be returned if it is damaged, defective or has missing parts.</i></div>
                            </div>
                            <div className="col-md-4 text-right pt-3">
                               <button className='btn btn-outline-success'>Pay on delivery</button>
                            </div> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4'>
                  <div className='bg-white shadow-lg mt-2 checkinfo'>
                    <div className='d-flex justify-content-around pt-3'>
                      <strong >Subtotal ({cart.length} items): </strong>
                      <div><strong>&#8358;{price}</strong> </div>
                    </div> 
                    <hr/>
                    <div className='d-flex pt-3 justify-content-around'>
                      <strong>Shipping fees : </strong>
                      <div><strong>&#8358;{ship}</strong> </div>
                    </div> 
                    <hr/>
                    <div className='d-flex py-3 justify-content-around'>
                      <strong>Estimated fees : </strong>
                      <div><strong>&#8358;{est}</strong> </div>
                    </div>
                    <hr/>
                    <div className='pl-1'>
                      <h4>Item details</h4>
                    </div>
                    <hr/>
                    <div className='c-pro'>
                    {cartItem}
                    </div>
                    <div className='text-center py-3'>
                      <button className='btn btn-warning w-75 mt-2 ' onClick={()=> navigate('/cart')}>Modify Cart</button>
                    </div>
                      
                  </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Checkout