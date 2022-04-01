# Author: Kang Lee
# Generation Date: March 9th, 2022

import en_core_web_sm

import math

MODEL = en_core_web_sm.load()


def calculate_similarity_score(word_first, word_second):
    '''
    Generate similarity score between two words. Comparison of single token words is done by using direct comparison
    from the model. Comparison of multiple token words is done by averaging model scores of all combinations between
     two multiple token words.

    :param word_first: A space separated word, e.g. Beef Sirloin Tips
    :param word_second: A space separated word, e.g. Basmati rice
    :return: A similarity score between two words. (from 0 to 1) e.g. 0.234, 0.999, 1.0, etc.
    '''
    tokens_first_length = len(word_first.split(" "))
    tokens_second_length = len(word_second.split(" "))
    sum_of_similarity_score = math.nan
    sum_of_score_count = 0
    all_tokens = MODEL(word_first + " " + word_second)
    tokens_first = all_tokens[:tokens_first_length]
    tokens_second = all_tokens[tokens_second_length:]

    for token_in_first in tokens_first:
        for token_in_second in tokens_second:
            if math.isnan(sum_of_similarity_score):
                sum_of_similarity_score = token_in_first.similarity(token_in_second)
            else:
                sum_of_similarity_score += token_in_first.similarity(token_in_second)
            sum_of_score_count += 1

    return sum_of_similarity_score / sum_of_score_count


def get_similarity_score_between_two_recipes(recipe_object_first, recipe_object_second):
    '''
    Generate similarity score between two recipes. Sum the similarity scores from all the combinations of individual
    ingredients and take the arithmetic average.

    :param recipe_object_first:
    :param recipe_object_second:
    :return: A similarity score between two recipes. (from 0 to 1) e.g. 0.234, 0.999, 1.0, etc.
    '''
    sum_of_similarity_ingredients = math.nan
    sum_of_score_count = 0

    if not recipe_object_first["ingredients"] or not recipe_object_second["ingredients"]:
        return math.nan

    for ingredient_first in recipe_object_first["ingredients"]:
        for ingredient_second in recipe_object_second["ingredients"]:
            similarity_score = calculate_similarity_score(ingredient_first["name"], ingredient_second["name"])
            if math.isnan(sum_of_similarity_ingredients):
                sum_of_similarity_ingredients = similarity_score
            else:
                sum_of_similarity_ingredients += similarity_score
            sum_of_score_count += 1

    return sum_of_similarity_ingredients / sum_of_score_count
