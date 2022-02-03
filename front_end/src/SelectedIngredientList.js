import React from "react";
import Ingredient from "./Ingredient"

//Takes selections and onIngredientChange as props
class SelectedIngredientList extends React.Component{

    render(){
        return(
            <div>
                  {this.props.selections.map((selection) => (
                    <Ingredient
                        name={selection.name}
                        group={selection.group}
                        id={selection.id}
                        onIngredientChange={this.props.onIngredientChange}
                        />
                  ))}
            </div>
        );
    }
}

export default SelectedIngredientList;