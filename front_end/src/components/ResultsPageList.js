import React from "react";
import { Link } from "react-router-dom";

import Recipe from "./Recipe";

import '../styles/style.css';
import recipeStore from "../stores/RecipeStore";
import Ingredient from "./Ingredient";

class ResultsPageList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: []
    }
  }


  // //This is a temporary stand-in for a server call
  //   text = `{
  //       "recipes": [
  //         {
  //           "id": 1234,
  //           "name": "Awesome Meal",
  //           "source": "food.com",
  //           "author": "Chef Charlie",
  //           "link": "https://www.food.com/chef-charlie/awesome-meal",
  //           "percentage": 83,
  //           "ingredients": [
  //             {
  //               "id": 1,
  //               "group": "Protein",
  //               "name": "Chicken"
  //             },
  //             {
  //               "id": 15,
  //               "group": "Spices",
  //               "name": "Garam Masala"
  //             }
  //           ]
  //         },
  //         {
  //           "id": 5678,
  //           "name": "Bad Meal",
  //           "source": "food.com",
  //           "author": "Chef Carrie",
  //           "link": "https://www.food.com/chef-carrie/bad-meal",
  //           "percentage": 29,
  //           "ingredients": [
  //             {
  //               "id": 1,
  //               "group": "Protein",
  //               "name": "Chicken"
  //             },
  //             {
  //               "id": 15,
  //               "group": "Spices",
  //               "name": "Garam Masala"
  //             }
  //           ]
  //         }
  //       ]
  //   }`

  //   response = JSON.parse(this.text);

    componentDidMount(){
      this.removeRecipeListener = recipeStore.addRecipeListener((state) => {
        this.setState(state);
      });
     // this.setState({recipes: recipeStore.getRecipes()});

      if(localStorage.getItem('selectedIngredients') !== null){
        console.log(localStorage.getItem('selectedIngredients'))
        recipeStore.setSelectedIngredients(JSON.parse(localStorage.getItem("selectedIngredients")));
      }
      
      //This is where the server call will live
      const axios = require("axios");
      const url = "http://localhost:5006/get_recipes/JSON";
      const selectedIngredients = recipeStore.getSelectedIngredients();
      const data = {
        "ingredients": []
      }
      for(const ingredient of selectedIngredients){
        data.ingredients = [...data.ingredients, {"name":ingredient.name}];
      }
      axios.post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        console.log(res.data)
        recipeStore.setRecipes(res.data)
        console.log(recipeStore.getRecipes())
      })


      // this.response = JSON.parse(this.text);
      // recipeStore.setRecipes(this.response);


    }

    componentWillUnmount(){
      this.removeRecipeListener();
    }

    render(){
      const RECIPES = [];

      for(const recipe of this.state.recipes){
        RECIPES.push(
          <Recipe recipe={recipe}
                  key={recipe.id.toString()} />
        )
      }
        return(
            <div className={"results-page-list has-text-white"}>
                <h1 className={'main-text recipe-header pb-5'}>Here are some recipe ideas for you!</h1>

                {RECIPES}

                {/* <Recipe recipe={this.response.recipes[0]}/>
                <Recipe recipe={this.response.recipes[1]}/> */}

                <nav>
                    <Link reloadDocument to="/ingredients"
                          className={`button is-large is-outlined
                                     has-background-success-dark
                                     has-text-white-ter`}>
                              Start over
                    </Link> {" "}
                </nav>
            </div>
        );
    }
}

export default ResultsPageList;