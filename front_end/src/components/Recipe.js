import React from "react";
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
class Recipe extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div
            className={`has-text-white
                        m-3`}>
                <h2>This is a Recipe Component.</h2>
                <h2>It takes props from ResultsPageList to populate its data.</h2>
                <h2>It also holds an ingredientList component</h2>
                <p>Percentage: {this.props.recipe.percentage} %</p>
                <h2>Name: {this.props.recipe.name}</h2>
                <h2>Author: {this.props.recipe.author}</h2>
                <h2>Source: {this.props.recipe.source}</h2>
                <IngredientList 
                    group={"Ingredients:"}
                    ingredients={this.props.recipe.ingredients}
                    filterText={""}
                    onIngredientChange={()=>{}}/>
            </div>
        );
    }
}

export default Recipe;