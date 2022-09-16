const express = require('express');
const app = express();
const port = 5000

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:false, limit:'10mb'}));



app.listen(port, ()=>{
    console.log(`Server listening to port ${port}`)
})



