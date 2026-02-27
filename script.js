// ================= RECIPE DATABASE =================

const recipes = [
    {
        name: "Veg Fried Rice",
        ingredients: ["rice", "carrot", "beans", "salt"],
        optionalIngredients: ["soy sauce", "capsicum"],
        cookingTime: 20,
        type: "veg",
        steps: ["Boil rice", "Saute vegetables", "Mix everything", "Cook 5 mins"]
    },
    {
        name: "Omelette",
        ingredients: ["egg", "salt", "oil"],
        optionalIngredients: ["onion", "chilli"],
        cookingTime: 10,
        type: "non-veg",
        steps: ["Beat eggs", "Heat pan", "Cook both sides"]
    },
    {
        name: "Grilled Chicken",
        ingredients: ["chicken", "salt", "pepper"],
        optionalIngredients: ["lemon", "butter"],
        cookingTime: 40,
        type: "non-veg",
        steps: ["Marinate chicken", "Grill 30 mins"]
    },
    {
        name: "Pasta",
        ingredients: ["pasta", "salt", "oil"],
        optionalIngredients: ["cheese", "sauce"],
        cookingTime: 25,
        type: "veg",
        steps: ["Boil pasta", "Add sauce", "Cook 5 mins"]
    },
    {
        name: "Sandwich",
        ingredients: ["bread", "butter"],
        optionalIngredients: ["cheese", "vegetables"],
        cookingTime: 5,
        type: "veg",
        steps: ["Apply butter", "Add filling", "Toast"]
    },
    {
        name: "Upma",
        ingredients: ["rava", "salt", "water"],
        optionalIngredients: ["onion", "carrot"],
        cookingTime: 15,
        type: "veg",
        steps: ["Roast rava", "Add water", "Cook 5 mins"]
    },
    {
        name: "Maggi",
        ingredients: ["maggi", "water"],
        optionalIngredients: ["vegetables", "cheese"],
        cookingTime: 5,
        type: "veg",
        steps: ["Boil water", "Add maggi", "Cook 2 mins"]
    },
    {
        name: "Paneer Curry",
        ingredients: ["paneer", "salt", "oil"],
        optionalIngredients: ["cream", "spices"],
        cookingTime: 30,
        type: "veg",
        steps: ["Cook paneer", "Add masala", "Simmer"]
    },
    {
        name: "Egg Fried Rice",
        ingredients: ["rice", "egg", "salt"],
        optionalIngredients: ["soy sauce", "vegetables"],
        cookingTime: 20,
        type: "non-veg",
        steps: ["Cook egg", "Add rice", "Mix well"]
    },
    {
        name: "Chapati",
        ingredients: ["wheat flour", "water"],
        optionalIngredients: ["salt"],
        cookingTime: 15,
        type: "veg",
        steps: ["Make dough", "Roll", "Cook on pan"]
    },
    {
        name: "Tomato Soup",
        ingredients: ["tomato", "salt", "water"],
        optionalIngredients: ["pepper", "cream"],
        cookingTime: 20,
        type: "veg",
        steps: ["Boil tomato", "Blend", "Simmer"]
    },
    {
        name: "Chicken Curry",
        ingredients: ["chicken", "salt", "oil"],
        optionalIngredients: ["spices", "onion"],
        cookingTime: 50,
        type: "non-veg",
        steps: ["Cook chicken", "Add masala", "Simmer"]
    },
    {
        name: "Salad",
        ingredients: ["cucumber", "carrot", "salt"],
        optionalIngredients: ["lemon"],
        cookingTime: 5,
        type: "veg",
        steps: ["Chop veggies", "Mix", "Serve"]
    },
    {
        name: "French Toast",
        ingredients: ["bread", "egg", "milk"],
        optionalIngredients: ["sugar"],
        cookingTime: 10,
        type: "non-veg",
        steps: ["Dip bread", "Cook both sides"]
    },
    {
        name: "Poha",
        ingredients: ["poha", "salt"],
        optionalIngredients: ["onion", "lemon"],
        cookingTime: 15,
        type: "veg",
        steps: ["Wash poha", "Cook with spices"]
    }
];

// ================= FIND RECIPES FUNCTION =================

function findRecipes() {
    const name = document.getElementById("username").value;
    const inputIngredients = document.getElementById("ingredients")
        .value.toLowerCase()
        .split(",")
        .map(item => item.trim());

    const typeFilter = document.getElementById("typeFilter").value;
    const timeFilter = document.getElementById("timeFilter").value;

    let output = `<h2>Hello ${name} 👋</h2>`;

    recipes.forEach(recipe => {

        if (typeFilter !== "all" && recipe.type !== typeFilter) return;

        if (timeFilter !== "all" && recipe.cookingTime > parseInt(timeFilter)) return;

        const hasExactIngredients = recipe.ingredients.every(item =>
            inputIngredients.includes(item.toLowerCase())
        );

        const hasOptional = recipe.ingredients.filter(item =>
            inputIngredients.includes(item.toLowerCase())
        ).length > 0;

        if (hasExactIngredients || hasOptional) {

            output += `
                <div class="recipe-card">
                    <h3>${recipe.name}</h3>
                    <p><strong>Required:</strong> ${recipe.ingredients.join(", ")}</p>
                    <p><strong>Optional:</strong> ${recipe.optionalIngredients.join(", ")}</p>
                    <p><strong>Cooking Time:</strong> ${recipe.cookingTime} mins</p>
                    <p><strong>Steps:</strong> ${recipe.steps.join(" → ")}</p>
                    <button onclick="saveFavorite('${recipe.name}')">Save to Favorites</button>
                </div>
            `;
        }
    });

    document.getElementById("output").innerHTML = output;
}

// ================= FAVORITES =================

function saveFavorite(recipeName) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(recipeName)) {
        favorites.push(recipeName);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    }
}

function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let html = "";
    favorites.forEach(name => {
        html += `
            <div class="recipe-card">
                <p>${name}</p>
                <button onclick="removeFavorite('${name}')">Remove</button>
            </div>
        `;
    });
    document.getElementById("favorites").innerHTML = html;
}

function removeFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item !== name);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFavorites();
}

displayFavorites();

// ================= FEEDBACK =================

function submitFeedback() {
    const feedback = document.getElementById("feedbackInput").value;
    let feedbackList = JSON.parse(localStorage.getItem("feedback")) || [];
    feedbackList.push(feedback);
    localStorage.setItem("feedback", JSON.stringify(feedbackList));
    displayFeedback();
}

function displayFeedback() {
    let feedbackList = JSON.parse(localStorage.getItem("feedback")) || [];
    let html = "";
    feedbackList.forEach(item => {
        html += `<div class="recipe-card"><p>${item}</p></div>`;
    });
    document.getElementById("feedbackList").innerHTML = html;
}

displayFeedback();
