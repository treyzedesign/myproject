import React from 'react'
import "../admin.css"
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const AdminPost = () => {
  const [topping, setTopping] = useState('first')
  const [title, setTitle] = useState([])
  const [desc, setDesc] = useState([])
  const [spec, setSpec] = useState([])
  const [brand, setBrand] = useState([])
  const [price, setPrice] = useState([])
  const [category, setCat] = useState([])
  const [season, setSeason] = useState([])
  const [poster, setPoster] = useState([])
  const [cat, setcategory] = useState([])
  const categoryId = (name)=>{
    setCat(name)
  }
  console.log(category);//

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
  const fetchcategory = async()=>{
    await axios.get(`http://localhost:3001/api/v1/category`).then((feedback)=>{
      console.log(feedback.data.msg);
      setcategory(feedback.data.msg)
    }).catch((error)=>{
      console.log(error.message);
    })
  }
  useEffect(() => {
    fetchcategory()
  }, []);
  return (
    <div style={{marginTop:"10vh"}}>
         <div className='prod-box m-auto'>
        <form method='post' onSubmit={postprod} encType='multipart/form-data'>
          
          <div className='form-group'>
            <label>title</label><br/>
            <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} className='form-control shadow-lg' />
          </div>
          <div className='form-group'>
            <label>description</label><br/>
            <textarea cols="60" onChange={(e)=>{setDesc(e.target.value)}} value={desc} rows="5" className='border border-none shadow-lg'></textarea>
          </div>
          <div className='form-group'>
            <label>spec</label><br/>
            <textarea cols="60" onChange={(e)=>{setSpec(e.target.value)}} value={spec} rows="5" className='border border-none shadow-lg'></textarea>
          </div>
          <div className='d-flex'>
          <div className='form-group'>
            <label>brand</label><br/>
            <input type="text" onChange={(e)=>{setBrand(e.target.value)}} value={brand} className='form-control shadow-lg' />
          </div>
          <div className='form-group ml-5'>
            <label>price</label><br/>
            <input type="text" onChange={(e)=>{setPrice(e.target.value)}} value={price} className='form-control shadow-lg' />
          </div>
          </div>
          <div >
          <div className='form-group'>
            <div><h5>category</h5></div>
            {
              cat.map((item)=>{
                return (
                    <span className='pl-2'>
                    <input type='button' onClick={()=> categoryId(item.category_name)}  className='btn btn-outline-success m-1 cat-butt' name={item.category_name} value={item.category_name}/>
                    </span>
                    
                )
              })
            }
          </div>
          <div className='form-group'>
            <label>season</label><br/>
            <select onChange={(e)=>{setSeason(e.target.value)}} value={season} className='browser-default shadow-lg custom-select '>
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
            }} className='form-control shadow-lg' />
          </div>
           {/* <div className='form-group ml-5'>
            <label>image</label><br/>
            <input type="text" ref={imageRef} className='form-control' />
          </div> */}
          <div>
            <button type='submit'  className="btn btn-warning mb-5"> post product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminPost