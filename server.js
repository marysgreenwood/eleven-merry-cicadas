//load express
const express= require("express");
//load routes
const apiRoutes= require('./apiRoutes');
const htmlRoutes= require('./htmlRoutes');

//initialize app
const app= express();
//create port
const PORT= process.env.PORT || 3001;

//set up middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//retrieve api and html routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

//Start the server
app.listen(PORT, () => console.log (`Listening on ${PORT}`));



