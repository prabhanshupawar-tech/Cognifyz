const productForm=document.getElementById("productForm");
const productId=document.getElementById("productId");
const nameInput=document.getElementById("name");
const priceInput=document.getElementById("price");
const categoryInput=document.getElementById("category");
const productList=document.getElementById("productList");
const cancelBtn=document.getElementById("cancelBtn");

// Get products

async function fetchProducts(){
    try{
        const response=await fetch("/api/products");

        const products= await response.json();

        if(!response.ok){
            console.error(product.message);
            return;
        }

        displayProducts(products);
    }
    catch(error){
        console.error(
            "Error fetching products:",
            error
        );
    }
    
}

// display products

function displayProducts(products) {

    console.log("Displaying products:", products);

    productList.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>

            <p>
                <strong>Price:</strong>
                ₹${product.price}
            </p>

            <p>
                <strong>Category:</strong>
                ${product.category}
            </p>

            <button onclick="editProduct(${product.id})">
                Edit
            </button>

            <button onclick="deleteProduct(${product.id})">
                Delete
            </button>
        `;

        productList.appendChild(card);
    });
}

productForm.addEventListener(
    "submit",
    async function (event) {
        event.preventDefault();

        const data={
            name:nameInput.value.trim(),
            price:Number(priceInput.value),
            category:categoryInput.value.trim()
        };
        if(!data.name||!data.price||!data.category){
            alert(
                "Please enter name,price and category."
            );
            return;
        }

        try{
            let response;

            if(productId.value){
                response=await fetch(
                    `/api/products/${productId.value}`,
                    {
                        method:"PUT",
                        headers:{
                            "content-Type":"application/json"
                        },
                        body:
                        JSON.stringify(data)
                    }
                );
            }
            else{
                response=
                await fetch(
                    "/api/products",
                    {
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"},
                    body:JSON.stringify(data)
                    }
                    
                );
            }
            const result=await response.json();
            console.log("API response:",result);
            

            if(!response.ok){
                alert(result.message);
                return;
            }
            alert(result.message);
            resetForm();
            await fetchProducts();

        }catch(error){
            console.error(
                "Error saving product:",
                error
            );
        }
        
    }
);

// edit product

async function editProduct(id) {
    try{
        const response=
        await fetch(
            `/api/products/${id}`
        );
        const product=
        await response.json();

        if(!response.ok){
            alert(product.message);
            return;
        }
        productId.value=product.id;
        nameInput.value=product.name;
        priceInput.value=product.price;
        categoryInput.value=product.category;

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }catch(error){
        console.error(
            "Error loading product:",
            error
        );
    }
}

    // delete product
    async function deleteProduct(id){
        const confirmed=
        confirm(
            "Are you sure you want to delete this product?"
        );

        if(!confirmed){
            return;
        }

        try{
            const response=
            await fetch(
                `/api/products/${id}`,
                {
                    method:"DELETE"
                }
            );

            const result=
            await response.json();
            
            if(!response.ok){
                alert(result.message);
                result;
            }

            alert(result.message);
            await fetchProducts();

        }catch(error){
            console.error(
                "Error deleting product:",
                error
            );
        }
            
    }

// reset form

function resetForm(){
    productId.value="";
    nameInput.value="";
    priceInput.value="";
    categoryInput.value="";

}

cancelBtn.addEventListener(
    "click",
    resetForm
);
    
    
fetchProducts();