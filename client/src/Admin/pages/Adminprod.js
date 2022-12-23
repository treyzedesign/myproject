import React from 'react'
import "../admin.css"
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const Adminprod = ({del_prod}) => {
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [spec, setSpec] = useState()
  const [brand, setBrand] = useState()
  const [price, setPrice] = useState()
  const [category, setCat] = useState()
  const [season, setSeason] = useState()
  const [poster, setPoster] = useState()
  const [prod, setProd] = useState([]);
 
  
  const product_url = `http://localhost:3001/api/v1/products`
  const fetchProducts = async (product_url)=>{
    const prod = await axios.get(product_url).then((feedback)=>{
      console.log(feedback.data);
     setProd(feedback.data)
    }).catch((issue)=>{
      console.log(issue);
    })
  }
  useEffect(()=>{
    fetchProducts(product_url);
  }, [])

  const products = prod.map((item, index)=>{
     return <div class="row">
     <div class="col-md-12">
     <div class="table-wrap">
     <table class="table text-center">
     <thead class="thead-primary">
     <tr key={index} className="text-black bg-secondary">
     <th>#</th>
     <th>Id</th>
     <th>title</th>
     <th>Brand</th>
     <th>price</th>
     <th>category</th>
     <th></th>
     </tr>
     </thead>
     <tbody>
     <tr>
     <td>{index + 1}</td>
     <td>{item.id}</td>
     <td>{item.title}</td>
     <td>{item.brand}</td>
     <td>{item.price}</td>
     <td>{item.category}</td>
     <td><button className='btn btn-primary' onClick={()=>del_prod(item)}>Delete</button></td>
     </tr>
     </tbody>
     </table>
     </div>
     </div>
     </div>
  })
  
  const postprod = (e)=>{
    e.preventDefault()
      const token = Cookies.get('AccessToken')
      const form = new FormData();

      form.append('title', title)
      form.append('description', desc)
      form.append('spec', spec)
      form.append('brand', brand)
      form.append('price', price)
      form.append('category', category)
      form.append('season', season)
      form.append('image', poster)

      axios.post(`http://localhost:3001/api/v1/products`, form, {
        headers: {
          "token" : token
        }
      }).then((feedback)=>{
        console.log(feedback)
      }).catch((fault)=>{
        console.log(fault);
      })
  }
 
  return (
    <div className='product m-auto'>
      <div className='prod-box m-auto'>
        <form method='post' onSubmit={postprod} encType='multipart/form-data'>
          <h1 className='p-h1'>POST PRODUCTS</h1>
          <div className='form-group'>
            <label>title</label><br/>
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} className='form-control' />
          </div>
          <div className='form-group'>
            <label>description</label><br/>
            <textarea cols="60" onChange={(e)=>{setDesc(e.target.value)}} value={desc} rows="5"></textarea>
          </div>
          <div className='form-group'>
            <label>spec</label><br/>
            <textarea cols="60" onChange={(e)=>{setSpec(e.target.value)}} value={spec} rows="5"></textarea>
          </div>
          <div className='d-flex'>
          <div className='form-group'>
            <label>brand</label><br/>
            <input type="text" onChange={(e)=>{setBrand(e.target.value)}} value={brand} className='form-control' />
          </div>
          <div className='form-group ml-5'>
            <label>price</label><br/>
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} className='form-control' />
          </div>
          </div>
          <div >
          <div className='form-group'>
            <label>category</label><br/>
            <select onChange={(e)=>{setCat(e.target.value)}} value={category} className='browser-default custom-select px-2'>
              <option disabled selected></option>
              <option > phones&tablet</option>
              <option > computer</option>
              <option > Home</option>
              <option > male-fashion</option>
              <option > female-fashion</option>
            </select>
          </div>
          <div className='form-group'>
            <label>season</label><br/>
            <select onChange={(e)=>{setSeason(e.target.value)}} value={season} className='browser-default custom-select '>
              <option disabled selected></option>
              <option > Topdeals</option>
              <option > Bonanza</option>
              <option > Editor</option>
            </select>
          </div>
          </div> 
          <div className='form-group'>
            <label>image file</label><br/>
            <input type="file"  onChange={(e) => {
              const file = e.target.files[0]
              setPoster(file) 
            }} className='form-control' />
          </div>
           {/* <div className='form-group ml-5'>
            <label>image</label><br/>
            <input type="text" ref={imageRef} className='form-control' />
          </div> */}
          <div>
            <button type='submit'  className="btn btn-warning"> post product</button>
          </div>
        </form>
      </div>
      <section class="ftco-section">
        <div class="container table-cont">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              <h2 class="heading-section bg-secondary">Product Table</h2>
            </div>
          </div>
          {products}
        </div>
      </section>
    </div>
  )
}

export default Adminprod