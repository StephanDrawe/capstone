const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const url = "mongodb+srv://stephandrawe:okef7aob6vRzjToM@cluster0.jxgk98y.mongodb.net/?retryWrites=true&w=majority"
// var dal = require('./dal.js');

// app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
});


mongoose.connect(url, {
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

    // check if account exists
    Account.find({email: req.body.email}).
    then((users) => {
        // if user exists, return error message
        if(users.length > 0){
            console.log('User already in exists');
            res.send('User already in exists');    
        }
        else{
            // else create user
            const account = new Account({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            account.save();
            res.json(account);
        }

    });

});

// //delete (not used)
// app.delete('/account/delete/:id', async(req, res) => {
//     const result = await Account.findByIdAndDelete(req.params.id);

//     res.json(result);
// });


// login user 
app.get('/account/login/:email/:password', function (req, res) {
    Account.find({email: req.params.email}).
        then((user) => {
        // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
        });
});


//withdraw and deposit
app.patch('/account/update/:email/:balance', async (req, res) => {
    const account = await Account.findOneAndUpdate({email: req.params.email}, {balance: req.params.balance}, {new: true});
    
    account.save();
    res.json(account);
});

// find transfer user 
app.get('/account/transfer/:email', function (req, res) {
    Account.find({email: req.params.email}).
        then((user) => {
        // if user exists, check password
            if(user.length > 0){
                res.send(user[0]);
            }
            else{
                res.send('transfer failed: user not found');
            }
        });
});


app.listen(port);
console.log('Running on port: ' + port);