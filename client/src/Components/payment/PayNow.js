import axios from "axios";
import { useState } from "react";


export const payNow = async (checkStore, amount, cart, userId, cookie, confirm)=>{
    // console.log(cart, checkStore, amount, userId);
    const refId = 'ref' + Math.floor(123456789 + Math.random() * 999999999);
    // console.log(cart.find("id"));
    const userdetails = {
        userId : userId,
        refId : refId,
        product : cart.map(item => {
            return  {
                productId: item.id,
                productName : item.title,
                productImage : item.poster,
                quantity : item.amount
            }
        }),
        firstname: checkStore.firstname,
        lastname: checkStore.lastName,
        email : checkStore.email,
        tel : checkStore.tel,
        amount : amount,
        address : checkStore.address,
        state: checkStore.state
    }
    // console.log(userdetails);
    if(userdetails){
      await axios.post('http://localhost:3001/api/v1/order', userdetails, {
        headers:{ "usertoken" : cookie}
      }).then((feedback)=>{
        console.log(feedback);
        
      }).catch((fail)=>{
        console.log(fail);
      })
    }
   
}