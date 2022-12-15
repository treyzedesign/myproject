const sendverification = async ({id, email}, res)=>{
    const url = "http://localhost:3001/"
    const uniqueString = uuidv4() + id
  
    const mailOptions = {
      from : process.env.USER,
      to: email,
      subject : "Please Verify your email",
      html: `<p>Please verify your email address to complete the signup process into your account</p>
              <p>Click the link<b>(expires in 45 minutes)</b> : <a href=${url + "/user/verify/" + id + "/" + uniqueString}> press Here</a> to proceed</p>`
    }
    // transporter.sendMail(mailOptions)
    // console.log("done");

    // hash the unique string
    const saltrounds = 10
    const hashedString = await bcrypt.hash(uniqueString, saltrounds)
    //         set values in the user verification collections
            const newVerify = {
               id : id,
               uniqueString : hashedString,
               createdAt: Date.now(),
               expires : Date.now() + "450000"
            }
    //       
           try {
            let very = await Verify.create(newVerify)
            if(very){
                transporter.sendMail(mailOptions)
                console.log("success");
                res.send({
                    status: "pending",
                    msg: "Verification email sent"
                })
            }else{
                res.send({
                    status: "failed",
                    msg: "Verification failed to send"
                })
                console.log('failure');
            }
           } catch (error) {
               console.log(error)
           }
        //      await newVerify.save()
        //               .then((feed)=>{
        //                 res.send(feed)
        //                 transporter.sendMail(mailOptions).then(()=>{
        //                     res.json({
        //                         status: "pending",
        //                         msg : "verification email sent"
        //                     })
        //                 })
        //               })
        //               .catch((error)=>{
        //                 res.send({
        //                     status: "failed",
        //                     msg : error
        //                 })
                
        //   })
  }

// verify email

signupRouter.get("user/verify/:id/:uniqueString", async (req, res)=>{
    let {id, uniqueString} = req.params 

    try {
        const userVerify = await Verify.find({id})
        if(userVerify){
           
        }
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
})