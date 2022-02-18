import 'bulma/css/bulma.min.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/style.css';

class App extends React.Component{
  
  text = `{
    "ingredients": [
      {
        "id": 1,
        "group": "Protein",
        "name": "Chicken"
      },
      {
        "id": 2,
        "group": "Protein",
        "name": "Beef"
      },
      {
        "id": 3,
        "group": "Protein",
        "name": "Pork"
      },
      {
        "id": 4,
        "group": "Protein",
        "name": "Tofu"
      },
      {
        "id": 5,
        "group": "Protein",
        "name": "Eggs"
      },
      {
        "id": 6,
        "group": "Protein",
        "name": "Salmon"
      },
      {
        "id": 7,
        "group": "Vegetable",
        "name": "Kale"
      },
      {
        "id": 8,
        "group": "Vegetable",
        "name": "Lettuce"
      },
      {
        "id": 9,
        "group": "Vegetable",
        "name": "Carrots"
      },
      {
        "id": 10,
        "group": "Fruit",
        "name": "Apples"
      },
      {
        "id": 11,
        "group": "Fruit",
        "name": "Oranges"
      },
      {
        "id": 12,
        "group": "Fruit",
        "name": "Mangos"
      },
      {
        "id": 13,
        "group": "Spices",
        "name": "Thyme"
      },
      {
        "id": 14,
        "group": "Spices",
        "name": "Cumin"
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
        "id": 18,
        "group": "Spices",
        "name": "Sage"
      },
      {
        "id": 19,
        "group": "Bread, Rice, and Grains",
        "name": "White Rice"
      },
      {
        "id": 20,
        "group": "Bread, Rice, and Grains",
        "name": "Wheat Bread"
      },
      {
        "id": 21,
        "group": "Bread, Rice, and Grains",
        "name": "Spaghetti"
      }
    ]
  }`

  response = JSON.parse(this.text)

  render(){

    return (
    <div className={"App"}>
      {/* 
          <nav>
            <Link reloadDocument to="/ingredients">Start over</Link> |{" "}
            <Link to="/results">Get results</Link>
          </nav>
      */}
          <Outlet context={this.response.ingredients}/>
    </div>
    );
  }
}

export default App;
