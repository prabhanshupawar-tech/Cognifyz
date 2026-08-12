const express=require('express');
const app=express();
const port=3000;

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/submit',(req,res)=>{
    const {name,email}=req.body;
    
    res.render('success',{
        name:name,
        email:email
    });
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});