import React from 'react'
import banImage from "./images/karolina.jpg";
import easyPay from "./images/easypay.jpg";
import instant from "./images/instant.jpg";
import market from "./images/market.jpg"
import caro1 from "./images/caro1.jpg"
import caro2 from "./images/caro2.jpg"
import caro3 from "./images/caro3.jpg"
import { Link , useNavigate} from 'react-router-dom';

import "./Home.css"
const HomeBan = ({handleClick, topDeals, editor, loader, alert, rem_modal, rem_prodModal, viewProd, item, prodBox}) => {
  const navigate = useNavigate()
//  console.log(topDeals)
  const deals = topDeals.map((item, index)=>{
    return <div class=" mt-2 mb-5" key={index}>
                 <div class="card carder">
                        <div class="card-body " onClick={()=> viewProd(item)}>
                            <div class="card-img-actions img-box">
                                <img src={item.poster} class="card-img" 
                                 alt="product image"/>
                            </div>
                        </div>
                        <div class="card-body  bg-light " height="100">
                            <div class="card-title">
                                <h6 class="font-weight-semibold ">{item.title}</h6>
                            </div>
                            <span class=" font-weight-bold text-right">&#8358;{item.price}</span>
                            <div class="text-muted mb-3">brand: {item.brand}</div>
                            <button type="button" class="btn btn-outline-primary bg-cart" onClick={()=>handleClick(item)}> Add to cart</button>
                        </div>
                    </div>               
                </div> 

  })
  const choice = editor.map((item, index)=>{
    return <div class=" mt-2 mb-5" key={index}>
                 <div class="card carder">
                        <div class="card-body">
                            <div class="card-img-actions img-box">
                                <img src={item.poster} class="card-img" width="96" height="250" alt="product image"/>
                            </div>
                        </div>
                        <div class="card-body  bg-light " height="200">
                            <div class="card-title">
                                <h6 class="font-weight-semibold ">{item.title}</h6>
                            </div>
                            <span class="text-muted mr-5" data-abc="true">{item.category}</span>
                            <span class=" font-weight-bold">&#8358;{item.price}</span>
                            <div class="text-muted mb-3">{item.brand}</div>
                            <button type="button" class="btn btn-outline-primary bg-cart" onClick={()=>handleClick(item)}> Add to cart</button>
                        </div>
                    </div>               
                </div> 

  })
  return (
    <div>
     {loader && 
     <div className='load'>
        <div className='loader'></div>
     </div>
     }
     {alert &&
     <div class="alert alert-warning alert-dismissible Alert-box fade show" role="alert">
     <strong>Product has been added to Cart succesfully </strong> 
     <button type="button" class="close" onClick={()=>rem_modal()}>
       <span aria-hidden="true">&times;</span>
     </button>
    </div>
     }
     {prodBox && 
       <div >
        <div className='prodModal'>
      <div className='prodbox shadow-lg' >
        <div className='col-sm-12' >
          <div className='row' >
            <div className='col-sm-8'>
            <img src={item.poster}  alt="" />
            </div>
            <div className='col-sm-4 text-left '>
            <div className='prodInfo'>
            <h3>{item.title}</h3>
            <div className='text-muted pt-1'>{item.brand}</div>
            <div className='text-muted pt-1'>{item.category}</div>
            <hr/>
            <div className='text-muted pt-1'>Product Code: {item.id}</div>
            <div>
              <label className='font-weight-bolder'>Price:</label><h2>&#8358;{item.price}</h2>
              <button type="button" class="btn btn-outline-primary bg-cart" onClick={()=>handleClick(item)}> Add to cart</button>
              <button type="button" class="close modal-close" onClick={()=>rem_prodModal()}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
           </div>
            </div>
          </div>
          
        </div>
        <div className='pt-5'>
          <div><strong>{item.description}</strong></div>
        </div>
        <div className='pt-5'>
          <h5>Specifications</h5>
          <div>{item.spec}</div>
        </div>
        <div>

        </div>
      </div>
     </div>
      </div>
     }
    <div className='mx-5 banner mt-5 d-flex'>
        <div className ="banner-text p-5">
            <h1>GET your products today on fleeks</h1>
            <p className='pt-3 pl-3 font-weight-bolder'>Register today to get the best affordable prices</p>
            <div>
                <button className='mt-5 ml-5 font-weight-bolder' onClick={()=> navigate('/login')}>Get Started</button>
            </div>
        </div>
        <div className='ban-img pl-5 ml-5'>
            <img className='banimage' src={banImage}/>
        </div>
    </div>
    <div className='container-lg mt-3'>
    <div className='col-sm-12'>
            <div className='row'>
                <div className='col-sm-3'>
                    <div className='p-3'>
                        <h2 className='font-weight-bolder'>why choose us</h2>
                        <div className='font-weight-bolder'>we put quality measures in place in order to provide you with quality goods and services</div>
                    </div>
                </div>
                <div className='col-sm-3'>
                    <div className='text-center mt-3'>
                        <img className="easypay" src={easyPay} />
                        <div className='font-weight-bolder p-3'>easy payment and safe delivered</div>
                    </div>
                </div>
                <div className='col-sm-3'>
                <div className='text-center mt-3'>
                        <img className="easypay" src={instant} />
                        <div className='font-weight-bolder p-3'> quick and safe deliveries</div>
                    </div>
                </div>
                <div className='col-sm-3'>
                    <div className='text-center mt-3'>
                        <img className="easypay" src={market} />
                        <div className='font-weight-bolder p-3'>A place for buyers and sellers</div>
                    </div>
                </div>

            </div>
    </div>
    </div>
        <h3 className='sub-title p-2'>Top deals</h3>
        <div class="container-fluid d-flex flex-wrap mt-50 mb-50 ">    
                {deals}
        </div>
        <h3 className='sub-title p-2'>Editor's choice</h3>
        <div class="container-fluid d-flex justify-content-center mt-50 mb-50 ">     
            <div class="row">
               {choice}
            </div>
        </div>
        <div className='sell-on p-3 text-center shadow-sm' id='sell'>
            <Link className='text-light text-decoration-none' to=''><h1>SIGNUP ON FLEEKS</h1></Link>
        </div>
        <div id="carouselExampleCaptions" className="carousel slide mt-2"  data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner caro">
    <div className="carousel-item active bg-dark ">
      <img src={caro1} className="d-block w-100 caro-img" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item bg-dark">
      <img src={caro2} className="d-block w-100 caro-img" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item bg-dark">
      <img src={caro3} className="d-block w-100 caro-img" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </button>
</div>
    </div>
  )
}

export default HomeBan