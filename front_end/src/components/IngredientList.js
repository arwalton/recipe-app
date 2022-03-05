import React from "react";
import Ingredient from "./Ingredient";
import '../styles/style.css';

//IngredientsGroupList sends group and ingredients as a prop
/**
 * @param foodgroup - A string representing the ingredient group
 * @param ingredients - An array of ingredient objects
 * @param filterText - A string of text used to filter ingredients
 * @param onIngredientChange - A function to pass to the Ingredient components
 */
class IngredientList extends React.Component{

    render(){
        const INGREDIENTS = [];
        let filterText = ""
        if(this.props.filterText){
         filterText = this.props.filterText.toLowerCase();
        }

        this.props.ingredients.forEach(ingredient =>{
            if(ingredient.name.toLowerCase().indexOf(filterText) === -1){
                return;
            }
            if(ingredient.foodgroup === this.props.foodgroup || this.props.foodgroup === "Ingredients:"){
                INGREDIENTS.push(
                    <Ingredient
                        name={ingredient.name}
                        group={ingredient.foodgroup}
                        id={ingredient.id}
                        key={ingredient.id.toString()}
                        onIngredientChange={this.props.onIngredientChange}
                        cName="is-medium is-child is-primary is-light is-outlined"
                        icon="" />
                )
            }
        });

        return(
        <div className={"card m-5"}>
            <h2 className={"card-header is-size-3 pl-2"}>{this.props.foodgroup}</h2>
            <div className={"card-content buttons"}>
                {INGREDIENTS}
            </div>
        </div>
        );
    }
}

export default IngredientList;