const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// app.use((req,res,next) => {
// 	res.render('maint');
// });

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}	`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (error) => {
		if(error){
			console.log('error');}
	});
	next();
});

// to access files in PUBLIC folder
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// res.send('<h1>holle express!</h1>');
	// res.send({
	// 	name: 'nani',
	// 	likes: [
	// 		"playing", 
	// 	"zzzzzzzzzzzzzmusic"]
	// });
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my world'
	})
});

app.get('/about', (req, res) => {
	// res.send('About Page');
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});
});

app.get('/bad',(req, res) => {
	res.send({
		errorMessage: 'page not found'
	})
});

app.listen(3000, ()=>{
	console.log(`server starts running on port ${port}`);
});


