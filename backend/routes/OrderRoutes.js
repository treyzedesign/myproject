const {Router} = require("express")
const Order = require("../model/Order")
const UserAuth = require("../utils/UserAuth")
const Verify = require("../utils/Auth")

const orderRouter = Router()

orderRouter.post("/order", UserAuth, async (req, res) => {
    const newOrder = new Order(req.body);
    console.log(req.body.userId);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json({
        msg: "Order has been made successfully"
      });
    } catch (err) {
      res.status(500).json(err); 
    }
  });


//get all
  
  orderRouter.get("/allorder", async (req, res) => {
    const createdAt = req.query.date == 'desc' ? -1 : 1
      try {
        const orders = await Order.find().sort({createdAt: createdAt});
                                              
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json({
          message: err.message
        });
      }
    });
    


orderRouter.get("/order", async (req, res) => {
  const createdAt = req.query.date == 'desc' ? -1 : 1
  const search = req.query.search
    try {
      const orders = await Order.find({$or:[
        {refId: {'$regex': search}},
        {email: {'$regex': search}},
        {payment: {'$regex': search}}
      ]}).sort({createdAt:createdAt});
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  });

  //get by id
orderRouter.get("/order/:userId", async(req, res)=>{
	const sort = req.query.sort == 'desc' ? -1 : 1;
  try {
        const orders = await Order.find({ userId: req.params.userId }).sort({createdAt : sort})
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
})

// delete order by id
orderRouter.delete("/order/:refId", UserAuth, async(req,res)=>{
 try {
  const delete_id = req.params.refId
  if(delete_id == null){
      res.status(400).json({
          status: 400,
          message: 'order id should be provided'
      })
  }else{
    if (req.user.isAdmin == true || req.user.superAdmin == true) {
      const del_prod= await Order.findOne({
        refId: req.params.refId
      }).deleteOne()
    }else{
      res.status(403).json({
        msg:"unAuthorized user"
      })
    } 
  }
 } catch (error) {
  res.status(500).json({
    msg: error.message
  });
 }
})

// delete all orders

orderRouter.delete("/order/", UserAuth, async(req, res)=>{
  try {
    if(req.user.isAdmin == true || req.user.superAdmin == true){
      const deleter = await Order.deleteMany()
      if (deleter ){
        res.status(200).json({msg: "deleted successfully"})
      }
    }else{
        res.status(403).json({
          msg : "unauthorized user"
        })
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }

})

// update status

orderRouter.patch("/order/status",async(req,res)=>{
  try {
      await Order.find({status: 'pending'}).updateMany({
        $set: {
          status : 'successful'
        }
      }).then((result)=>{
        console.log(result);
        res.json({status: 'okay'})
    }).catch((fail)=>{
        console.log(fail);
        res.json({status: 'fail'})
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
    
  }
})

module.exports = orderRouter