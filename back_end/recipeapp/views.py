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
from models import Base, Recipe, Ingredient, Category

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


# Main page
@app.route('/')
@app.route('/categories/')
def showCategories():
    categories = session.query(Category).order_by(Category.name)
    return render_template('categories.html', categories=categories)


# Show all categories
@app.route('/categories/<int:category_id>/')
def showCategory(category_id):
    category = session.query(Category).filter_by(id=category_id).one()
    categories = session.query(Category).order_by(Category.name)

    return render_template('category.html', category=category, categories=categories, category_id=category.id)


# Create new category
@app.route('/category/new/', methods=['GET', 'POST'])
def newCategory():
    if request.method == 'POST':
        newCategory = Category(name=request.form['name'])
        session.add(newCategory)
        session.commit()
        return redirect(url_for('showCategory', category_id=newCategory.id))
    else:
        categories = session.query(Category).order_by(Category.name)
        return render_template('newCategory.html', categories=categories)


# Edit category
@app.route('/categories/<int:category_id>/edit/', methods=['GET', 'POST'])
def editCategory(category_id):
    edited_category = session.query(Category).filter_by(id=category_id).one()
    if request.method == 'POST':
        if request.form['name']:
            edited_category.name = request.form['name']
            session.add(edited_category)
            session.commit()
            # TODO: flash messages if successful
            return redirect(url_for('showCategory', category_id=edited_category.id))
    else:
        return render_template('editCategory.html', categories=categories,
            category=edited_category)


# Delete category
@app.route('/categories/<int:category_id>/delete/', methods=['GET', 'POST'])
def deleteCategory(category_id):
    categories = session.query(Category).order_by(Category.name)
    category_to_delete = session.query(Category).filter_by(id=category_id).one()

    if request.method == 'POST':
        session.delete(category_to_delete)
        session.commit()
        # TODO: flash on success?
        return redirect(url_for('showCategories'))
    else:
        return render_template('deleteCategory.html', categories=categories,
            category=category_to_delete)


# Create new recipe
@app.route('/categories/<int:category_id>/recipe/new/', methods=['GET', 'POST'])
def newRecipe(recipe_id):
    if request.method == 'POST':
        new_recipe = Recipe(title=request.form['name'],
            description=request.form['description'],
            category_id=category_id)
        session.add(new_recipe)
        session.commit()
        # TODO: flash message on success?
        return redirect(url_for('showCategory', category_id=category_id))
    else:
        categories = session.query(Category).order_by(Category.name)
        return render_template('newRecipe.html', categories=categories,
            category_id=category_id)


# Article page
@app.route('/categories/<int:category_id>/recipe/<int:recipe_id>/')
def showRecipe(category_id, recipe_id):
    category = session.query(Category).filter_by(id=category_id).one()
    categories = session.query(Category).order_by(Category.name)
    recipe = session.query(Recipe).filter_by(id=recipe_id).one()

    return render_template('publicRecipe.html', recipe=recipe,
        category=category, categories=categories)


# Edit recipe
@app.route('/categories/<int:category_id>/recipe/<int:recipe_id>/edit/',
    methods=['GET', 'POST'])
def editArticle(category_id, recipe_id):
    edited_recipe = session.query(Recipe).filter_by(id=recipe_id).one()
    categories = session.query(Category).order_by(Category.name)
    category = session.query(Category).filter_by(id=category_id).one()
    # check if user if allowed to modify the article

    if request.method == 'POST':
        if request.form['title']:
            edited_recipe.title = request.form['title']
        if request.form['description']:
            edited_recipe.description = request.form['description']
        return redirect(url_for('showRecipe', category_id=category.id,
            recipe_id=edited_recipe.id))
    else:
        return render_template('editRecipe.html', category_id=category.id,
            categories=categories, article=edited_recipe)


'''
# Delete article
@app.route('/topics/<int:topic_id>/articles/<int:article_id>/delete/',
           methods=['GET', 'POST'])
def deleteArticle(topic_id, article_id):
    
    article_to_delete = session.query(Article).filter_by(id=article_id).one()
    topics = session.query(Topic).order_by(Topic.name)
    topic = session.query(Topic).filter_by(id=topic_id).one()

    if request.method == 'POST':
        session.delete(article_to_delete)
        session.commit()
        return redirect(url_for('showTopic', topic_id=topic.id))
    else:
        return render_template('deleteArticle.html', topic=topic,
                               topics=topics, article=article_to_delete)


# API endpoints
# List of topics (JSON)
@app.route('/topics/JSON')
def topicsJSON():
    topics = session.query(Topic).all()
    return jsonify(Topics=[i.serialize for i in topics])


# List of articles in topic (JSON)
@app.route('/topics/<int:topic_id>/JSON')
def topicJSON(topic_id):
    articles = session.query(Article).filter_by(topic_id=topic_id).all()
    return jsonify(Articles=[i.serialize for i in articles])


# Article (JSON)
@app.route('/topics/<int:topic_id>/article/<int:article_id>/JSON')
def articleJSON(topic_id, article_id):
    article = session.query(Article).filter_by(id=article_id).one()
    return jsonify(Article=article.serialize)
'''

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
