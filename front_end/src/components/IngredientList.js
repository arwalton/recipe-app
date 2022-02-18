import React from "react";
import Ingredient from "./Ingredient";
import '../styles/style.css';

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
                        onIngredientChange={this.props.onIngredientChange}
                        cName="is-medium is-child is-primary is-light is-outlined"
                        icon="" />
                )
            }
        });

        return(
        <div className={"card m-5"}>
            <h2 className={"card-header is-size-3 pl-2"}>{this.props.group}</h2>
            <div className={"card-content buttons"}>
                {INGREDIENTS}
            </div>
        </div>
        );
    }
}

export default IngredientList;