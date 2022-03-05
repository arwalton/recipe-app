import React from "react";
import IngredientList from "./IngredientList";
import '../styles/style.css';


//FilterableIngredientsList sends ingredients as a prop
/**
 * @param ingredients - An array of ingredient objects
 * @param filterText - A string of text used to filter ingredients
 * @param onIngredientChange - A function to pass to IngredientList
 */
class IngredientGroupList extends React.Component{

    render(){
        if(this.props.ingredients){
            const GROUPS = [];
            let lastGroup = null;
            const SORTEDINGREDIENTS = JSON.parse(JSON.stringify([...this.props.ingredients]))
            SORTEDINGREDIENTS.sort((a,b)=> {
                if(a.foodgroup < b.foodgroup) {return -1}
                if(b.foodgroup > b.foodgroup) {return 1}
                return 0
            });

            console.log("SORTEDINGREDIENTS:\n" + SORTEDINGREDIENTS);

            for(const ingredient of SORTEDINGREDIENTS){
                console.log(ingredient.foodgroup);
            }
        for(const ingredient of SORTEDINGREDIENTS){
            if(ingredient.foodgroup !== lastGroup){
                GROUPS.push(
                    <IngredientList 
                        foodgroup={ingredient.foodgroup}
                        ingredients={SORTEDINGREDIENTS}
                        filterText={this.props.filterText}
                        key={ingredient.foodgroup}
                        onIngredientChange={this.props.onIngredientChange}
                        />
                )
            }
            lastGroup = ingredient.foodgroup;
        };

        return(
            <div>
                {GROUPS}
            </div>
        );
        }else{
            return(<div>Loading...</div>)
        }
    }
}

export default IngredientGroupList;