const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Database connected successfully"))
.catch((e)=>console.log("Not Connected"))