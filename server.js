const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine' , 'hbs');


app.use((req,res,next) => {
  var now =new Date().toString();
  //console.log(`${now}:`)
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('unable to append to server.log')
    }
});
next();
});

//app.use((req,res,next) => {
  //res.render('maintenance.hbs');
//})

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/' , (req,res) => {
  res.render('home.hbs' , {
    pageTitle: 'Home Page' ,
    welcomeMessage: 'Welcome to my website',
    //currentYear: new Date().getFullYear()


//  res.send('<h1>Hello Express!</h1>');
//res.send({
  //name : 'Pooja' ,
  //likes : [
    //'Biking' ,
    //'cities'
  //]
});
});

app.get('/about' , (req,res) => {
  res.render('about.hbs' , {
   pageTitle: 'About page',

 });
});

app.get('/bad', (req, res) =>
{
  res.send({
    errorMessage : 'unable to handle request'
  });
});

app.listen(3000);

//git remote add origin https://github.com/poojaverma94/node-course-2-web-server.git
//git push -u origin master
