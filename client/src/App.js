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
import Cookie from 'js-cookie'
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

const getItemsFromLocalStorage = () => {
const result = localStorage.getItem("cart")
const cartItems = result ? JSON.parse(result) : []
return cartItems
}

function App() {

  const [cart, setCart] = useState(getItemsFromLocalStorage());
  const [price, setprice] = useState();


  const [loader, setLoader] = useState(false)
  const [topDeals, setTopDeals] = useState([])
  const [editor, setEditor] = useState([])
  const td_url = `http://localhost:3001/api/v1/products/season/Topdeals?limit=4`
  const ed_url = `http://localhost:3001/api/v1/products/season/editor?limit=4`
 
  


  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
    // handlePrice()
  };
  
  const handlePrice = () => {
   const subTotal = cart?.reduce((acc, item)=>{
    return acc += item.price * item.amount
   },0) 
    setprice(subTotal);
  };

  const deleteCartItem = (item)=>{
    const cartid = item.id
    let cartCopy = JSON.parse(localStorage.getItem('cart'))
  
    cartCopy = cartCopy.filter(item => item.id != cartid);
    //update state and local
    // setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy)
    localStorage.setItem('cart', cartString)
    window.location.reload()
    // handlePrice()
  }

   const fetchProducts = async (td_url, ed_url)=>{
     try {
      setLoader(true)
      const {data} = await axios(td_url)
      const {data: editors} = await axios(ed_url)
      setTopDeals(data)
      setEditor(editors)
      setLoader(false)
     } catch (error) {
      setLoader(false)
     }
     
   }
   useEffect(() => {
      fetchProducts(td_url, ed_url)
   }, []);

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
  
  //look for item in cart array
  let existingItem = cart.find(cartItem => cartItem.id == id);
  //if item already exists
  if (!existingItem) {
      setCart(prev => [...prev, tem])
  } 
  //make cart a string and store in local space
  }
  useEffect(() => {
    //turn it into js
    let stringCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringCart)
    handlePrice()

    
  }, [cart])
// for the Admin

  const del_prod = async(item)=>{
    const id = item.id
    const name = item.title
    const token = Cookie.get('AccessToken')
    console.log(token);
   const accept = window.confirm("are you sure you want to delete this product")
   if(accept){
     const del = await axios.delete(`http://localhost:3001/api/v1/products/${id}`,{
       headers: {
        "token" : token
      }
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
                topDeals={topDeals}
                editor={editor}
                loader={loader}
            />}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact-us" element={<Contact/>}/>
          <Route path="cart" 
              element={<Cart cart={cart} 
                            handleChange={handleChange} 
                            handlePrice={handlePrice}
                            price={price}
                            deleteCartItem={deleteCartItem}
            />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
