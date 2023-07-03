'use strict';
var debug = require('debug')('my express app');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql2 = require('mysql2/promise');
var mysql = require('mysql2');
var cookieParser = require('cookie-parser');
const { log } = require('handlebars');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'udabuildcompany',
    password: '',
});

const pool1 = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'udabuildcompany',
	password: '',
});

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const urlencodeParser = bodyParser.urlencoded({ extended: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('cck'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

app.get('/', async function (req, res) {
	const data = await pool.query('SELECT * FROM appartmenttype');
	const aparts = data[0];
	let login = req.signedCookies['login'];
	let password = req.signedCookies['password'];
	pool1.query('SELECT * FROM clientaccount', function (err, data) {
		let isLogged;
		let log = false;
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				isLogged = true;
				log = isLogged;
			}
			else {
				isLogged = false;
			}
		})
		if (log) {
			res.render('index.hbs', {
				apart: aparts,
				logged: true,
				nickName: login
			});
		}
		else {
			res.render('index.hbs', {
				apart: aparts,
				logged: false
			});
        }
	})
  
});

app.get('/logout', function(req, res){
	res.clearCookie('login');
	res.clearCookie('password');
	res.redirect('/');
});

app.get('/lk', async function(req, res){
	let login = req.signedCookies['login'];
	let password = req.signedCookies['password'];
	const [data] = await pool.query('SELECT * FROM clientaccount');
		let isLogged;
		let log = false;
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				isLogged = true;
				log = isLogged;
			}
			else {
				isLogged = false;
			}
		})
	let qwerty = data[0].clientsFK;
	const [tems] = await pool.query('SELECT * FROM clients WHERE clientID = ?', qwerty);
		if (log) {
			res.render('lk.hbs', {
				tems: tems[0],
				pass: password,
				login: login
			});
		} else {
			res.redirect('/');
        }
});

app.get('/item/:items', async function (req, res) {
	const { items } = req.params;
	const [tems] = await pool.query('SELECT * FROM appartmenttype WHERE appartmenttype.apartTypeID = ?', items);
	let login = req.signedCookies['login'];
	let password = req.signedCookies['password'];
	pool1.query('SELECT * FROM clientaccount', function (err, data) {
		let isLogged;
		let log = false;
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				isLogged = true;
				log = isLogged;
			}
			else {
				isLogged = false;
			}
		})
		if (log) {
			res.render('item.hbs', {
				logged: true,
				nickName: login,
				tems: tems[0]
			});
		} else {
			res.render('item.hbs', {
				logged: false,
				tems: tems[0]
			});
        }
	})
});

app.get('/basket', function (req, res) {
	let login = req.signedCookies['login'];
	let password = req.signedCookies['password'];
	pool1.query('SELECT * FROM clientaccount', function (err, data) {
		let isLogged;
		let log = false;
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				isLogged = true;
				log = isLogged;
			}
			else {
				isLogged = false;
			}
		})
		if (isLogged) {
			res.render('basket.hbs', {
				logged: true,
				nickName: login
			});
		} else {
			res.render('basket.hbs', {
				logged: false
			});
        }
	})
});

app.get('/login', function (req, res) {
	let login = req.signedCookies['login'];
	let password = req.signedCookies['password'];
	pool1.query('SELECT * FROM clientaccount', function(err, data){
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				res.redirect('/');
				return;
			}
		})
		res.render('login.hbs');
	})
});

app.post('/login', urlencodeParser, function (req, res) {
	let login = req.body.login;
	let password = req.body.password;
	pool1.query('SELECT * FROM clientaccount', function(err, data) {
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				res.cookie('login', login, {
					secure: true,
					signed: true
				});
				res.cookie('password', password, {
					secure: true,
					signed: true
				});
				res.cookie('clientsFK', el.clientsFK, {
					secure: true,
					signed: true
				});
				res.redirect('/');
			}
		});
	});
});

app.get('/registration', function (req, res) {	
	let clientsFK = req.signedCookies['clientsFK'];
	let login = req.signedCookies['login'];
	let password = req.signedCookies['password'];
	pool1.query('SELECT * FROM clientaccount', function (err, data) {
		let isLogged;
		data.forEach(el => {
			if (el.login == login && el.password == password) {
				res.redirect('/');
				return;
			}
		})
		res.render('registration.hbs');
	})
});

app.post('/registration', urlencodeParser, async function (req, res) {
	let login = req.body.login;
	let password = req.body.password;
	let clientName = req.body.clientName;
	let clientSurname = req.body.clientSurname;
	let nickName = req.body.nickName;
	const data = await pool.query("INSERT INTO clients(`nickName`, `clientName`, `clientSurname`) VALUES ( '" + nickName + "', '" + clientName + "', '" + clientSurname + "');");
	const [data1] = await pool.query("SELECT `clientID` FROM `clients` WHERE `nickName` = '" + nickName + "'");
	const id = data1[0];
	const data2 = await pool.query("INSERT INTO clientaccount(`clientsFK`, `login`, `password`) VALUES (" + id.clientID + ", '" + login + "', '" + password + "')");
	res.redirect('/');
});

var server = app.listen(app.get('port'), function () {
	console.log('1');
    debug('Express server listening on port ' + server.address().port);
});