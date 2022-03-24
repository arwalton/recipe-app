import React from "react";
import SearchBar from "./SearchBar";
import SelectedIngredientList from "./SelectedIngredientList";
import IngredientGroupList from "./IngredientGroupList";
import { Link } from "react-router-dom";
import '../styles/style.css';
import recipeStore from "../stores/RecipeStore";


class FilterableIngredientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            ingredientToChange: {},
            selectedIngredients: [],
            ingredients: []
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleSelectedIngredientsChange = this.handleSelectedIngredientsChange.bind(this);
    }

    // //This a temporary stand-in for a server call
    //     text = `{
    //         "ingredients": [
    //           {
    //             "id": 1,
    //             "group": "Protein",
    //             "name": "Chicken"
    //           },
    //           {
    //             "id": 3,
    //             "group": "Protein",
    //             "name": "Pork"
    //           },
    //           {
    //             "id": 5,
    //             "group": "Protein",
    //             "name": "Eggs"
    //           },
    //           {
    //             "id": 7,
    //             "group": "Vegetable",
    //             "name": "Kale"
    //           },
    //           {
    //             "id": 9,
    //             "group": "Vegetable",
    //             "name": "Carrots"
    //           },
    //           {
    //             "id": 12,
    //             "group": "Fruit",
    //             "name": "Mangos"
    //           },
    //           {
    //             "id": 15,
    //             "group": "Spices",
    //             "name": "Garam Masala"
    //           },
    //           {
    //             "id": 16,
    //             "group": "Spices",
    //             "name": "Basil"
    //           },
    //           {
    //             "id": 17,
    //             "group": "Spices",
    //             "name": "Cayenne Pepper"
    //           },
    //           {
    //             "id": 19,
    //             "group": "Bread, Rice, and Grains",
    //             "name": "White Rice"
    //           },
    //           {
    //             "id": 21,
    //             "group": "Bread, Rice, and Grains",
    //             "name": "Spaghetti"
    //           }
    //         ]
    //       }`

    //       response = JSON.parse(this.text)

    componentDidMount() {
        localStorage.clear();

        //Ingredients
        this.removeIngredientListener = recipeStore.addIngredientListener((state) => {
            this.setState({ ingredients: state });
        })

        //Initial server call to get complete ingredient list
        const axios = require('axios');
        const url = "http://localhost:5006/ingredients/all/JSON";
        axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => {
                recipeStore.setIngredients(res.data.ingredients);
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })

        //Filter text
        this.removeFilterTextListener = recipeStore.addFilterTextListener((state) => {
            this.setState({ filterText: state });
        })

        //SelectedIngredients
        this.removeSelectedIngredientListener = recipeStore.addSelectedIngredientListener((state) => {
            this.setState({ selectedIngredients: state });
        })
    }

    componentWillUnmount() {
        this.removeIngredientListener();
        this.removeFilterTextListener();
        this.removeSelectedIngredientListener();
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    //ingredient is an object that has an id , a group, and a name
    handleSelectedIngredientsChange(ingredientToChange) {
        recipeStore.updateSelectedIngredients(ingredientToChange);
    }

    render() {
        return ( <
            div className = { "filterable-ingredients-list" } >
            <
            h1 className = { "main-text" } >
            What do you want to cook today ?
                <
                /h1> <
            SearchBar / >
            <
            nav >
            <
            Link reloadDocument to = "/ingredients"
            className = {
                "button is-large is-outlined " +
                "has-background-success-dark " +
                "has-text-white-ter"
            } >
            Start over <
            /Link> |{" "} <
            Link to = "/results"
            className = {
                "button is-large is-outlined " +
                "has-background-success-dark " +
                "has-text-white-ter"
            } >
            Get results <
            /Link> < /
            nav > <
            SelectedIngredientList selections = { this.state.selectedIngredients }
            onIngredientChange = { this.handleSelectedIngredientsChange }
            /> <
            IngredientGroupList ingredients = { this.state.ingredients }
            filterText = { this.state.filterText }
            onIngredientChange = { this.handleSelectedIngredientsChange }
            />  <
            div className = "footer" > < p > (c) Recipe Finder App, 2022 < /p> < /div > < /
            div >
        );
    }
}

export default FilterableIngredientsList;