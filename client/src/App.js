import { FaShoppingBag} from "../node_modules/react-icons/fa"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import AdminForm from './Admin/AdminForm'
import AdminReg from "./Admin/AdminReg";
import Admin from "./Admin/Admin"
import SharedLayout from "./Components/SharedLayout";
import Sharedlayout from "./Admin/Sharedlayout";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from 'react-router-dom'
import axios from "axios"
import Cookie from 'js-cookie'
import jwt_decode from "jwt-decode";
import About from "./Components/About";
import Adminprod from "./Admin/pages/Adminprod";
import AdminUser from "./Admin/pages/AdminUser";
import { AdminOrder } from "./Admin/pages/AdminOrder";
import ProtectedRoute from "./Components/ProtectectedRoute";
import HomeBan from "./Components/Home/Home/HomeBan";
import Cart from "./Components/Cart";
import UserReg from "./Components/UserReg";
import LogUser from "./Components/LogUser";
import SplitLayout from "./User/SplitLayout";
import Userdash from "./User/Pages/Userdash";
import Contact from "./Components/Contact";
import EmailVerify from "./Components/EmailVerify";
import Cookies from "js-cookie";
import UserEdit from "./User/Pages/UserEdit";
import Checkout from "./Components/Checkout";
import SecureRoute from "./User/SecureRoute";
import MyOrder from "./User/Pages/MyOrder";
import Searched from "./Components/Searched";
import ForgotPass from "./Components/ForgotPass";
import ChangePassword from "./Components/ChangePassword";
import Password from "./User/Pages/Password";
import AdminPost from "./Admin/pages/AdminPost";
import AdminSettings from "./Admin/pages/AdminSettings";
import NotFound from "./Components/NotFound";
import ResendMail from "./Components/ResendMail";
import 'react-toastify/dist/ReactToastify.css';

const getItemsFromLocalStorage = () => {
const result = localStorage.getItem("cart")
const cartItems = result ? JSON.parse(result) : []
return cartItems
}

function App() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(getItemsFromLocalStorage());
  const [price, setprice] = useState();
  const [Username, setusername] = useState([])
  //user info
  const [fname, setfname] = useState();
  const [lname, setlname] = useState();
  const [email, setemail] = useState();
  const [add, setadd] = useState();
  const [state, setstate] = useState();
  const [country, setcountry] = useState();
  const [tel, settel] = useState()
  const [id, setid] = useState();
  const [Order, setOrders] = useState([])
  const [searchRe, setSearchRe] = useState()

  const [loader, setLoader] = useState(false)
  const [alert, setalert] = useState(false)
  const [item, setitem] = useState(false)
  const [prodBox, setProdBox] = useState(false)
  const [topDeals, setTopDeals] = useState([])
  const [editor, setEditor] = useState([])

  const td_url = `http://localhost:3001/api/v1/products/season/Topdeals?limit=5`
  const ed_url = `http://localhost:3001/api/v1/products/season/editor?limit=4`
 
   const fetchProducts = async (td_url, ed_url)=>{
    setLoader(true)
     try {
      const {data} = await axios(td_url)
      const {data: editors} = await axios(ed_url)
      setTopDeals(data)
      setEditor(editors)
      setLoader(false)
     } catch (error) {
      setLoader(true)
     }
     
   }
   useEffect(() => {
    fetchProducts(td_url, ed_url)   
   }, [])

  const handleClick = (item)=>{
    // setalert(true)
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
      setalert(true)
  }else{
    setalert(false)
  }
  //make cart a string and store in local space
    
  }
  const rem_modal = ()=>{
    setalert(false)
  }

  const viewProd =(item)=>{
    let infoset = setitem(item)
    console.log(item);
        setProdBox(true)
  }
  const rem_prodModal = ()=>{
    setProdBox(false)
  }
  useEffect(() => {
    //turn it into js
    let stringCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringCart)
    handlePrice()

    
  }, [cart])

  // CART FUNCTIONS
  
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
  const clearCart = ()=>{
    localStorage.removeItem('cart')
    window.location.reload()
  }
  // const [searcher, setSearcher] = useState()
  const finderbtn = (sea)=>{
    
    axios.get("http://localhost:3001/api/v1/products/").then((feedback)=>{
        console.log(feedback.data);
        let data = feedback.data
        let filt = data.filter(item => item.title.toLowerCase().includes(sea.toLowerCase()) || item.category.toLowerCase().includes(sea.toLowerCase())) 
          setSearchRe(filt)
          navigate("searched_products")
          console.log(searchRe);
    })
  }
  

  
// SOME FUNCTIONS FOR THE ADMIN
  const del_prod = async(item)=>{
    const id = item.id
    const name = item.title
    const token = Cookie.get('AccessToken')
    console.log(token);
   const accept = window.confirm("are you sure you want to delete this product")
   if(accept){
    window.location.reload()
     const del = await axios.delete(`http://localhost:3001/api/v1/products/${id}`,{
       headers: {
        "token" : token
      }
     }).then((feedback)=>{
       console.log(feedback);
     }).catch((fail)=>{
      console.log(fail);
     })
   }
 }

 const del_order = async(item)=>{
  const refId = item.refId
  const token = Cookie.get('UserLoginToken')
  const accept = window.confirm("are you sure you want to delete this order")
  if(accept){
    // window.location.reload()
    const del = await axios.delete(`http://localhost:3001/api/v1/order/${refId}`,{
      headers: {
       "usertoken" : token
     }
    }).then((feedback)=>{
      console.log(feedback);
      alert("deleted successfully")
    }).catch((fail)=>{
     console.log(fail);
    })
  }
 }

 const del_all_order = async ()=>{
  const token = Cookie.get('UserLoginToken')
  let accept = window.confirm("do you wish to proceed")
  if(accept){
    window.location.reload()
    await axios.delete("http://localhost:3001/api/v1/order/", {
       headers: {
      "usertoken" : token
       }
      }).then((feedback)=>{
      console.log(feedback);
    })
  }   
}

