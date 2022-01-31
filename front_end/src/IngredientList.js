import React from "react";
import Ingredient from "./Ingredient";

//IngredientsGroupList sends group and ingredients as a prop
class IngredientList extends React.Component{

    render(){
        const ingredients = [];

        this.props.ingredients.forEach(ingredient =>{
            if(ingredient.group === this.props.group){
                ingredients.push(
                    <Ingredient
                        name={ingredient.name}>
                    </Ingredient>
                )
            }
        });

        return(
        <div className={"m-5"}>
            <h2 className={"group-title"}>{this.props.group}</h2>
            <div className={"buttons"}>
                {ingredients}
            </div>
        </div>
        );
    }
}

export default IngredientList;