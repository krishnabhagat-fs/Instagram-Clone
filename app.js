const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
require('./models/user')
//const {MONGOURI} = require('./keys');
//console.log("This is Mongouri",MONGOURI);
app.use(express.json())
app.use(require('./routes/auth'))


const uri = "mongodb+srv://Krish:7Jnip4Q74JTLcR0P@cluster0.og3ng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri,{
    useNewUrlParser: true ,
    useUnifiedTopology :true
});
mongoose.connection.on('connected',()=>
{
    console.log("Connected to mongo db Yeah");
});
mongoose.connection.on('error',(err)=>
{
    console.log("Connected to mongo db Yeah");
});

app.listen(PORT,()=>

{
    console.log('port is active at: ',PORT);
})