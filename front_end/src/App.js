import 'bulma/css/bulma.min.css';
import React from 'react';
import FilterableIngredientsList from './FilterableIngredientsList';


class App extends React.Component{
  
  ingredients = [
    {group: "Protein", name: "Chicken"},
    {group: "Protein", name: "Beef"},
    {group: "Protein", name: "Pork"},
    {group: "Protein", name: "Tofu"},
    {group: "Protein", name: "Eggs"},
    {group: "Protein", name: "Salmon"},
    {group: "Vegetable", name: "Kale"},
    {group: "Vegetable", name: "Lettuce"},
    {group: "Vegetable", name: "Carrots"},
    {group: "Fruit", name: "Apples"},
    {group: "Fruit", name: "Oranges"},
    {group: "Fruit", name: "Mangos"},
    {group: "Spices", name: "Thyme"},
    {group: "Spices", name: "Cumin"},
    {group: "Spices", name: "Garam Masala"},
    {group: "Spices", name: "Basil"},
    {group: "Spices", name: "Cayenne Pepper"},
    {group: "Spices", name: "Sage"},
    {group: "Bread, Rice, and Grains", name: "White Rice"},
    {group: "Bread, Rice, and Grains", name: "Wheat Bread"},
  ]

  render(){
    return (
      <div className={"App"}>
          <FilterableIngredientsList ingredients={this.ingredients} selections={this.selections}></FilterableIngredientsList>
      </div>
    );
  }
}

export default App;
