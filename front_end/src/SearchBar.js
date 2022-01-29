import React from "react";

class SearchBar extends React.Component{

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
                    name="s"
                    className={"input is-large"}
                />
            </form>
        )
    };
}

export default SearchBar;