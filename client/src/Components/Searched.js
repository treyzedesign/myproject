import React from 'react'
import "./Home/Home/Home.css"
const Searched = ({searchRe, viewProd, handleClick}) => {
    const search = searchRe.map((item, index)=>{
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
  return (
    <div>
        <div class="container-fluid d-flex flex-wrap mt-50 mb-50 ">    
            {search}
        </div>
    </div>
  )
}

export default Searched