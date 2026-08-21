const express=require("express");
const app=express();
const PORT=3000;

app.use(express.json());
app.use(express.static("public"));

let products=[{
    id:1,
    name:"Laptop",
    price:55000,
    category:"Electronic",
    },
    {
    id:2,
    name:"Radio",
    price:5000,
    category:"Electronic",  
    },
    {
       id:3,
    name:"Headphone",
    price:10000,
    category:"Accessories",
    },
    {
    id:4,
    name:"speaker",
    price:10000,
    category:"Audio",
    }
];
app.get("/api/products", (req, res) => {

    res.json(products);

});
app.get("/api/products/:id",(req,res)=>{
    const id=Number(req.params.id);
    const foundproduct=products.find(product=>product.id===id);
    if(!foundproduct){
        return res.status(404).json({
            message:"Product not found"
        });
    }
    res.json(foundproduct);
    });

app.post("/api/products",(req,res)=>{
    const{
        name,
        price,
        category,

    } =req.body;

    if(!name||!price||!category){
        return res.status(400).json({
            message:"Name,price and category are required"
        });

    }
    const newProduct={
        id:
        products.length>0
             ?products[products.length-1].id+1
             :1,

        name: name,

        price: Number(price),

        category: category

    };

    products.push(newProduct);
      console.log("Updated products:", products);
    res.status(201).json({
        message:"Product created successfully",
        product:newProduct
    });
});

app.put("/api/products/:id",(req,res)=>{
    const id=Number(req.params.id);
    const product=products.find(product=>product.id===id);
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }

    const{
        name,
        price,
        category,

    }= req.body;

    if (name !== undefined) {
        product.name = name;
    }

    if (price !== undefined) {
        product.price = Number(price);
    }

    if (category !== undefined) {
        product.category = category;
    }
    res.json({
        message:"Product updated successfully",
        product:"product"
    });


});

app.delete("/api/products/:id",(req,res)=>{
    const id=Number(req.params.id);
    const productIndex=product.findIndex(
        product=>product.id===id
    );

    if(productIndex===-1){
        return res.status(404).json({
            message:"Product not found"
        });
    }

    const deletedProduct=
        product.splice(productIndex,1)[0];

    res.json({
        message:"Product deleted successfully",
        product:deletedProduct
    });
});

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
});