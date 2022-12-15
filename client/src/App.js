import { FaShoppingBag} from "../node_modules/react-icons/fa"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Home from './Components/Home/Home';
import AdminForm from './Admin/AdminForm'
import AdminReg from "./Admin/AdminReg";
import HomeNav from "./Components/Home/Home/HomeNav";
import Admin from "./Admin/Admin"
import SharedLayout from "./Components/SharedLayout";
import Sharedlayout from "./Admin/Sharedlayout";
import { useState, useEffect } from "react";
import { Routes, Route} from 'react-router-dom'
import axios from "axios"
import About from "./Components/About";
import Adminprod from "./Admin/pages/Adminprod";
import AdminUser from "./Admin/pages/AdminUser";
import { AdminOrder } from "./Admin/pages/AdminOrder";
import AdminNote from "./Admin/pages/AdminNote";
import ProtectedRoute from "./Components/ProtectectedRoute";
import HomeBan from "./Components/Home/Home/HomeBan";
import Cart from "./Components/Cart";
import UserReg from "./Components/UserReg";
import LogUser from "./Components/LogUser";
import SplitLayout from "./User/SplitLayout";
import Userdash from "./User/Pages/Userdash";
import Contact from "./Components/Contact";
import EmailVerify from "./Components/EmailVerify";

function App() {
  const [cart, setcart] = useState([]);
  const handleClick = (item)=>{
  const {id} = item
  const tem ={
    id: item.id,
    title : item.title,
    poster: item.poster,
    price: parseInt(item.price),
    brand: item.brand,
    amount: 1
  }
  console.log(id);
  let cartCopy = [...cart];
  //look for item in cart array
  let existingItem = cartCopy.find(cartItem => cartItem.id == id);
  //if item already exists
  if (!existingItem) {
      cartCopy.push(tem)
  } 
  setcart(cartCopy)
  
  //make cart a string and store in local space
  let stringCart = JSON.stringify(cartCopy);
  localStorage.setItem("cart", stringCart)
  }
  useEffect(() => {
    //turn it into js
  const localCart = JSON.parse(localStorage.getItem("cart"))
    //load persisted cart into state if it exists
    if (localCart){
      setcart(localCart)
    } 
    
  }, [])

  const del_prod = async(item)=>{
    const id = item.id
    const name = item.title
    const token = sessionStorage.getItem("user")
    console.log(token);
   const accept = window.confirm("are you sure you want to delete this product")
   if(accept){
     const del = await axios.delete(`http://localhost:3001/api/v1/products/${id}`,{
       headers:{token : token}
     }).then((feedback)=>{
       console.log(feedback);
     window.location.reload()
     }).catch((fail)=>{
      console.log(fail);
     })
   }
 }
 const [username, setUsername] = useState()
 const getdata = (data)=>{
    console.log("coming from", data)
    setUsername(data)
 }
  return (
    <div className="App">
      {/* <HomeNav/> */}
      <Routes>
        {/* ADMIN */}
        <Route path="/admin" element = {<ProtectedRoute><Sharedlayout/></ProtectedRoute>}>
           <Route index element={<Admin/>}/>
           <Route path="/admin/products" element={<Adminprod del_prod = {del_prod}/>}/>
           <Route path="/admin/users" element={<AdminUser del_prod={del_prod}/>}/>
           <Route path="/admin/orders" element={<AdminOrder/>}/>
           <Route path="/admin/notifications" element={<AdminNote/>}/>
        </Route>
        <Route path="/admin-register" element={<AdminReg/>}></Route>
        <Route path="/admin-login" element={<AdminForm/>}></Route>

        {/* Profile */}
        <Route path="/user/profile" element={<SplitLayout name={username}/>}>
             <Route index element={<Userdash/>}/>
        </Route>
        <Route path="/register" element={<UserReg/>}></Route>
        <Route path="/login" element={<LogUser onClick={getdata}/>}></Route>


        <Route path="/user/verify/:email/:token" element={<EmailVerify/>}></Route>

        {/* users */}
        <Route path='/' element={<SharedLayout size={cart.length} name={username}/>}>
          <Route index element={<HomeBan
                  handleClick={handleClick}
                
            />}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact-us" element={<Contact/>}/>
          <Route path="cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
