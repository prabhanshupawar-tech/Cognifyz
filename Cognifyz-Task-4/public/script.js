const form=document.getElementById("registrationForm");
const password=document.getElementById("password");
const confirmPassword=document.getElementById("confirmPassword");
const strengthBar=document.getElementById("strengthBar");
const passwordStrength=document.getElementById("passwordStrength");

password.addEventListener("input",function(){
    const value=password.value;
    let score=0;

    const hasLength=value.length>=8;
    const hasUppercase=/[A-Z]/.test(value);
    const hasLowercase=/[a-z]/.test(value);
    const hasNumber=/[0-9]/.test(value);
    const hasSpecial=/[^A-Za-z0-9]/.test(value);

    if(hasLength){
        score++;
    }

    if(hasUppercase){
        score++;
    }

    if(hasLowercase){
        score++;
    }

    if(hasNumber){
        score++;
    }

    if(hasSpecial){
        score++;
    }

    document.getElementById("lengthRule")
    .style.textDecoration=hasLength?"line-through":"none";

    document.getElementById("uppercaseRule")
    .style.textDecoration=hasUppercase?"line-through":"none";

    document.getElementById("lowercaseRule")
    .style.textDecoration=hasLowercase?"line-through":"none";

    document.getElementById("numberRule")
    .style.textDecoration=hasNumber?"line-through":"none";

    document.getElementById("specialRule")
    .style.textDecoration=hasSpecial?"line-through":"none";

    strengthBar.style.width=
    `${score*20}%`;

    if(score<=2){
        passwordStrength.textContent=
        "Password strength: Weak";

    }
    
    else if(score<=4){
        passwordStrength.textContent=
        "Password strength :Medium";
    }
    else{
        passwordStrength.textContent=
        "Password strength :Strong";
    }


});

form.addEventListener("submit",function(event){
    event.preventDefault();

   const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const passwordValue =
        document.getElementById("password").value;

    const confirmPasswordValue =
        document.getElementById("confirmPassword").value;

    const age =
        document.getElementById("age").value;

         const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const confirmError =
        document.getElementById("confirmError");

    const ageError =
        document.getElementById("ageError");

        nameError.textContent = "";
    emailError.textContent = "";
    confirmError.textContent = "";
    ageError.textContent = "";

// validation
    let isValid = true;

    if (name.length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        isValid = false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email.";

        isValid = false;
    }

    const passwordIsStrong =
        passwordValue.length >= 8 &&
        /[A-Z]/.test(passwordValue) &&
        /[a-z]/.test(passwordValue) &&
        /[0-9]/.test(passwordValue) &&
        /[^A-Za-z0-9]/.test(passwordValue);

    if (!passwordIsStrong) {

        alert(
            "Password must contain at least 8 characters, " +
            "uppercase, lowercase, number and special character."
        );

        isValid = false;
    }

    if (passwordValue !== confirmPasswordValue) {

        confirmError.textContent =
            "Passwords do not match.";

        isValid = false;
    }

     if (age < 18 || age > 60) {

        ageError.textContent =
            "Age must be between 18 and 60.";

        isValid = false;
    }

    if (!isValid) {
        return;
    }

    //save data
    const userData = {
        name: name,
        email: email,
        age: age
    };

    localStorage.setItem(
        "userData",
        JSON.stringify(userData)
    );

    // update profile DOM

    document.getElementById("profileName")
        .textContent = userData.name;

    document.getElementById("profileEmail")
        .textContent = userData.email;

    document.getElementById("profileAge")
        .textContent =
        `Age: ${userData.age}`;

    navigateTo("profile");

});

const pages=document.querySelectorAll(".page");
function showPage(pageName){
    pages.forEach(page=>{
        page.classList.add("hidden");
    });
    const selectedPage=
    document.getElementById(pageName);
    if(selectedPage){
        selectedPage.classList.remove("hidden");
    }
}

function navigateTo(pageName){
    let path="/";

    if(pageName==="register"){
        path="/register";

    }

    if(pageName==="profile"){
        path="/profile";
    }

    history.pushState(
        {page:pageName},
        "",path
    );
    showPage(pageName);
}

document.querySelectorAll("[data-route]")
    .forEach(element=>{
        element.addEventListener("click",function(event){
            event.preventDefault();
            const pageName=
            this.getAttribute("data-route");
            navigateTo(pageName);
        });
    });

window.addEventListener("popstate",function(){
    const path=window.location.pathname;
    if(path==="/register"){
        showPage("register");

    }else if(path==="/profile"){
        showPage("profile");

    }else{
        showPage("home");

    }
});

function loadInitialPage(){
    const path=window.location.pathname;

    if(path==="/register"){
        showPage("register");
    }else if(path ==="/profile"){
        showPage("profile");
    }else{
        showPage("home");
    }
}

//save data
const savedUser =
    localStorage.getItem("userData");

if (savedUser) {

    const userData =
        JSON.parse(savedUser);

    document.getElementById("profileName")
        .textContent = `Name :${userData.name}`;

    document.getElementById("profileEmail")
        .textContent =`E-mail :${userData.email}` ;

    document.getElementById("profileAge")
        .textContent =
        `Age: ${userData.age}`;
}
loadInitialPage();
