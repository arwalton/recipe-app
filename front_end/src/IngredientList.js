import React from "react";
import Ingredient from "./Ingredient";

//IngredientsGroupList sends group and ingredients as a prop
class IngredientList extends React.Component{

    render(){
        const INGREDIENTS = [];
        const FILTERTEXT = this.props.filterText.toLowerCase();

        this.props.ingredients.forEach(ingredient =>{
            if(ingredient.name.toLowerCase().indexOf(FILTERTEXT) === -1){
                return;
            }
            if(ingredient.group === this.props.group){
                INGREDIENTS.push(
                    <Ingredient
                        name={ingredient.name}
                        group={ingredient.group}
                        id={ingredient.id}
                        key={ingredient.id.toString()}
                        onIngredientChange={this.props.onIngredientChange} />
                )
            }
        });

        return(
        <div className={"m-5"}>
            <h2 className={"group-title"}>{this.props.group}</h2>
            <div className={"buttons"}>
                {INGREDIENTS}
            </div>
        </div>
        );
    }
}

export default IngredientList;