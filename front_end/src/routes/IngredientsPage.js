import { useOutletContext } from "react-router-dom";
import FilterableIngredientsList from "../FilterableIngredientsList";

export default function ResultsList() {
    const ingredients = useOutletContext();
    return (
      <FilterableIngredientsList 
        ingredients={ingredients}/>
    );
}