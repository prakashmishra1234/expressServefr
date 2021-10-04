const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
   res.render('index', {title:"Computer Not Working ?"});
});

app.get('/about', function(req, res){
    res.render('about');
 });

 app.get('/contact', function(req, res){
   res.render('contact');
});

app.post('/contact/send', function(req, res){
   var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
         user: 'sirprakash1234@gmail.com',
         pass: 'Prakash@2001' 
      }
   });

   var mailOptions = {
		from: 'Prakash Mishra <sirprakash1234@gmail.com>',
		to: '1933029@sliet.ac.in',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

   transporter.sendMail(mailOptions, function(error, info){
      if (error){
         console.log('Error '+error);
         res.redirect('/');
      } else{
         console.log('Message sent '+info.response);
         res.redirect('/');
      }
   })
});

app.listen(3000);
console.log('Server running at port 3000.....')