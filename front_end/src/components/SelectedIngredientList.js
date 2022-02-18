import React from "react";
import Ingredient from "./Ingredient";
import '../styles/style.css';

//Takes selections and onIngredientChange as props
class SelectedIngredientList extends React.Component{

    render(){
        if(this.props.selections.length > 0){
        return(
            <div className={"buttons selected-ingredient-list"}>
                  {this.props.selections.map((selection) => (
                    <Ingredient
                        name={selection.name}
                        extra={"  X"}
                        group={selection.group}
                        id={selection.id}
                        onIngredientChange={this.props.onIngredientChange}
                        cName={"is-small is-rounded has-background-grey-lighter"}
                        key={selection.name + " selction"}
                        />
                  ))}
            </div>
        );
        }
        else{
            return null;
        }
    }
}

export default SelectedIngredientList;