const express = require('express');
const { resolve } = require('path');
const bcrypt = require('bcryptjs')
const user = require('./user')

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/signUp',async(req,res)=>{
  try{
  const {username,email,password}=req.body
  if(!username || !email ||!password){
    return res.json({message:'All fields are required'})
  }
  const hashedpassword = bcrypt.hash(password,10)
  const newUser= new user({
    ...req.body,
    password:hashedpassword
  })
  await newUser.save()
  res.json({message:'User Created '})
}catch(err){
  res.json({error:err.message})
}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
