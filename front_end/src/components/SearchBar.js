import React from "react";
import '../styles/style.css';

/**
 * @param filterText - A string representing the text to filter ingredients with
 * @param onFilterTextChange - A function to handle text entered into the search bar
 */
class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(event) {
    this.props.onFilterTextChange(event.target.value);
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
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                    className={"input is-large"}
                />
            </form>
        )
    };
}

export default SearchBar;