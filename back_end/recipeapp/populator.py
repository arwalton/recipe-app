import json

from flask import Flask
from flask import render_template, redirect, request, url_for, flash, jsonify

# Add CRUD operations
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Recipe, Ingredient, Category, FoodGroup

from sqlalchemy.pool import StaticPool

from flask import make_response


# Create session, connect to db
data = 'sqlite:///recipeapp.db'
engine = create_engine(data, connect_args={'check_same_thread': False}, poolclass=StaticPool)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# Opening JSON file
f = open('recipes.json')

# returns JSON object as a dictionary
data = json.load(f)

# set of ingredients (no repetitions)
ingredients_set = set()
foodgroup_set = set()
category_set = set()
placeholder_url = "url"

# add categories to db
print('adding categories...')
for category in data["categories"]:
    category_set.add(category["name"])
    newCategory = Category(name=category["name"], picture=category["picture"])
    session.add(newCategory)
    session.commit()

check_categories = session.query(Category).all()
for cat in check_categories:
    print(cat.name)

print('categories added')
print()

# add food groups to db
print('adding foodgroups...')
for food_group in data["food_groups"]:
    foodgroup_set.add(food_group["name"])
    newFoodGroup = FoodGroup(name=food_group["name"], picture=food_group["picture"])
    session.add(newFoodGroup)
    session.commit()

check_foodgroups = session.query(FoodGroup).all()
for group in check_foodgroups:
    print(group.name)

print('foodgroups added')
print()

# Iterating through recipes
print('adding recipes and ingredients...')
for recipe in data["recipes"]:
    # adding recipes one by one to Recipe table
    new_recipe = Recipe(name=recipe['name'],
                        picture=recipe['picture'],
                        description=recipe['description'],
                        author=recipe['author'],
                        url=recipe['source'])
    session.add(new_recipe)
    session.commit()

    for categoryName in recipe["categories"]:
        if categoryName not in category_set:
            category_set.add(categoryName)
            newCategory = Category(name=categoryName, picture=placeholder_url)
            session.add(newCategory)
            session.commit()
        category = session.query(Category).filter_by(name=categoryName).one()
        category.recipes.append(new_recipe)
        new_recipe.categories.append(category)
        session.commit()

    #adding ingredients to ingredient set
    for ingredient in recipe["ingredients"]:
        ingredientName = ingredient["name"]
        if ingredientName not in ingredients_set:
            # first time -> add ingredient to DB
            ingredients_set.add(ingredientName)
            ingredientInDb = Ingredient(name=ingredientName,
                                        picture=ingredient["picture"])
            session.add(ingredientInDb)
            session.commit()
        else:
            # already added ingridient before -> query it from DB
            ingredientInDb = session.query(Ingredient).filter_by(name=ingredientName).one()
        # ingredientInDb (from both cases above)
        ingredientInDb.recipes.append(new_recipe)
        new_recipe.ingredients.append(ingredientInDb)
        session.commit()
        if ingredient["food_group"] not in foodgroup_set:
            newFoodGroup = FoodGroup(name=ingredient["food_group"], picture=placeholder_url)
            session.add(newFoodGroup)
            session.commit()
        current_food_groups = session.query(FoodGroup).filter_by(name=ingredient["food_group"]).all()
        for fg in current_food_groups:
            ingredientInDb.foodgroups.append(fg)
            fg.ingredients.append(ingredientInDb)
            session.commit()

check_recipes = session.query(Recipe).all()
for recipe in check_recipes:
    print(recipe.name)

check_ingredients = session.query(Ingredient).all()
for ingredient in check_ingredients:
    print(ingredient.name)

print('recipes added')
print('ingredients added')
print()


# adding substitutes
print('adding substitutes...')
for sub in data["substitutes"]:
    print(sub["i1"] + ' - ' + sub["i2"])
    current_ingredient = sub["i1"]

    if current_ingredient not in ingredients_set:
            ingredients_set.add(current_ingredient)
            ingredientInDb = Ingredient(name=current_ingredient, picture=placeholder_url)
            session.add(ingredientInDb)
            session.commit()

    if(sub["i2"] not in ingredients_set):
        ingredients_set.add(sub["i2"])
        ingredientInDb = Ingredient(name=sub["i2"], picture=placeholder_url)
        session.add(ingredientInDb)
        session.commit()
    current_substitute = session.query(Ingredient).filter_by(name=sub["i2"]).one()
    current_substitute_name = sub["i2"]

    if current_substitute_name not in ingredients_set:
            ingredients_set.add(current_substitute_name)
            ingredientInDb = Ingredient(name=current_substitute_name, picture=placeholder_url)
            session.add(ingredientInDb)
            session.commit()

    print(current_substitute.name)

    ingredientInDB = session.query(Ingredient).filter_by(name=current_ingredient).one()
    print(ingredientInDB.name)
    ingredientInDb.substitutes.append(current_substitute)
    session.commit()

    current_ingredient = sub["i2"]
    print(current_ingredient)
    ingredientInDB = session.query(Ingredient).filter_by(name=current_ingredient).one()
    current_substitute = session.query(Ingredient).filter_by(name=sub["i1"]).one()
    ingredientInDb.substitutes.append(current_substitute)
    session.commit()


# Closing file
f.close()
