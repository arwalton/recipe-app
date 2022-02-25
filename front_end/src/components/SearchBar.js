import React from "react";
import recipeStore from "../stores/RecipeStore";
import RecipeStort from "../stores/RecipeStore";
import '../styles/style.css';

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(event) {
    //this.props.onFilterTextChange(event.target.value);
    recipeStore.setFilterText(event.target.value);
    }

    render(){
        return(
            <form action="/"
                  className={"search-bar"}
                  method="get"
                  style={{marginTop: '50px'}}>
                <label htmlFor="ingredient-search" className={"is-sr-only"}>
                    Search for ingredients...
                </label>
                <input
                    type="text"
                    id="ingredient-search"
                    placeholder="Search for ingredients..."
                    valueo={recipeStore.getFilterText()}
                    onChange={this.handleFilterTextChange}
                    className={"input is-large"}
                />
            </form>
        )
    };
}

export default SearchBar;