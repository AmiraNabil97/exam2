let searchContainer = document.getElementById("searchContainer");

let items = document.getElementById("items");

let submit;


function openSideNav() {
    $(".menu").animate({
        left: 0
    }, 500)

    $(".open-close-icon").addClass("fa-x");

    for (let i = 0  ; i < 5; i++) {

        $(".links li").eq(i).animate({
            top: 0

        }, (i + 5) * 50)
    }

}


function closeNav() {

    let boxWidth = $(".menu .nav-tab").outerWidth()

    $(".menu").animate({
        left: -boxWidth
    }, 500)
    $(".open-close-icon").removeClass("fa-x");
    $(".open-close-icon").addClass("fa-align-justify");
    


    $(".links li").animate({
        top: 200
    }, 600)
}

closeNav()

$(".menu i.open-close-icon").click(() => {

    if ($(".menu") .css("left") ==   "0px") {
        closeNav()

    } else {

        openSideNav()
    }
})
$(document).ready(() => {

    searchByName("").then(() => {

        $("body").css("overflow", "visible")
        $(".loading").fadeOut(500)
       

    })
})




function displayMeals(arr) {
    let x = "";

    for (let i = 0; i < arr.length; i++) {
        x += `
        <div class="col-md-3">

                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-3 ">

                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    items.innerHTML = x
}



async function Categories() {
    items.innerHTML = ""
    $(".loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".loading-screen").fadeOut(200)

}

function displayCategories(arr) {
    let x = "";

    for (let i = 0; i < arr.length; i++) {
        x += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-3">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" >
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    items.innerHTML = x
}


async function Area() {
    items.innerHTML = ""

    $(".loading-screen").fadeIn(200)

    searchContainer.innerHTML = "";


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

    respone = await respone.json()

    console.log(respone.meals);

    displayArea(respone.meals)

    $(".loading-screen").fadeOut(200)

}


function displayArea(arr) {
    let x = "";

    for (let i = 0; i < arr.length; i++) { 

        x += `
        <div class="col-md-3">
                <div onclick="AreaMeals('${arr[i].strArea}')" class="rounded-3 text-center">

                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    items.innerHTML = x
}


async function Ingredients() {
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    searchContainer.innerHTML = "";


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()

    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".loading-screen").fadeOut(200)

}


function displayIngredients(arr) {

    let x = "";

    for (let i = 0; i < arr.length; i++) {
        x += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-3 text-center ">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>

                        <h3>${arr[i].strIngredient}</h3>

                        <p>${arr[i].strDescription.split(" ")  .slice(0,20)  .join(" ")}</p>
                         </div>
        </div>
        `
    }

    items.innerHTML = x
}


async function getCategoryMeals(category) {
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(200)

}



async function getAreaMeals(area) {
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(200)
    
}
async function searchByName(term) {
    closeNav()
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(200)

}


async function getIngredientsMeals(ingredients) {
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(200)

}

async function getMealDetails(mealID) {
    closeNav()
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".loading-screen").fadeOut(200)

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let y = meal.texter?.split(",")
    if (!y) y = []

    let tagsStr = ''
    for (let i = 0; i < y.length; i++) {
        texter += `
        <li class="alert alert-danger m-2 p-1">${y[i]}</li>`
    }



    let x = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">

                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>

                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>

                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>

                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags </h3>
                <ul class="list-unstyled d-flex  flex-wrap">
                    ${tagsStr}
                </ul>

                <a href="${meal.strSource}" class="btn btn-success">Source</a>
                <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

            items.innerHTML = x
}


function searchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control  text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)"  class="form-control  text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    items.innerHTML = ""
}



async function searchByFLetter(term) {
    closeNav()
    items.innerHTML = ""
    $(".loading-screen").fadeIn(200)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".loading-screen").fadeOut(200)

}


function Contacts() {
    items.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="Name" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers notallowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailt" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">

                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password  *Minimum eight characters, at least one  letter and onenumber:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">

                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>

            </div>
        </div>

        <button disabled class="btn btn-outline-danger px-3 "  id="submit" >Submit</button>
    </div>
</div> `
    submit = document.getElementById("submit")


    document.getElementById("Name").addEventListener("focus", () => {
        NameTouched = true
    })
    document.getElementById("emailt").addEventListener("focus", () => {
        emailtTouched = true
    })
    document.getElementById("phone").addEventListener("focus", () => {
        phoneTouched = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        ageTouched = true
    })
    document.getElementById("password").addEventListener("focus", () => {
        passwordTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}






function inputsValidation() {
    if (NameTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailtTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageTouched) {

        if (ageValidation()) {

            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {

            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordTouched) {
        if (passwordValidation()) {

            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {

            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submit.removeAttribute("disabled")

    } else {
        submit.setAttribute("disabled", true)
    }
}



function emailValidation() {
    return (/^(([^<>()[\]\\.,\s"]+(\.[^<>()[\]\\.,;:\s]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailt").value))
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("Name").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9]|200)$/.test(document.getElementById("age").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("password").value
}
let nameTouched = false;
let emailtTouched = false;

let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repasswordInputTouched = false;