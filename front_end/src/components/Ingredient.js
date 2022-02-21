import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../styles/style.css';

//Takes name, group, id, key (if in a list), and onIngredientChange as props
/**
 * @param name - A string representing the ingredient name
 * @param group - A string representing the ingredient group
 * @param id - An integer representing the ingredient id
 * @param onIngredientChange - A function to change ingredient style on click
 * @param cName - A string representing classNames to add to the object
 * @param icon - A string of a font-awesome icon
 */
class Ingredient extends React.Component{
    constructor(props){
        super(props)
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.ingredientToChange = {
            id: this.props.id,
            group: this.props.group,
            name: this.props.name
        }

        this.props.onIngredientChange(this.ingredientToChange);
    }


    render(){
        let extra = "";
        if(this.props.extra){
            extra = this.props.extra;
        }
        return(
            <button 
                className={'ingredient button ' + this.props.cName }
                onClick={this.handleClick}>
                <span>
                {this.props.name + extra}
                </span>    
            </button>
        );
    }
}

export default Ingredient;