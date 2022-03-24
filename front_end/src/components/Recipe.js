import React from "react";
import { Link } from "react-router-dom";
import IngredientList from "./IngredientList";

/**
 * @param recipe - a recipe object
 * @param recipe.id - a unique integer id
 * @param recipe.name - a string name for the recipe
 * @param recipe.source - a string representing the source (website)
 * @param recipe.author - a string representing the name of the author
 * @param recipe.link - a string representing the link to the recipe
 * @param recipe.percentage - a number representing what percent of the ingredients were selected
 * @param recipe.ingredients - an array of ingredient objects
 */
class Recipe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( <
            div className = { `
                        box
                        has-background-white-ter` } >
            <
            div className = { "columns is-vcentered" } >
            <
            div className = { `recipe-percentage
                                     has-text-centered
                                     has-background-success
                                     box
                                     m-2
                                     column 
                                     is-one-fifth` } > { this.props.recipe.percentage } % < /div> <
            h2 className = { `title
                                    has-text-centered
                                    column
                                    pb-3` } > { this.props.recipe.name } < /h2> < /
            div >

            <
            img className = { "recipe-image" }
            src = { this.props.recipe.picture }
            />  <
            div className = "recipe-info" >
            <
            p className = { "subtitle" } > { this.props.recipe.description } < /p > <
            p className = { "subtitle" } > Author: { this.props.recipe.author } < /p> <
            p className = { "subtitle" } > Source:
            <
            a href = { this.props.recipe.source }
            target = "_blank"
            rel = "noreferrer" > { this.props.recipe.source } <
            /a> < /
            p >
            <
            /div> <
            IngredientList group = { "Ingredients:" }
            ingredients = { this.props.recipe.ingredients }
            filterText = { "" }
            onIngredientChange = {
                () => {}
            }
            /> < /
            div >
        );
    }
}

export default Recipe;