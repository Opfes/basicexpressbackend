var express = require('express');
var fs = require('fs');

var app = express();

//import recipe data
var data = fs.readFileSync('data.json');
var recipes = JSON.parse(data);

//this needs to be modified slightly to follow the schema they want
app.get('/recipes', alldata)

function alldata(request, response) {
    response.send(recipes);
}

app.get('/recipes/:recipe/', searchRecipe);

//this is the problem, need to know how to address the index values added by default to the indexes under recipes
function searchRecipe(request, response){
    var name = request.params.element;
    var recipeCount = Object.keys(recipes["recipes"]).length;
    console.log(recipes["recipes"].id[0]);

    if(recipes["recipes"]){
        var reply = recipes[name];
    } else {
        var reply = {status: "not found"}
    }

    response.send(reply);
}

app.listen(3000, () => {console.log("Server running on port 3000")});

//https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
//https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm