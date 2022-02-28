import 'bulma/css/bulma.min.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/style.css';

class App extends React.Component{
  
  render(){

    return (
    <div className={"App"}>
          <Outlet />
    </div>
    );
  }
}

export default App;
