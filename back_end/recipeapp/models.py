import string
from turtle import back
from sqlalchemy import Column, ForeignKey, Integer, String, Table, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool

Base = declarative_base()

ingredient_substutite = Table (
    'ingredient_substitute', Base.metadata,
    Column('ingredient_id', Integer, ForeignKey('ingredient.id'), index=True),
    Column('substitute_id', Integer, ForeignKey('ingredient.id')),
    UniqueConstraint('ingredient_id', 'substitute_id', name='unique_substitutes')
)

recipe_ingredient = Table('recipe_ingredient', Base.metadata,
    Column('recipe_id', ForeignKey('recipe.id'), primary_key=True),
    Column('ingredient_id', ForeignKey('ingredient.id'), primary_key=True)
)

recipe_category = Table('recipe_category', Base.metadata,
    Column('recipe_id', ForeignKey('recipe.id'), primary_key=True),
    Column('category_id', ForeignKey('category.id'), primary_key=True)
)

ingredient_foodgroup = Table('ingredient_foodgroup', Base.metadata,
    Column('ingredient_id', ForeignKey('ingredient.id'), primary_key=True),
    Column('foodgroup_id', ForeignKey('foodgroup.id'), primary_key=True)
)

class Recipe(Base):
    __tablename__ = 'recipe'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250), nullable=True)
    description = Column(String(2500), nullable=True)
    author = Column(String(250), nullable=True)

    categories = relationship("Category", secondary=recipe_category, backref="recipe", overlaps="categories,recipe")
    ingredients = relationship("Ingredient", secondary=recipe_ingredient, backref="recipe", overlaps="ingredients,recipe")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'description': self.description,
            'author': self.author,
            'id': self.id,
        }


class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250), nullable=True)

    recipes = relationship("Recipe", secondary=recipe_category, backref="category", overlaps="categories,recipe")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'id': self.id,
        }

class Ingredient(Base):
    __tablename__ = 'ingredient'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250), nullable=True)

    recipes = relationship("Recipe", secondary=recipe_ingredient, backref="ingredient", overlaps="ingredients,recipe")
    foodgroups = relationship("FoodGroup", secondary=ingredient_foodgroup, backref="ingredient")
    substitutes = relationship("Ingredient", secondary=ingredient_substutite,
                           primaryjoin=id==ingredient_substutite.c.ingredient_id,
                           secondaryjoin=id==ingredient_substutite.c.substitute_id, overlaps="foodgroup,ingredients")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'id': self.id,
        }

class FoodGroup(Base):
    __tablename__ = 'foodgroup'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    picture = Column(String(250), nullable=True)

    ingredients = relationship("Ingredient", secondary=ingredient_foodgroup, backref="foodgroup", overlaps="foodgroup,ingredients")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'picture': self.picture,
            'id': self.id,
        }


engine = create_engine('sqlite:///recipeapp.db', connect_args={'check_same_thread': False},
                    poolclass=StaticPool)

Base.metadata.create_all(engine)
