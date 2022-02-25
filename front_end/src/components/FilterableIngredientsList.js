import React from "react";
import SearchBar from "./SearchBar";
import SelectedIngredientList from "./SelectedIngredientList";
import IngredientGroupList from "./IngredientGroupList";
import { Link } from "react-router-dom";
import '../styles/style.css';
import recipeStore from "../stores/RecipeStore";


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
            selectedIngredients:[],
            ingredients: []
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSelectedIngredientsChange = this.handleSelectedIngredientsChange.bind(this);
    }

//This a temporary stand-in for a server call
    text = `{
        "ingredients": [
          {
            "id": 1,
            "group": "Protein",
            "name": "Chicken"
          },
          {
            "id": 3,
            "group": "Protein",
            "name": "Pork"
          },
          {
            "id": 5,
            "group": "Protein",
            "name": "Eggs"
          },
          {
            "id": 7,
            "group": "Vegetable",
            "name": "Kale"
          },
          {
            "id": 9,
            "group": "Vegetable",
            "name": "Carrots"
          },
          {
            "id": 12,
            "group": "Fruit",
            "name": "Mangos"
          },
          {
            "id": 15,
            "group": "Spices",
            "name": "Garam Masala"
          },
          {
            "id": 16,
            "group": "Spices",
            "name": "Basil"
          },
          {
            "id": 17,
            "group": "Spices",
            "name": "Cayenne Pepper"
          },
          {
            "id": 19,
            "group": "Bread, Rice, and Grains",
            "name": "White Rice"
          },
          {
            "id": 21,
            "group": "Bread, Rice, and Grains",
            "name": "Spaghetti"
          }
        ]
      }`
    
      response = JSON.parse(this.text)

    componentDidMount(){
        //Ingredients
        this.removeIngredientListener = recipeStore.addIngredientListener((state) => {
            this.setState(state);
        });
        this.setState({ingredients: recipeStore.getIngredients()});
        //This is where the first call to the server will be
        this.response = JSON.parse(this.text);
        recipeStore.setIngredients(this.response);

        //Filter text
        this.removeFilterTextListener = recipeStore.addFilterTextListener((state) => {
            this.setState({filterText: state});
        })
    }

    componentWillUnmount(){
        this.removeIngredientListener();
        this.removeFilterTextListener();
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
                <SearchBar />
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
                    ingredients={this.state.ingredients}
                    filterText={this.state.filterText}
                    onIngredientChange={this.handleSelectedIngredientsChange}
                />
            </div>
        );
    }
}

export default FilterableIngredientsList;