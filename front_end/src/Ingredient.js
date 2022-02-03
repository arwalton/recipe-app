import React from "react";

//Takes name, group, id, key (if in a list), and onIngredientChange as props
class Ingredient extends React.Component{
    constructor(props){
        super(props);

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
        return(
            <button 
                className={'ingredient button is-large tile is-child'}
                onClick={this.handleClick}>
                {this.props.name}
            </button>
        );
    }
}

export default Ingredient;