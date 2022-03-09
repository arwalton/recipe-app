# Author: Kang Lee
# Generation Date: March 9th, 2022

import unittest, json
from back_end.calculation_engine.similarity_calculator import calculate_similarity_score, \
    get_similarity_score_between_two_recipes


class TestSimilarityCalculator(unittest.TestCase):

    def test_calculate_similarity_score(self):
        # Test single tokens case
        single_token_1 = "Beef"
        single_token_2 = "Pork"
        self.assertAlmostEqual(calculate_similarity_score(single_token_1, single_token_2), 0.3507865369319916)

        # Test multiple tokens case
        multiple_token_1 = "Sesame Seeds"
        multiple_token_2 = "Hoisin Sauce"
        self.assertAlmostEqual(calculate_similarity_score(multiple_token_1, multiple_token_2), 0.4062499441206455)

    def test_get_similarity_score_between_two_recipes(self):
        f = open("../../recipeapp/recipes.json", "r", encoding="utf8")
        recipes = (json.load(f))["recipes"]
        self.assertAlmostEqual(get_similarity_score_between_two_recipes(recipes[0], recipes[1]), 0.3766265738299864)


if __name__ == "__main__":
    unittest.main()
