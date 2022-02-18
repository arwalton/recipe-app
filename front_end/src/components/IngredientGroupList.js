import React from "react";
import IngredientList from "./IngredientList";
import '../styles/style.css';


//FilterableIngredientsList sends ingredients as a prop

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