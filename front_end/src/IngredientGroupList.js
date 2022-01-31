import React from "react";
import IngredientList from "./IngredientList"

//FilterableIngredientsList sends ingredients as a prop

class IngredientGroupList extends React.Component{

    render(){
        const GROUPS = [];
        let lastGroup = null;

        this.props.ingredients.forEach(ingredient => {
            if(ingredient.group !== lastGroup){
                GROUPS.push(
                    <IngredientList 
                        group={ingredient.group}
                        ingredients={this.props.ingredients}
                        filterText={this.props.filterText}
                        key={ingredient.group} />
                )
            }
            lastGroup = ingredient.group;
        });

        return(
            <div>
                {GROUPS}
            </div>
        );
    }
}

export default IngredientGroupList;