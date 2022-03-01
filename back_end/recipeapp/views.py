import sys
import random
import string
import math
import json
import requests

from flask import Flask
from flask import render_template, redirect, request, url_for, flash, jsonify

# Add CRUD operations
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Recipe, Ingredient, Category, FoodGroup

from flask import session as login_session
from sqlalchemy.pool import StaticPool

import httplib2
from flask import make_response

# Create session, connect to db

data = 'sqlite:///recipeapp.db'
engine = create_engine(data, connect_args={'check_same_thread': False}, poolclass=StaticPool)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = Flask(__name__, static_folder='static')

# API endpoints
# List of categories (JSON)
@app.route('/categories/JSON')
def categoriesJSON():
    categories = session.query(Category).all()
    return jsonify(Categories=[i.serialize for i in categories])

# List of food groups (JSON)
@app.route('/foodgroups/JSON')
def foodgroupsJSON():
    foodgroups = session.query(FoodGroup).all()
    return jsonify(FoodGroups=[i.serialize for i in foodgroups])

# List of ingredients
@app.route('/ingredients/JSON')
def ingredientsJSON():
    ingredients = session.query(Ingredient).all()
    return jsonify(Ingredients=[i.serialize for i in ingredients])

# List of ingredients with foodgroups
@app.route('/ingredients/all/JSON')
def ingredientsAndFoodgroupsJSON():
    ingredients = session.query(Ingredient).all()
    result = {}
    for ingredient in ingredients:
        foodgroup = session.query(FoodGroup).filter(FoodGroup.ingredients.any(id=ingredient.id)).one()
        result.add({
            "id": ingredient.id,
            "foodgroup": foodgroup.name,
            "name": ingredient.name
        })
    return result

# List of recipes by ingredient
@app.route('/getrecipes/JSON', methods=['POST'])
def getRecipesByIngredient():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.get_json()
        ingredients = json["ingredients"]
        result = {"recipes": []}
        ingredientNames = []
        for ingredient in ingredients:
            ingredientName = ingredient["name"]
            ingredientNames.append(ingredientName)

        for ingredient in ingredients:
            ingredientName = ingredient["name"]
            recipes = session.query(Recipe).filter(Recipe.ingredients.any(name=ingredientName)).all()

            for recipe in recipes:
                ingredients = session.query(Ingredient).filter(Ingredient.recipes.any(id=recipe.id)).all()
                ingredientsObj = []
                match = 0
                for ingredient in ingredients:
                    foodgroup = session.query(FoodGroup).filter(FoodGroup.ingredients.any(id=ingredient.id)).one()
                    if ingredient.name in ingredientNames:
                        match = match + 1
                    ingredientsObj.append({
                        "id": ingredient.id,
                        "group": foodgroup.name,
                        "name": ingredient.name
                    })
                print("match " + str(match))
                print("ingredients " + str(len(ingredientsObj)))
                percentage = int(math.ceil(float(match) / len(ingredientsObj) * 100))
                result['recipes'].append({
                    "id": recipe.id,
                    "name": recipe.name,
                    "source": recipe.url,
                    "author": recipe.author,
                    "percentage": percentage,
                    "ingredients": ingredientsObj
                })
        return jsonify(result)
    else:
        return 'Content-Type not supported!'

@app.route('/substitutes/JSON', methods=['POST'])
def getSubstitutes():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.get_json()
        ingredient = json
        print(ingredient)
        result = {
                    "id": ingredient["id"],
                    "name": ingredient["name"],
                    "substitutes": []
                }
        substitutes = session.query(Ingredient).filter(Ingredient.substitutes.any(id=ingredient["id"])).all()
        for s in substitutes:
            result["substitutes"].append({
                "id": s.id,
                "name": s.name,
                "ratio": "Can be substituted in equal amount"
            })
        return jsonify(result)
    else:
        return 'Content-Type not supported!'


@app.route('/ingredients')
def listOfIngredients():
    ingredients = request.args.get('ingredients')
    print(ingredients)

# List of ingredients in foodgroup by id
@app.route('/foodgroup/<int:foodgroup_id>/ingredients/JSON')
def ingredientsInFoodgroupJSON(foodgroup_id):
    ingredients = session.query(Ingredient).filter(Ingredient.foodgroups.any(id=foodgroup_id)).all()
    return jsonify(Ingredients=[i.serialize for i in ingredients])

# List of ingredients in recipe by id
@app.route('/recipes/<int:recipe_id>/ingredients/JSON')
def ingredientsInRecipeJSON(recipe_id):
    ingredients = session.query(Ingredient).filter(Ingredient.recipes.any(id=recipe_id)).all()
    return jsonify(Ingredients=[i.serialize for i in ingredients])

# List of recipes
@app.route('/recipes/JSON')
def recipesJSON():
    recipes = session.query(Recipe).all()
    return jsonify(Recipes=[i.serialize for i in recipes])

@app.route('/recipes/JSON')
def testJSON():
    recipes = session.query(Recipe).all()
    return jsonify(Recipes=[i.serialize for i in recipes])

# List of recipes in category by id
@app.route('/categories/<int:category_id>/recipes/JSON')
def recipesInCategoryJSON(category_id):
    recipes = session.query(Recipe).filter(Recipe.categories.any(id=category_id)).all()
    return jsonify(Recipes=[i.serialize for i in recipes])

# Recipe (JSON)
@app.route('/recipes/<int:recipe_id>/JSON')
def recipeJSON(recipe_id):
    recipe = session.query(Recipe).filter_by(id=recipe_id).one()
    return jsonify(Recipe=[i.serialize for i in recipe])


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5006)
