const express = require("express")
const signupRouter = require("./routes/signupRouter")
const mongoose = require("mongoose")
const session = require("express-session"); 
const mongodbSession = require("connect-mongodb-session")(session);
const adminRouter = require("./routes/adminRouter")
const vendorRouter = require("./routes/vendorsignup")
const loginRouter = require("./routes/loginRouter")
const adminLogin = require("./routes/adminlogin");
const vendorLogin = require("./routes/vendorlogin")
const cartRouter = require("./routes/cart");
const productRouter = require("./routes/products");
const cors = require("cors")

const app = express()
 const MAX_AGE = 1000 * 60 * 60 * 2208  // 92days

const mongodbSessionStore = new mongodbSession({
    uri: "mongodb+srv://treyze123:Fae3FF9lFytn8VmG@cluster0.5kk0hsk.mongodb.net/?retryWrites=true&w=majority",
    databaseName: "E-commerce",
    collection: "sessions"
  })
// app.use("/upload",express.static('upload'))
app.use(cors())
  app.use(session({
    secret: "whateverishereisbeautifulandblessedinthenameofJesusAmenMovingon",
    name: "session id",
    cookie:{
        maxAge: MAX_AGE,
        secure:true,
        sameSite: false
    },
    resave: false,
    saveUninitialized: false,
    store: mongodbSessionStore
  
  }))


app.use(express.json())
// for signup router
app.use("/api/v1", signupRouter)
// for login router
app.use("/api/v1", loginRouter)
// for adminsignup router
app.use("/api/v1", adminRouter)
// for adminlogin roouter
app.use("/api/v1", adminLogin)
// for vendorsignup router
app.use("/api/v1", vendorRouter)
// for vendor login router
app.use("/api/v1", vendorLogin)
// for categories router
app.use("/api/v1", cartRouter)
// for product router
app.use("/api/v1", productRouter)



const PORT = process.env.PORT || 3001

const startServer = async () => {

    await mongoose.connect("mongodb+srv://treyze123:Fae3FF9lFytn8VmG@cluster0.5kk0hsk.mongodb.net/E-commerce?retryWrites=true&w=majority")
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
}
startServer()
