// import axios from "axios";
// import Cookies from "js-cookie";
// export const handlePayment = (checkStore, amount, cart, userId, cookie)=>{
//   // console.log(checkStore, amount, cart, userId, cookie);
//     const handler = PaystackPop.setup({
//         key: 'pk_test_17bcdae32614d8cdb649c35a2fdbaf51b6b81b64', 
//         email: checkStore.email,
//         amount: amount * 100, 
//         currency: 'NGN', 
//         callback:  function(response) {
//           const reference = response.reference;
//           Cookies.set("refId", reference)
//           let alertbox = alert('Payment complete! Reference: ' + reference);
//         },
//         onClose: function() {
//           alert('Transaction was not completed, window closed.');
//         },
        
//       });
//       handler.openIframe();
// }

