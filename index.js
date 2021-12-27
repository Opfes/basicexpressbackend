var express = require('express');
var fs = require('fs');

var app = express();

//import recipe data
var data = fs.readFileSync('data.json');
var recipes = JSON.parse(data);

//this needs to be modified slightly to follow the schema they want
app.get('/recipes', alldata)

function alldata(request, response) {

    var recipeCount = Object.keys(recipes["recipes"]).length;
    var nameArray = [];

    for(i = 0; i < recipeCount; i++){
        nameArray.push(recipes["recipes"][i].name);
    }

    response.send({"recipeNames":nameArray});
}

app.get('/recipes/:recipe/', searchRecipe);


function searchRecipe(request, response){
    var name = request.params.recipe;
    var recipeCount = Object.keys(recipes["recipes"]).length;

    for(i = 0; i < recipeCount; i++){
        if(recipes["recipes"][i].name===name){
            var ingredients = recipes["recipes"][i].ingredients;
            var stepCount = Object.keys(recipes["recipes"][i].instructions).length;
            var reply = {"details":{"ingredients":ingredients,"numSteps":stepCount}}
            break;
        } else {
            var reply = {}
        }
    }

    response.send(reply);
}

app.listen(3000, () => {console.log("Server running on port 3000")});

//https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
//https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm