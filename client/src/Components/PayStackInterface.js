export const handlePayment = (email, amount)=>{
    const handler = PaystackPop.setup({
        key: 'pk_test_17bcdae32614d8cdb649c35a2fdbaf51b6b81b64', 
        email: email,
        amount: amount * 100, 
        currency: 'NGN', 
        callback: function(response) {
          const reference = response.reference;
          alert('Payment complete! Reference: ' + reference);
        },
        onClose: function() {
          alert('Transaction was not completed, window closed.');
        },
      });
      handler.openIframe();
}