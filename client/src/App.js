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
import { Routes, Route} from 'react-router-dom'
import axios from "axios"
import About from "./Components/About";
import Adminprod from "./Admin/pages/Adminprod";
import AdminUser from "./Admin/pages/AdminUser";
import { AdminOrder } from "./Admin/pages/AdminOrder";
import AdminNote from "./Admin/pages/AdminNote";
import ProtectedRoute from "./Components/ProtectectedRoute";
import HomeBan from "./Components/Home/Home/HomeBan";
// import Admin from "../../backend/model/Admin";
function App() {
  const cart = []
  const handleClick = (item)=>{
   const tem = {
      id: item.id,
      title: item.title,
      poster: item.poster,
      price: item.price,
      brand : item.brand,
      no: 1
    }
    console.log(cart);
    if(JSON.parse(localStorage.getItem("cart")) === null){
      cart.push(tem)
      localStorage.setItem("cart",JSON.stringify(cart));
    }else{
      let already = []
      const localItems = JSON.parse(localStorage.getItem('cart'))
      localItems.map((data)=>{
        if(item.id == data.id){
           already.push(item.id)
        }
      })
      if(already.length < 1){
          cart.push(tem)
          localStorage.setItem("cart",JSON.stringify(cart));
      }
    }
  }
  return (
    <div className="App">
      {/* <HomeNav/> */}
      <Routes>
        <Route path="/admin" element = {<ProtectedRoute><Sharedlayout/></ProtectedRoute>}>
           <Route index element={<Admin/>}/>
           <Route path="/admin/products" element={<Adminprod/>}/>
           <Route path="/admin/users" element={<AdminUser/>}/>
           <Route path="/admin/orders" element={<AdminOrder/>}/>
           <Route path="/admin/notifications" element={<AdminNote/>}/>
        </Route>
        <Route path="/admin-register" element={<AdminReg/>}></Route>
        <Route path="/admin-login" element={<AdminForm/>}></Route>
        <Route path='/' element={<SharedLayout/>}>
          <Route index element={<HomeBan
                  handleClick={handleClick}
            />}/>
          <Route path="about" element={<About/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
