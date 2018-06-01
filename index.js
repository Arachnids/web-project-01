const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //CUANDO EL BODY NoEx
const cors = require('cors');

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
// app.get('/', (req, res) => {
//   res.status(200).json({title: 'Hello World'});
// });
// app.get('/api/jobs', (req, res) => {
//   res.send([1, 2, 3])
// });

// app.post()
// app.put()
// app.delete()

//CONECTION TO MONGODB ONLINE
const connectMongoOnline = 'mongodb://admin:web2018@ds119490.mlab.com:19490/webproject01';
mongoose.connect(connectMongoOnline);
let db = mongoose.connection;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

const jobsRoutes = require('./api/jobs/routes'); //IMPORT JOBS ROUTES
const usersRoutes = require('./api/users/routes'); //IMPORT USERS ROUTES 
const categoriesRoutes = require('./api/categories/routes'); 

jobsRoutes(app); //REGISTER ROUTE
usersRoutes(app); //REGISTER ROUTE
categoriesRoutes(app);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
