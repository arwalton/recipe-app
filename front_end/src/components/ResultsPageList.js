import React from "react";
import { Link } from "react-router-dom";
import '../styles/style.css';

class ResultsPageList extends React.Component{

    render(){
        return(
            <div>
                <h1 className={`has-text-white`}>
                    This is the ResultsPageList.</h1>

                    
                <nav>
                    <Link reloadDocument to="/ingredients"
                          className={`button is-large is-outlined
                                     has-background-success-dark
                                     has-text-white-ter`}>
                              Start over
                    </Link> |{" "}
                </nav>
            </div>
        );
    }
}

export default ResultsPageList;