const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')

router.post('/signup',(req,res)=>
    {
       // console.log(req.body.name)
       const {name,email,password} = req.body
       if(!name || !email || !password){
       res.status(422).json({Error:"Please fill all the fields"})
       }
       User.findOne({email:email})
       .then((savedUser)=>{
           if(savedUser)
           {
               return res.status(422).json({Error:"Please fill all the fields"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>
            {
                const user = new User({
                    email,
                    password:hashedpassword,
                    name
                })
                user.save()
                .then(user=>{
                    res.json({message:"saved sucessfully"})
                })
                .catch(err=>
                    {
                        console.log(err)
                    })
            })
            .catch(err=>
                {
                    console.log(err)
                })
            }
            )
       })
       

router.post('/signin',(req,res)=>
{
    const {email,password} = req.body
    if(!email || !password)
    return res.status(422).json({error:"Please provide email or password"})
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
           return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(domatch=>{
            if(domatch)
            res.json({message:"sucessfully signed in"})
            else
            {
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>
            {
                console.log(err)
            })
    })
}
)     
router.get('/',(req,res)=>
{
    res.send("Hello")
}
)
module.exports = router