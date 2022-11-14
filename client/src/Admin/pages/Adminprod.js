import React from 'react'
import "../admin.css"
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'

const Adminprod = () => {
  const [file, setFile] = useState()
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const specRef = useRef(null)
  const brandRef = useRef(null)
  const priceRef  = useRef(null)
  const catRef = useRef(null)
  const seasonRef = useRef(null)
  const imageRef = useRef(null)
  
  const postprod = async()=>{
  const title = titleRef.current.value
  const description = descRef.current.value
  const spec = specRef.current.value
  const brand = brandRef.current.value
  const price = priceRef.current.value
  const category = catRef.current.value
  const season = seasonRef.current.value
     const poster = imageRef.current.value
  //  const poster = new FormData()   ;
  //  poster.append("file", file)  
      await axios.post("http://localhost:3001/api/v1/products", {
        title,
        description,
        spec,
        brand,
        price,
        category,
        season
        // poster
      }).then((feedback)=>{
        console.log(feedback)
      }).catch((fault)=>{
        console.log(fault);
      })
  }

  return (
    <div className='product m-auto'>
      <div className='prod-box m-auto'>
        <form method='post' encType='multipart/form-data'>
          <h1 className='p-h1'>POST PRODUCTS</h1>
          <div className='form-group'>
            <label>title</label><br/>
            <input type="text" ref={titleRef} className='form-control' />
          </div>
          <div className='form-group'>
            <label>description</label><br/>
            <textarea cols="60" ref={descRef} rows="5"></textarea>
          </div>
          <div className='form-group'>
            <label>spec</label><br/>
            <textarea cols="60" ref={specRef} rows="5"></textarea>
          </div>
          <div className='d-flex'>
          <div className='form-group'>
            <label>brand</label><br/>
            <input type="text" ref={brandRef} className='form-control' />
          </div>
          <div className='form-group ml-5'>
            <label>price</label><br/>
            <input type="text" ref={priceRef} className='form-control' />
          </div>
          </div>
          <div >
          <div className='form-group'>
            <label>category</label><br/>
            <select ref={catRef} className='browser-default custom-select px-2'>
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
            <select ref={seasonRef} className='browser-default custom-select '>
              <option disabled selected></option>
              <option > Topdeals</option>
              <option > Bonanza</option>
              <option > Editor</option>
            </select>
          </div>
          </div> 
          <div className='form-group'>
            <label>image file</label><br/>
            <input type="file" ref={imageRef} onChange={event => {
              const file = event.target.files[0]
              setFile(file) 
            }} className='form-control' />
          </div>
          <div>
            <button className='btn btn-warning' onClick={postprod}> post product</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Adminprod