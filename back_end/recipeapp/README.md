# Recipe App

To start the server (console):
> python views.py

To access the back office (browser):
0.0.0.0:5004

Basic Endpoints:
/categories/JSON
/foodgroups/JSON
/ingredients/JSON
/recipes/JSON

/foodgroup/<int:foodgroup_id>/ingredients/JSON
/recipes/<int:recipe_id>/ingredients/JSON
/categories/<int:category_id>/recipes/JSON
/recipes/<int:recipe_id>/JSON

(and more endpoints on the way)