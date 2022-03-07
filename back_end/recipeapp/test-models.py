import unittest

from sqlalchemy import Column, ForeignKey, Integer, String, Table, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref, Session, sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from models import Recipe, Category, Ingredient, FoodGroup
from sample_records import sample_recipe_dict, sample_food_group_dict, sample_category_dict, sample_ingredient_dict

Base = declarative_base()
engine = create_engine('sqlite:///recipeapp.db', connect_args={'check_same_thread': False},
    poolclass=StaticPool)
db_session = sessionmaker(bind=engine)


class TestRecipe(unittest.TestCase):
    target_recipe = Recipe(**sample_recipe_dict)

    def test_recipe_serialize(self):
        self.assertEqual(self.target_recipe.serialize, sample_recipe_dict)


class TestCategory(unittest.TestCase):
    target_category = Category(**sample_category_dict)

    def test_category_serialize(self):
        self.assertEqual(self.target_category.serialize, sample_category_dict)


class TestIngredient(unittest.TestCase):
    target_ingredient = Ingredient(**sample_ingredient_dict)

    def test_ingredient_serialize(self):
        self.assertEqual(self.target_ingredient.serialize, sample_ingredient_dict)


class TestFoodGroup(unittest.TestCase):
    target_food_group = FoodGroup(**sample_food_group_dict)

    def test_food_group_serialize(self):
        self.assertEqual(self.target_food_group.serialize, sample_food_group_dict)


class TestQuery(unittest.TestCase):
    is_setup = False
    session = None
    metadata = None

    recipe = Recipe(**sample_recipe_dict)
    category = Category(**sample_category_dict)
    ingredient = Ingredient(**sample_ingredient_dict)
    food_group = FoodGroup(**sample_food_group_dict)

    def setUp(self):
        if not self.__class__.is_setup:
            self.__class__.session = db_session()
            self.metadata = Base.metadata
            self.metadata.bind = engine
            self.metadata.drop_all()
            self.metadata.create_all()
            self.__class__.session.add_all([self.recipe, self.category, self.ingredient, self.food_group])
            self.__class__.session.commit()
            self.__class__.is_setup = True

    def tearDown(self):
        if self.__class__.is_setup:
            self.__class__.session.close()

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def test_query_recipe(self):
        expected = [self.recipe]
        result = self.session.query(self.recipe).filter(self.recipe.id == 0).first()
        self.assertEqual(result, expected)

    def test_query_category(self):
        expected = [self.category]
        result = self.session.query(self.category).filter(self.category.id == 1).first()
        self.assertEqual(result, expected)

    def test_query_ingredient(self):
        expected = [self.ingredient]
        result = self.session.query(self.ingredient).filter(self.ingredient.id == 2).first()
        self.assertEqual(result, expected)

    def test_query_food_group(self):
        expected = [self.food_group]
        result = self.session.query(self.food_group).filter(self.food_group.id == 3).first()
        self.assertEqual(result, expected)


if __name__ == "__main__":
    unittest.main()
