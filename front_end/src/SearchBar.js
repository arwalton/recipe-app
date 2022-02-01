import React from "react";

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
            <form action="/" method="get">
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