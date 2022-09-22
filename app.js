require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
require('./config/db')
const router = require('./routes/indexRoute')
const adminseed = require('./seeder/seedAdmin')
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swegger.json');
const cors = require('cors')


const error = require('./utils/validation/errorHandle');

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:false, limit:'10mb'}));


app.use(express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'resume')))

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// router connection ------
app.use('/api', router)

adminseed()

app.listen(port, ()=>{
    console.log(`Server listening to port ${port}`)
})



