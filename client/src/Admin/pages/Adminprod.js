import React from 'react'
import "../admin.css"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaBoxOpen, FaTrash } from 'react-icons/fa';

const Adminprod = ({del_prod}) => {
  
  const [prod, setProd] = useState([]);
  const [filter, setfilter] = useState("")
  const [details, setDetails]= useState(false)
  const [dItem, setdItem] = useState([])
  const [Page, setPage] = useState(1);
  
  
  const product_url = `http://localhost:3001/api/v1/products`
  const fetchProducts = async (product_url)=>{
      await axios.get(product_url).then((feedback)=>{
      // console.log(feedback.data);
     setProd(feedback.data)
    }).catch((issue)=>{
      console.log(issue);
    })
  }
  useEffect(()=>{
    fetchProducts(product_url);
  }, [prod])
  
  const productInfo = (item)=>{
    setDetails(true)
    
    setdItem(item)
  
  }
  const life = String(filter)

  const products = prod.filter(item => item.id.includes(life) ||
                                       item.title.includes(life) ||
                                       item.brand.includes(life) ||
                                       item.category.trim().includes(life)
  ).map((item, index)=>{
     return  <tbody>
     <tr className='t-row' key={index}>
     <td>{index + 1}</td>
     <td>{item.id}</td>
     <td>{item.title}</td>
     <td>{item.brand}</td>
     <td>{item.price}</td>
     <td>{item.category}</td>
     <td><FaBoxOpen className='order_btn' onClick={()=> productInfo(item)}/></td>
     <td><FaTrash className='order_btn' onClick={()=>del_prod(item)} /></td>
     </tr>
     </tbody>
  }).slice(Page * 10 - 10, Page * 10)
  // onClick={()=> productInfo(item)}
  // onClick={()=> del_order(item)}
  const selectPageHandler = (selectedPage)=>{
    if (selectedPage >= 1 && selectedPage <= products.length / 10 || selectedPage >= products.length / 10  && selectedPage !== Page && Math.ceil(products.length/10) >  Page) {
      setPage(selectedPage)
    }
  }
  return (
    <div className='product m-auto'>
       {details && 
        <div className='detail-box '>
            <div className='prod-detailbox' style={{height:"100vh",left:"20vw", width:"60vw"}}>
            <button type="button" class="close det-close" onClick={()=> setDetails(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
              <div>
                  <h4>product details</h4>
                  <hr/>
                  <div className='d-each-box'>
                      <div>
                          <strong>title :</strong> {dItem.title}
                      </div>
                      <div>
                          <strong>brand :</strong> <span>{dItem.brand}</span>
                      </div>
                      <div>
                          <strong>price :</strong> <span> &#8358; {dItem.price}</span>
                      </div>
                      <div>
                          <strong>category :</strong> <span>{dItem.category}</span>
                      </div>
                  </div>
                  <h6 className="pt-3">Description </h6>
                  <div className='d-each-box'>
                      <div>{dItem.description}</div>
                  </div>
                  <h6 className="pt-3">Specifications </h6>
                  <div className='d-each-box'>
                      <div>{dItem.spec}</div>
                  </div>
              </div>
            </div>
          </div>
        }
        <section class="ftco-section product">
        <div class="container table-cont">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section bg-secondary mt-5">Products Table</h2>
            </div>
          </div>
          <div className='mb-5'> 
            <div className='col-12'>
              <div className='row'>
                <div className='col-9'>
                <h5>filter</h5>
                 <input placeholder='by product_Id , title, brand, category' className='form-control shadow-lg' onChange={(e)=>{setfilter(e.target.value)}}/> 
                </div>
                <div className='col-3 text-right mt-1'>
                <button className='btn btn-danger mt-4'>delete table</button>
                </div>
              </div>
            </div>    
          </div>
          <div class="row">
          <div class="col-md-12 shadow-lg pt-4 rounded-lg">
          <div class="table-wrap">
          <table class="table text-center table-borderless">
          <thead class="thead-primary">
          <tr className="text-black bg-secondary">
          <th>#</th>
          <th>Id</th>
          <th>title</th>
          <th>Brand</th>
          <th>price</th>
          <th>category</th>
          <th></th>
          <th></th>
          </tr>
          </thead>
           {products}
           </table>
          </div>
          </div>
          </div>
        </div>
        <div>
              {products.length > 0 && <nav aria-label="Page navigation example mb-3">
                      <ul class="pagination justify-content-center my-3 mb">
                        <li class="page-item">
                          <span class="page-link" onClick={()=> selectPageHandler(Page - 1)}>⏪</span>
                        </li>
                        {
                          [...Array(Math.ceil(products.length/10))].map((_, i)=>{
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
      </section>
    </div>
  )
}

export default Adminprod