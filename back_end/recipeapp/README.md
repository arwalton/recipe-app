# Recipe App

To start the server (console):
> python views.py

To access the back office (browser):
0.0.0.0:5006

MVP Endpoints:
/ingredients/all/JSON - (GET) get all ingredients with information about foodgroups
/get_recipes/JSON - (POST) get recipes by the list of ingredients
/get_foodgroup/JSON - (GET) get all foodgroups by ingredient name
/substitutes/JSON - get substitutes for ingredient

(Refer to wiki for JSON format examples)

Basic Endpoints:
/categories/JSON
/foodgroups/JSON
/ingredients/JSON
/recipes/JSON

Get by id:
/foodgroup/<int:foodgroup_id>/ingredients/JSON
/recipes/<int:recipe_id>/ingredients/JSON
/categories/<int:category_id>/recipes/JSON
/recipes/<int:recipe_id>/JSON
