import React from "react";
import SearchBar from "./SearchBar";
import SelectedIngredientList from "./SelectedIngredientList";
import IngredientGroupList from "./IngredientGroupList";
import { Link } from "react-router-dom";
import '../styles/style.css';


//App sends ingredients as a prop through IngredientsPage
/**
 * @param ingredients - An array of ingredient objects
 */
class FilterableIngredientsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText: "",
            ingredientToChange: {},
            selectedIngredients:[]
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSelectedIngredientsChange = this.handleSelectedIngredientsChange.bind(this);
    }

    handleFilterTextChange(filterText){
        this.setState({
            filterText: filterText
        });
    }

    //ingredient is an object that has an id , a group, and a name
    handleSelectedIngredientsChange(ingredientToChange){
        this.ids = [];
        this.state.selectedIngredients.forEach(ingredient => {
            this.ids.push(ingredient.id);
        });

        if(this.ids.indexOf(ingredientToChange.id) === -1){
            this.setState(state => {
                const selectedIngredients = [...state.selectedIngredients, ingredientToChange];

                return {
                    selectedIngredients,
                };
            });
        }else{
            this.setState(state =>{
                const selectedIngredients = state.selectedIngredients.filter((ingredient) => {
                    return ingredient.id !== ingredientToChange.id
                });

                return{
                    selectedIngredients,
                };
            });
        };
    }
     
    render(){
        return(
            <div className={"filterable-ingredients-list"}>
                <h1 className={"main-text"}>
                    What Do you want to cook today?
                </h1>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <nav>
                    <Link reloadDocument to="/ingredients"
                          className={"button is-large is-outlined " +
                                     "has-background-success-dark " +
                                     "has-text-white-ter"}>
                              Start over
                    </Link> |{" "}
                    <Link to="/results"
                          className={"button is-large is-outlined " +
                          "has-background-success-dark " +
                          "has-text-white-ter"}>
                              Get results
                    </Link>
                </nav>
                <SelectedIngredientList
                    selections={this.state.selectedIngredients}
                    onIngredientChange={this.handleSelectedIngredientsChange}
                />
                <IngredientGroupList
                    ingredients={this.props.ingredients}
                    filterText={this.state.filterText}
                    onIngredientChange={this.handleSelectedIngredientsChange}
                />
            </div>
        );
    }
}

export default FilterableIngredientsList;