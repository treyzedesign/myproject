const {Router} = require("express")
// const product = require("../controllers/product")
const Products = require("../model/Products")
const Category = require("../model/Category")
const Verify = require("../utils/Auth")
const UserAuth = require("../utils/UserAuth")
const productRouter = Router()
const multer = require('multer')
const { verify } = require("jsonwebtoken")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
       cb(null, './upload/')
    },
    filename: (req, file, cb)=>{
       cb(null, "fleeksOnlineStore" + "_" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 7 //7mb
    }
})

productRouter.post("/products",  Verify, upload.single('image'), async(req,res)=>{
    console.log(req.file)
   
    const title = req.body.title
    const description = req.body.description
    const spec = req.body.spec
    const brand = req.body.brand
    const price = req.body.price
    const category = req.body.category
    const season = req.body.season
    const poster = req.file.path
    try{
        if(req.body == undefined){
            res.status(404).json({
                msg:"invalid request"
            })
        }else{
            const date = new Date()
            // console.log(date);
            const val = Math.floor(1234567 + Math.random() * 9999999);
            console.log(val); 
            const newProduct = await Products.insertMany({
                id : val,
                title: title,
                description: description,
                spec: spec,
                brand: brand,
                price : price,
                category: category,
                season : season,
                poster: poster,
                date: date
            })
            // console.log(newProduct)
            if(newProduct){
                const produce = await Products.create(newProduct)
                res.status(201).json({msg: "products added successfully", data: produce})
            }
        }
    }catch(error){
        res.status(500).json({
            msg: error.message
        })
    }
})

// get all products
productRouter.get("/products/", async (req, res)=>{
    const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
    const date = req.query.date == 'desc' ? -1 : 1
    try {
        const feedback = await Products.find({})
        .limit(limit)
        .sort({id : sort, date: date})
        if(feedback){
            // console.log(feedback)
            res.send(feedback)
        }
       
    }catch(error){
        res.status(500).json({
            msg: error.message
        })
    }
})
//get total products
productRouter.get("/products/total", async(req,res)=>{
    const total = await Products.countDocuments({}).exec()
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
// add product category
productRouter.post("/category", UserAuth, async(req, res)=>{
    const {category_name } = req.body
    try {
        if(req.body == undefined){
            res.status(400).json({
                msg:"invalid request"
            })
        }else{
            if(req.user.superAdmin == true || req.user.isAdmin == true){
                const feedback = await Category.findOne({category_name: category_name})
                if (feedback){
                    res.status(400).json({
                        msg:"category already exists"
                    })
                }else{
                    const data = {
                        id : Math.floor(1234 + Math.random() * 9999),
                        category_name :  category_name
                    }
                    const query = await Category.create(data)
                    if (query){
                        res.status(201).json({
                            message: "created"
                        })
                    }
                }
            }else{
                res.status(403).json({
                    message: "Unauthorized User"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})
// get product categories
productRouter.get("/category",  async (req, res)=>{
    try {
        const feedback = await Category.find({})
        if(feedback){
            res.status(200).json({msg:feedback})
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
        
    }
})

// delete category

productRouter.delete('/category/:id', UserAuth, async(req, res)=>{
    const id = req.params.id
    try {
        const feedback = await Category.findOne({id: id})
        if(feedback){
            const del = await Category.deleteOne({id: id})
            if(del){
                await Products.find({category: feedback.category_name}).updateMany({
                    $set:{
                        category: "UnCategorized"
                    }
                })
                res.status(200).json({
                    msg: "deleted successfully"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
        
    }
})

//get products in category
productRouter.get("/products/category/:category", async (req, res)=>{
    const category = req.params.category;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

    try {
        const feedback = await Products.find({category : category})
        .limit(limit)
		.sort({ id: sort })
        if(feedback){
            res.send(feedback)
        }else{
            res.status(400).json({
                msg: "bad request"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})
//get products by season
productRouter.get("/products/season/:season", async(req, res)=>{
    const season = req.params.season;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
    try {
        const feedback = await Products.find({season})
        .limit(limit)
		.sort({ id: sort })
        if(feedback){
            res.send(feedback)
        }else{
            res.status(400).json({
                msg: "bad request"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

//get products by ID
productRouter.get("/products/:id", async (req, res)=>{
    const id = req.params.id;
	// const limit = Number(req.query.limit) || 0;
	// const sort = req.query.sort == 'desc' ? -1 : 1;

    try {
        const feedback = await Products.find({id})

        if(feedback){
            res.send(feedback)
        }else{
            res.status(400).json({
                msg: "bad request"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

// edit product by  getting the id
productRouter.patch("/products/:id", async(req, res)=>{
    try {
        if (typeof req.body == undefined || req.params.id == null) {
            res.json({
                status: 'error',
                message: 'something went wrong! check your sent data',
            });
        }else{
           const feedback = {
                id: parseInt(req.params.id),
                title: req.body.title,
                price: req.body.price,
                brand: req.body.brand,
                description: req.body.description,
                poster: req.body.poster,
                category: req.body.category,
                spec:req.body.spec
            };
            if(feedback){
                const newEdit = await Products.updateOne(feedback)
                if(newEdit){
                    res.status(201).json({
                        msg: "successful"
                    })
                }
            }
        }  
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

//for deleting product
productRouter.delete("/products/:id", Verify, async(req,res)=>{
    const delete_id = req.params.id
    if(delete_id == null){
        res.status(400).json({
            status: 'error',
			message: 'cart id should be provided'
        })
    }else{
        const del_prod= await Products.findOne({
			id: req.params.id
		}).deleteOne()
        // res.send({del_prod})
       
    }
})

module.exports= productRouter