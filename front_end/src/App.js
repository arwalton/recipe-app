import 'bulma/css/bulma.min.css';
import React from 'react';
import FilterableIngredientsList from './FilterableIngredientsList';


class App extends React.Component{
  
  selections = [
    {id: 1, name: "Carrots"},
    {id: 2, name: "Potatoes"},
    {id: 3, name: "Ground beef"},
    {id: 4, name: "Eggs"},
    {id: 5, name: "Onions"}
  ];

  render(){
    return (
      <div className={"App"}>
          <FilterableIngredientsList selections={this.selections}></FilterableIngredientsList>
      </div>
    );
  }
}

export default App;
