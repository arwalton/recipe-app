import React from "react";
import SearchBar from "./SearchBar";
import SelectedIngredientList from "./SelectedIngredientList";
import IngredientGroupList from "./IngredientGroupList";

//App sends ingredients as a prop
class FilterableIngredientsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //Make sure filterText handles cases
            filterText: "",
            selectedIngredients: [
                {id: 1, name: "Carrots"},
                {id: 2, name: "Lettuce"},
                {id: 3, name: "Beef"},
                {id: 4, name: "Eggs"},
                {id: 5, name: "White Rice"}
            ]
        }
    }
     
    render(){
        return(
            <div className={"filterable-ingredients-list"}>
                <SearchBar
                    filterText={this.state.filterText}
                />
                <SelectedIngredientList
                    selections={this.state.selectedIngredients}
                />
                <IngredientGroupList
                    ingredients={this.props.ingredients}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}

export default FilterableIngredientsList;