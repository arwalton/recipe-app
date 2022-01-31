import React from "react";
import IngredientList from "./IngredientList"

//FilterableIngredientsList sends ingredients as a prop

class IngredientGroupList extends React.Component{

    render(){
        const groups = [];
        let lastGroup = null;

        this.props.ingredients.forEach(ingredient => {
            if(ingredient.group !== lastGroup){
                groups.push(
                    <IngredientList 
                        group={ingredient.group}
                        ingredients={this.props.ingredients}>
                    </IngredientList>
                )
            }
            lastGroup = ingredient.group;
        });

        return(
            <div>
                {groups}
            </div>
        );
    }
}

export default IngredientGroupList;