// SOME FUNCTIONS FOR THE USER DASHBOARD
 
let cookie = Cookies.get("UserLoginToken")
let store = JSON.parse(localStorage.getItem("userAddress"))
const fetchUsers = async()=>{
  if (!cookie){
      console.log("bad");
  }else{
      let decoder = jwt_decode(cookie)
      // fetch user data
      await axios.get(`http://localhost:3001/api/v1/signup/${decoder.id}`).then((feedback)=>{
        if (store == null){
          let userAddressBook = {
            firstname : feedback.data[0].firstName,
            lastName : feedback.data[0].lastName,
            email : feedback.data[0].email,
            tel : feedback.data[0].tel,
            address : feedback.data[0].address,
            state : feedback.data[0].state,
            country : feedback.data[0].country
          }
          localStorage.setItem("userAddress", JSON.stringify(userAddressBook))
        }
        setfname(feedback.data[0].firstName)
        setlname(feedback.data[0].lastName)
        setemail(feedback.data[0].email)
        setadd(feedback.data[0].address)
        setstate(feedback.data[0].state)
        setcountry(feedback.data[0].country)
        setid(feedback.data[0].id)
        settel(feedback.data[0].tel)
      }).catch((fail)=>{
        console.log(fail);
      })

      // fetch user Orders
       await axios.get(`http://localhost:3001/api/v1/order/${decoder.id}?sort=desc`).then((feedback)=>{
        setOrders(feedback.data)
      }).catch((fail)=>{
        console.log(fail);
      })
    }
  }
useEffect(()=>{
  
   fetchUsers()
   
},[])
  return (
    <div className="App">
      {/* <HomeNav/> */}
      <Routes>
        {/* ADMIN */}
        <Route path="/admin" element = {<ProtectedRoute><Sharedlayout/></ProtectedRoute>}>
           <Route index element={<Admin fname={fname} lname={lname}/>}/>
           <Route path="/admin/products" element={<Adminprod del_prod = {del_prod}/>}/>
           <Route path="/admin/users" element={<AdminUser del_prod={del_prod}/>}/>
           <Route path="/admin/orders" element={<AdminOrder del_order={del_order} del_all_order={del_all_order}/>}/>
           <Route path="/admin/post-product" element={<AdminPost/>}/>
           <Route path="/admin/settings" element={<AdminSettings/>}/>
        </Route>
        <Route path="/admin-register" element={<AdminReg/>}></Route>
        <Route path="/admin-login" element={<AdminForm/>}></Route>

        {/* Profile */}
        <Route path="/user" element={<SecureRoute><SplitLayout size= {cart.length}/></SecureRoute>}>
             <Route index element={<Userdash 
              fname={fname} lname={lname} address={add} email={email} state={state} country={country} tel={tel}
             />}/>
             <Route path="/user/profile/update_account" element={<UserEdit
              fname={fname} lname={lname} address={add} email={email} state={state} country={country} id={id} tel={tel}
             />}/>
             <Route path="/user/user_orders" element={<MyOrder id={id} Order={Order}/>}/>
             <Route path="/user/change-user-password" element={<Password id={id}/>}/>
        </Route>
        <Route path="/register" element={<UserReg/>}></Route>
        <Route path="/login" element={<LogUser />}></Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/resend_mail/:email/:firstName" element={<ResendMail/>}/>
        <Route path="/user/verify/:email/:token" element={<EmailVerify/>}></Route>
        <Route path="/user/password/forgotPass" element={<ForgotPass/>}></Route>
        <Route path="/change_password/:id" element={<ChangePassword/>}></Route>
        {/* users */}
          <Route path='/' element={<SharedLayout size={cart.length} name={Username} finderbtn={finderbtn}/>}>
          <Route index element={<HomeBan
                handleClick={handleClick}
                topDeals={topDeals}
                editor={editor}
                loader={loader}
                alert={alert}
                rem_modal={rem_modal}
                rem_prodModal={rem_prodModal}
                viewProd={viewProd}
                item={item}
                prodBox = {prodBox}
            />}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact-us" element={<Contact/>}/>
          <Route path="cart" 
              element={<Cart cart={cart} 
                            handleChange={handleChange} 
                            handlePrice={handlePrice}
                            price={price}
                            deleteCartItem={deleteCartItem}
                            clearCart={clearCart}
            />}/>
          <Route path="searched_products" element={<Searched 
          searchRe={searchRe}
          handleClick={handleClick}
          viewProd={viewProd}
          />}/>
          <Route path="shipping_page" element={<SecureRoute><Checkout 
           cart={cart} price={price} id={id} 
           /></SecureRoute>}/>            
          </Route>
      </Routes>
    </div>
  );
}

export default App;
