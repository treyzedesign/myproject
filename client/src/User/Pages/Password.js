import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef,useState ,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Password = ({id}) => {
  const navigate = useNavigate()
  const [pass, setpass] = useState('');
  const [npass, setNpass] = useState('');
  const [cpass, setCpass] = useState('');

  const [newpass, setnewpass] = useState(true);
  const [info, setinfo] = useState();

  
  const checkUser = async(pass, id)=>{
    const userid = String(id)
    const cookie = Cookies.get("UserLoginToken")
    const data = {
      password : pass
    }
    await axios.post(`http://localhost:3001/api/v1/signup/checkpassword/${userid}`, data, {
      headers: {
        "usertoken" : cookie
      }
    }).then((feedback)=>{
      console.log(feedback);
      setnewpass(false)
    }).catch((fail)=>{
      console.log(fail.response.data.msg);
      setnewpass(true)
      setinfo(fail.response.data.msg)
    })
  }
  const changepass = async(npass, cpass,id)=>{
    if (npass.length == 0 &&  cpass.length == 0){
      setinfo("please fill the form")
  }
  else if (npass != cpass){
      setinfo("password doesn't match")
  }
  else if (npass.length < 8 || cpass.length < 8){
      setinfo("password characters less than 8")
  }else{
    let data ={
      id : id,
      password : cpass
  }
  await axios.patch('http://localhost:3001/api/v1/signup/changePassword', data).then((feedback)=>{
      console.log(feedback);
      setinfo('succesfully updated your password')
  }).catch((fail)=>{
    console.log(fail);
  })
  }
  }
  
  return (
    <div>
      <div className='user-formlog  px-5 py-3 shadow-lg'>
          <form className="form-signin">
            <h3 className='text-primary'>change Password</h3><hr/>
            <div className='tet-center font-weight-bolder'><small className='text-dark'>{info}</small></div>
            
            {newpass ?
                <div>
                    <label className="">current password</label>
                    <input type="password"  className="form-control my-1 d-inline" onChange={(e) => setpass(e.target.value)} required />
                    <button className="btn btn-lg btn-primary btn-block d-inline" type="button" onClick={()=> checkUser(pass, id)} >Continue</button><hr/>
                </div>
             : 
               <div>
                <label className="">new password</label>
                <input type="password"  className="form-control my-1" onChange={(e)=> setNpass(e.target.value)}  required />
                <label className="">confirm password</label>
                <input type="password"  className="form-control my-1" onChange={(e)=> setCpass(e.target.value)}  required />
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=> changepass(npass,cpass,id)} >submit</button><hr/>
               </div>
            }
          
           
        </form>
      </div>
    </div>
  )
}

export default Password