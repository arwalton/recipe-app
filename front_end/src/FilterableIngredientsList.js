import React from "react";
import SearchBar from "./SearchBar";
import SelectedIngredientList from "./SelectedIngredientList";
import IngredientList from "./IngredientList"

class FilterableIngredientsList extends React.Component{
    constructor(props){
        super(props)
    };
    
    render(){
        return(
            <div className={"filterable-ingredients-list"}>
                <SearchBar></SearchBar>
                <SelectedIngredientList selections={this.props.selections}></SelectedIngredientList>
                <IngredientList group="Protein"></IngredientList>
                <IngredientList group="Vegetables"></IngredientList>
                <IngredientList group="Fruits"></IngredientList>
                <IngredientList group="Carbs"></IngredientList>
            </div>
        );
    }
}

export default FilterableIngredientsList;