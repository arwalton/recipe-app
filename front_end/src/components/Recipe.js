import React from "react";

class Recipe extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div
            className={`has-text-white
                        m-3`}>
                <h2>This is a Recipe Component</h2>
                <p>Percentage: {this.props.recipe.percentage} %</p>
                <h2>Name: {this.props.recipe.name}</h2>
                <h2>Author: {this.props.recipe.author}</h2>
                <h2>Source: {this.props.recipe.source}</h2>
                <div>Ingredientlist component</div>
            </div>
        );
    }
}

export default Recipe;