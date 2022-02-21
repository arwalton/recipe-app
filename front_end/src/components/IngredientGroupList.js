import React from "react";
import IngredientList from "./IngredientList";
import '../styles/style.css';


//FilterableIngredientsList sends ingredients as a prop
/**
 * @param ingredients - An array of ingredient objects
 * @param filterText - A string of text used to filter ingredients
 * @param onIngredientChange - A function to pass to IngredientList
 */
class IngredientGroupList extends React.Component{

    render(){
        const GROUPS = [];
        let lastGroup = null;

        for(const ingredient of this.props.ingredients){
            if(ingredient.group !== lastGroup){
                GROUPS.push(
                    <IngredientList 
                        group={ingredient.group}
                        ingredients={this.props.ingredients}
                        filterText={this.props.filterText}
                        key={ingredient.group}
                        onIngredientChange={this.props.onIngredientChange}
                        />
                )
            }
            lastGroup = ingredient.group;
        };

        return(
            <div>
                {GROUPS}
            </div>
        );
    }
}

export default IngredientGroupList;