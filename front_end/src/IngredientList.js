import React from "react";
import Ingredient from "./Ingredient";


class IngredientList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div className={"m-5"}>
            <h2 className={"group-title"}>{this.props.group}</h2>
            <div className={"buttons"}>
                <Ingredient name="test1"></Ingredient>
                <Ingredient name="test2"></Ingredient>
                <Ingredient name="test3"></Ingredient>
                <Ingredient name="test4"></Ingredient>
                <Ingredient name="test5"></Ingredient>
                <Ingredient name="test6"></Ingredient>
                <Ingredient name="test7"></Ingredient>
                <Ingredient name="test8"></Ingredient>
            </div>
        </div>
        );
    }
}

export default IngredientList;