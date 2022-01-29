import React from "react";

class SelectedIngredientList extends React.Component{

    render(){
        return(
            <div>
                <ul>
                    {this.props.selections.map((selection) => (
                        <li key={selection.id.toString()}>{selection.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default SelectedIngredientList;