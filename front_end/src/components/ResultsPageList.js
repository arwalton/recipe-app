import React from "react";
import { Link } from "react-router-dom";

import Recipe from "./Recipe";

import '../styles/style.css';

class ResultsPageList extends React.Component{


    text = `{
        "recipes": [
          {
            "id": 1234,
            "name": "Awesome Meal",
            "source": "food.com",
            "author": "Chef Charlie",
            "link": "https://www.food.com/chef-charlie/awesome-meal",
            "percentage": 83,
            "ingredients": [
              {
                "id": 1,
                "group": "Protein",
                "name": "Chicken"
              },
              {
                "id": 15,
                "group": "Spices",
                "name": "Garam Masala"
              }
            ]
          },
          {
            "id": 5678,
            "name": "Bad Meal",
            "source": "food.com",
            "author": "Chef Carrie",
            "link": "https://www.food.com/chef-carrie/bad-meal",
            "percentage": 29,
            "ingredients": [
              {
                "id": 1,
                "group": "Protein",
                "name": "Chicken"
              },
              {
                "id": 15,
                "group": "Spices",
                "name": "Garam Masala"
              }
            ]
          }
        ]
    }`

    response = JSON.parse(this.text);

    render(){
        return(
            <div className={"has-text-white"}>
                <h1>This is the ResultsPageList.</h1>
                <h1>It holds recipe components.</h1>

                <Recipe recipe={this.response.recipes[0]}/>
                <Recipe recipe={this.response.recipes[1]}/>

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