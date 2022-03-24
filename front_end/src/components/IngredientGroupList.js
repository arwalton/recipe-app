import React from "react";
import IngredientList from "./IngredientList";
import '../styles/style.css';


//FilterableIngredientsList sends ingredients as a prop
/**
 * @param ingredients - An array of ingredient objects
 * @param filterText - A string of text used to filter ingredients
 * @param onIngredientChange - A function to pass to IngredientList
 */
class IngredientGroupList extends React.Component {

        render() {
            if (this.props.ingredients) {
                const GROUPS = [];
                let lastGroup = null;
                const SORTEDINGREDIENTS = JSON.parse(JSON.stringify([...this.props.ingredients]))
                SORTEDINGREDIENTS.sort((a, b) => {
                    if (a.group < b.group) { return -1 }
                    if (b.group > b.group) { return 1 }
                    return 0
                });

                for (const ingredient of SORTEDINGREDIENTS) {
                    if (ingredient.group !== lastGroup && ingredient.group !== "") {
                        GROUPS.push( <
                            IngredientList group = { ingredient.group }
                            ingredients = { SORTEDINGREDIENTS }
                            filterText = { this.props.filterText }
                            key = { ingredient.group }
                            onIngredientChange = { this.props.onIngredientChange }
                            />
                        )
                    }
                    lastGroup = ingredient.group;
                };

                return ( <
                    div > { GROUPS } <
                    /div>
                );
            } else {
                return ( < div > Loading... < /div>)
                }
            }
        }

        export default IngredientGroupList;