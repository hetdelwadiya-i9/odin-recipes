let recipeIndex = 0, JSONData, recipeData, lang="en", JSONLang, isSettings = false;

const loadJSON = () => {
       //s3 link: https://odinrecipe-bucket.s3.ap-south-1.amazonaws.com/data.json
       fetch("https://raw.githubusercontent.com/hetdelwadiya-i9/odin-recipes/main/src/data.json")
       .then(res => res.json())
       .then(res => {
              JSONData = res
       })
       .catch(err => console.log(err));

       //load language json
       fetch("https://raw.githubusercontent.com/hetdelwadiya-i9/odin-recipes/main/src/lang.json")
       .then(res => res.json())
       .then(async res => {
              JSONLang = await res;
              loadLangItems();
       })
       .catch(err => console.log(err));
       
}

const loadLangItems = () => {
       document.getElementById("header-a").innerText = JSONLang[lang].about;
       document.getElementById("desc-text").innerText = JSONLang[lang].description;
       document.getElementById("ing-text").innerText = JSONLang[lang].ingredients;
       document.getElementById("steps-text").innerText = JSONLang[lang].steps;
       document.getElementById("settingBtn").innerText = JSONLang[lang].settings;
       document.getElementById("backBtn").innerHTML = '<i class="fa-solid fa-arrow-left"></i> '+JSONLang[lang].back;
}

const loadDataInUI = () => {
       document.getElementById("main-page").className = "hide";
       document.getElementById("footer").className = "text-center bg-black text-white py-5";

       document.getElementById("title").innerText = recipeData.title;
       document.getElementById("description").innerText = recipeData.description;
       document.getElementById("img-src-1").src =recipeData.img[0];
       document.getElementById("img-src-2").src =recipeData.img[1];
       document.getElementById("img-src-3").src =recipeData.img[2];

       let ingredientHTML="";
       recipeData.ingredients.map(item => {
              return ingredientHTML+=`<li>${item}</li>`
       })
       document.getElementById("ingredients").innerHTML=ingredientHTML;

       let stepstHTML="";
       recipeData.steps.map(item => {
              return stepstHTML+=`<li>${item}</li>`
       })
       document.getElementById("steps").innerHTML=stepstHTML;

       document.getElementById("recipe-page").className = "";

}

const handleRecipeClick = (recipe) => {
       if(recipe==="sandwich") {
              recipeIndex=0;
       } else if (recipe==="asparagus") {
              recipeIndex=1;
       } else if (recipe==="cake") {
              recipeIndex=2;
       }
       recipeData = JSONData[recipeIndex]
       loadDataInUI();
}

const handleSettings = (event) => {
       event.preventDefault();
       isSettings=!isSettings
       isSettings ? document.getElementById("settingsArea")?.classList.remove("hide") : document.getElementById("settingsArea")?.classList.add("hide")
}

const handleLangChange = (event) => {
       event.preventDefault();
       lang=document.getElementById("settings-lang").value;
       loadLangItems();
}

loadJSON();

document.getElementById("settings-lang").addEventListener("change", handleLangChange);
document.getElementById("settingBtn").addEventListener("click", handleSettings);
document.getElementById("sandwich").addEventListener("click", () => handleRecipeClick("sandwich"))
document.getElementById("asparagus").addEventListener("click", () => handleRecipeClick("asparagus"))
document.getElementById("cake").addEventListener("click", () => handleRecipeClick("cake"))