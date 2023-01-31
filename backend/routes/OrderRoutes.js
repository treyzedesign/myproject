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

orderRouter.get("/order", async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
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
orderRouter.delete("/order/:refId", Verify, async(req,res)=>{
  const delete_id = req.params.refId
  if(delete_id == null){
      res.status(400).json({
          status: 'error',
          message: 'order id should be provided'
      })
  }else{
      const del_prod= await Order.findOne({
        refId: req.params.refId
  }).deleteOne()
  }
})

// delete all orders

orderRouter.delete("/order/", Verify, async(req, res)=>{
  const deleter = await Order.deleteMany()
  if (deleter ){
    res.send('success')
  }
})

// update status

orderRouter.patch("/order/status", async(req,res)=>{
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
    res.status(500).json(error);
    
  }
})

// get Income 
orderRouter.get("/order/total", async(req,res)=>{
  const total = await Order.countDocuments({}).exec()
  console.log(total)
  if(total){
      res.status(200).json({
          data: total
      })
  }else {
      res.send({
          data: 0
      })
  }
})

orderRouter.get("/order/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
   
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    if (income) {
      res.status(200).json({
        data: income
      })
    }
  }catch(err){
    res.status(500).json(err);
  }
})
module.exports = orderRouter