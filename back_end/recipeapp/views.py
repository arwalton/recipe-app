import sys
import random
import string
import math
import json
#from urllib import response
import requests

from flask import Flask
from flask import render_template, redirect, request, url_for, flash, jsonify
from flask_cors import CORS

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
CORS(app) # cross-origin requests

# API endpoints

# List of categories (JSON)
@app.route('/categories/JSON')
def categoriesJSON():
    response = {}
    try:
        categories = session.query(Category).all()
        response = jsonify(Categories=[i.serialize for i in categories])
    except:
        # if any exception -> return empty object
        response = {}
    return response

# List of food groups (JSON)
@app.route('/foodgroups/JSON')
def foodgroupsJSON():
    response = {}
    try:
        foodgroups = session.query(FoodGroup).all()
        response = jsonify(FoodGroups=[i.serialize for i in foodgroups])
    except:
        # if any exception -> return empty object
        response = {}
    return response

# List of ingredients (no foodgroups)
@app.route('/ingredients/JSON')
def ingredientsJSON():
    response = {}
    try:
        ingredients = session.query(Ingredient).all()
        # change headers for cross-origin requests
        response = jsonify(Ingredients=[i.serialize for i in ingredients])
        response.headers.add('Access-Control-Allow-Origin', '*')
    except:
        # if any exception -> return empty object
        response = {}
    return response


# List of ingredients with foodgroups
@app.route('/ingredients/all/JSON')
def ingredientsAndFoodgroupsJSON():
    response = {}
    try:
        ingredients = session.query(Ingredient).all()
        result = {"ingredients": []}
        # for all ingredients create json with foodgroups information
        for ingredient in ingredients:
            foodgroups = session.query(FoodGroup).filter(FoodGroup.ingredients.any(id=ingredient.id)).all()
            current_foodgroups = []
            for fg in foodgroups:
                current_foodgroups.append(fg.name)
            result["ingredients"].append({
                "id": ingredient.id,
                "foodgroup": current_foodgroups,
                "name": ingredient.name
            })
        response = result
    except:
        # if any exception -> return empty object
        response = {}
    return response

# List of recipes by ingredient
@app.route('/get_recipes/JSON', methods=['POST'])
def getRecipesByIngredient():
    response = {}
    try:
        # check request content type
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            # get json from request body
            json = request.get_json()
            result = {"recipes": []}

            # parse ingredients from json
            ingredients = json["ingredients"]
            # save all ingredient names for future reference
            ingredientNames = []
            for ingredient in ingredients:
                ingredientName = ingredient["name"]
                ingredientNames.append(ingredientName)

            # for every selected ingredient
            for ingredient in ingredients:
                ingredientName = ingredient["name"]
                # search for matching recipes by ingredient name
                recipes = session.query(Recipe).filter(Recipe.ingredients.any(name=ingredientName)).all()

                # for every recipe found
                for recipe in recipes:
                    # find all ingredients in the recipe
                    ingredients = session.query(Ingredient).filter(Ingredient.recipes.any(id=recipe.id)).all()
                    # create a list of ingredients for current recipe
                    ingredientsObj = []
                    # count percentage of selected ingredients in the recipe (initialize counter)
                    match = 0
                    # create ingredient objects within the recipe
                    for ingredient in ingredients:
                        # get a foodgroup for every ingredient
                        # TODO: fix the foodgroup issue here
                        foodgroup = session.query(FoodGroup).filter(FoodGroup.ingredients.any(name=ingredient.name)).all()
                        if ingredient.name in ingredientNames:
                            match = match + 1
                        current_ingredient = {
                            "id": ingredient.id,
                            "group": [],
                            "name": ingredient.name
                        }
                        for fg in foodgroup:
                            current_ingredient["group"].append(fg.name)
                        ingredientsObj.append(current_ingredient)
                    # count percentage of selected ingredients in the recipe
                    percentage = int(math.ceil(float(match) / len(ingredientsObj) * 100))
                    # create json
                    result['recipes'].append({
                        "id": recipe.id,
                        "name": recipe.name,
                        "source": recipe.url,
                        "author": recipe.author,
                        "percentage": percentage,
                        "ingredients": ingredientsObj
                    }) 
            response = jsonify(result)
        else:
            response = 'Content-Type not supported!'
    except:
        # if any exception -> return empty object
        response = {}
    return response

# List of of foodgroups for ingredient
@app.route('/get_foodgroup/JSON', methods=['POST'])
def getFoodgroup():
    response = {}
    try:
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            json = request.get_json()
            ingredient = json
            # get foodgroups by ingredient
            foodgroups = session.query(FoodGroup).filter(FoodGroup.ingredients.any(name=ingredient["name"])).all()
            result = {"foodgroups": []}
            for fg in foodgroups:
                result["foodgroups"].append(fg.name)
            response = result
        else:
            response = 'Content-Type not supported!'
    except:
        # if any exception -> return empty object
        response = {}
    return response

# List of substitutes
@app.route('/substitutes/JSON', methods=['POST'])
def getSubstitutes():
    response = {}
    try:
        content_type = request.headers.get('Content-Type')
        if (content_type == 'application/json'):
            json = request.get_json()
            ingredient = json
            print(ingredient)
            result = {
                        "name": ingredient["name"],
                        "substitutes": []
                    }
            substitutes = session.query(Ingredient).filter(Ingredient.substitutes.any(id=ingredient["name"])).all()
            for s in substitutes:
                result["substitutes"].append({
                    "id": s.id,
                    "name": s.name,
                    "ratio": "Can be substituted in equal amount"
                })
            response = jsonify(result)
        else:
            response = 'Content-Type not supported!'
    except:
        response = {}
    return response

# Additional endpoints for future development

# List of ingredients by foodgroup id
@app.route('/foodgroup/<int:foodgroup_id>/ingredients/JSON')
def ingredientsInFoodgroupJSON(foodgroup_id):
    try:
        ingredients = session.query(Ingredient).filter(Ingredient.foodgroups.any(id=foodgroup_id)).all()
        return jsonify(Ingredients=[i.serialize for i in ingredients])
    except:
        return {}

# List of ingredients by recipe id
@app.route('/recipes/<int:recipe_id>/ingredients/JSON')
def ingredientsInRecipeJSON(recipe_id):
    try:
        ingredients = session.query(Ingredient).filter(Ingredient.recipes.any(id=recipe_id)).all()
        return jsonify(Ingredients=[i.serialize for i in ingredients])
    except:
        return {}

# List of all recipes (no ingredients)
@app.route('/recipes/JSON')
def recipesJSON():
    try:
        recipes = session.query(Recipe).all()
        return jsonify(Recipes=[i.serialize for i in recipes])
    except:
        return {}

# List of recipes by category id
@app.route('/categories/<int:category_id>/recipes/JSON')
def recipesInCategoryJSON(category_id):
    try:
        recipes = session.query(Recipe).filter(Recipe.categories.any(id=category_id)).all()
        return jsonify(Recipes=[i.serialize for i in recipes])
    except:
        return {}

# Recipe by id (JSON)
@app.route('/recipes/<int:recipe_id>/JSON')
def recipeJSON(recipe_id):
    try:
        recipe = session.query(Recipe).filter_by(id=recipe_id).one()
        return jsonify(Recipe=recipe.serialize)
    except:
        return {}


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5006)
