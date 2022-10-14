const express = require('express');
const router = require('./routes/routers');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(express.static(__dirname+"./public/"));


app.set('view engine', 'ejs');

app.use(router);

app.listen(port);
