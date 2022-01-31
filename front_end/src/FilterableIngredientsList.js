import React from "react";
import SearchBar from "./SearchBar";
import SelectedIngredientList from "./SelectedIngredientList";
import IngredientGroupList from "./IngredientGroupList";

//App sends ingredients and selections as props in this static version
class FilterableIngredientsList extends React.Component{
     
    render(){
        return(
            <div className={"filterable-ingredients-list"}>
                <SearchBar></SearchBar>
                <SelectedIngredientList selections={this.props.selections}></SelectedIngredientList>
                <IngredientGroupList ingredients={this.props.ingredients}></IngredientGroupList>
            </div>
        );
    }
}

export default FilterableIngredientsList;