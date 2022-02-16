import sys
import random
import string
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
    return jsonify(FoodGroup=[i.serialize for i in foodgroups])

# List of ingredients
@app.route('/ingredients/JSON')
def ingredientsJSON():
    ingredients = session.query(Ingredient).all()
    return jsonify(Ingredient=[i.serialize for i in ingredients])

# List of recipes
@app.route('/recipes/JSON')
def recipesJSON():
    recipes = session.query(Recipe).all()
    return jsonify(Recipe=[i.serialize for i in recipes])

# List of recipes in category (JSON)
@app.route('/categories/<int:category_id>/recipes/JSON')
def recipesInCategoryJSON(category_id):
    recipes = session.query(Recipe).filter_by(category_id=category_id).all()
    return jsonify(Recipes=[i.serialize for i in recipes])


# Recipe (JSON)
@app.route('/categories/<int:category_id>/recipes/<int:recipe_id>/JSON')
def recipeJSON(category_id, recipe_id):
    recipe = session.query(Recipe).filter_by(id=recipe_id).one()
    return jsonify(Recipe=recipe.serialize)


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5004)
