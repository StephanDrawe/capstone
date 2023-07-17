const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3001;
// var dal = require('./dal.js');

app.use(express.static('badbank'));
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/badbank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log('connected to DB'))
    .catch(console.error);

const Account = require('./models/Account.js');

// all data
app.get('/account/allData', async (req, res) => {
    const allData = await Account.find();

    res.json(allData);
});

//create account
app.post('/account/create', (req, res) => {
    const account = new Account({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    account.save();

    res.json(account);
});

// //delete (not used)
// app.delete('/account/delete/:id', async(req, res) => {
//     const result = await Account.findByIdAndDelete(req.params.id);

//     res.json(result);
// });

// login
app.get('/account/login/:id', async (req, res) => {
    const account = await Account.findById(req.params._id);

    res.json(account);
});

// //withdraw and deposit
// app.patch('/account/update/:id', async (req, res) => {
//     const account = await Account.findById(req.params.id);

//     account.balance = res.body.account;

//     account.save();

//     res.json(account);
// });


// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// // create user account
// app.get('/account/create/:name/:email/:password', function (req, res) {

//   // check if account exists
//   dal.find(req.params.email).
//       then((users) => {

//           // if user exists, return error message
//           if(users.length > 0){
//               console.log('User already in exists');
//               res.send('User already in exists');    
//           }
//           else{
//               // else create user
//               dal.create(req.params.name,req.params.email,req.params.password).
//                   then((user) => {
//                       console.log(user);
//                       res.send(user);            
//                   });            
//           }

//       });
// });


// // login user 
// app.get('/account/login/:email/:password', function (req, res) {

//   dal.find(req.params.email).
//       then((user) => {

//           // if user exists, check password
//           if(user.length > 0){
//               if (user[0].password === req.params.password){
//                   res.send(user[0]);
//               }
//               else{
//                   res.send('Login failed: wrong password');
//               }
//           }
//           else{
//               res.send('Login failed: user not found');
//           }
//   });
  
// });

// // find user account
// app.get('/account/find/:email', function (req, res) {

//   dal.find(req.params.email).
//       then((user) => {
//           console.log(user);
//           res.send(user);
//   });
// });

// // find one user by email - alternative to find
// app.get('/account/findOne/:email', function (req, res) {

//   dal.findOne(req.params.email).
//       then((user) => {
//           console.log(user);
//           res.send(user);
//   });
// });


// // update - deposit/withdraw amount
// app.get('/account/update/:email/:amount', function (req, res) {

//   var amount = Number(req.params.amount);

//   dal.update(req.params.email, amount).
//       then((response) => {
//           console.log(response);
//           res.send(response);
//   });    
// });

// // all accounts
// app.get('/account/all', function (req, res) {

//   dal.all().
//       then((docs) => {
//           console.log(docs);
//           res.send(docs);
//   });
// });

app.listen(port);
console.log('Running on port: ' + port);