import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Icon from './images/icon.png';


class App extends Component{
  render() {
    return (
      <div className="panel panel-default">
        {/* <div className="panel-heading"><img className="icon" src={Icon} alt="" /></div> */}
        <div className="panel-body">
          <Router>
          {this.showContent(routes)}
          </Router>
        </div>
    </div>
    );
  }
  
  showContent = (routes) => {
    let result = null;
    if(routes.length > 0){
      result = routes.map((route, index) => {
        return(
            <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
            />
        )
      });
    }
    return <Switch>{result}</Switch>
  }

}

export default App;
