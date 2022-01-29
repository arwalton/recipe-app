import React from "react";

class Ingredient extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <button className={'ingredient button is-large tile is-child is-2'}>
                {this.props.name}
            </button>
        );
    }
}

export default Ingredient;