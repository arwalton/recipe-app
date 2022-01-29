import string
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool

Base = declarative_base()

class Recipe(Base):
    __tablename__ = 'recipe'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250))
    description = Column(String(2500), nullable=False)
    calories = Column(Integer, nullable=False)

    categories = relationship("Category", secondary="recipe_category")
    ingredients = relationship("Ingredient", secondary="recipe_ingredient")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'description': self.description,
            'calories': self.calories,
            'id': self.id,
        }


class Ingredient(Base):
    __tablename__ = 'ingredient'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250))

    recipe = relationship("Recipe", secondary="recipe_ingredient")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'id': self.id,
        }

class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250))

    recipe = relationship("Recipe", secondary="recipe_category")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'id': self.id,
        }

class RecipeIngredient(Base):
    __tablename__ = 'recipe_ingredient'
    recipe_id = Column(Integer, ForeignKey('recipe.id'), primary_key=True)
    ingredient_id = Column(Integer, ForeignKey('ingredient.id'), primary_key=True)

class RecipeCategory(Base):
    __tablename__ = 'recipe_category'
    recipe_id = Column(Integer, ForeignKey('recipe.id'), primary_key=True)
    category_id = Column(Integer, ForeignKey('category.id'), primary_key=True)

engine = create_engine('sqlite:///recipeapp.db', connect_args={'check_same_thread': False},
                    poolclass=StaticPool)

Base.metadata.create_all(engine)
