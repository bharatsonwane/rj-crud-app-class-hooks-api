import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBarClassBootstrap from "./components/navbarMenu/NavBarClassBootstrap"
import Home from "./containers/pages/home/Home"
import About from "./containers/pages/about/About"
import Contact from "./containers/pages/contact/Contact"
import CreateTask from "./containers/pages/tasks/createTask/CreateTask"
import RetrieveTask from "./containers/pages/tasks/retrieveTask/RetrieveTask"
import UpdateTask from "./containers/pages/tasks/updateTask/UpdateTask"
import RetriveTaskDetail from './containers/pages/tasks/retrieveTaskDetail/RetriveTaskDetail';
import PageNotFound from "./containers/pages/pageNotFount/PageNotFound";


class AppClass extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBarClassBootstrap />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route path="/task/create" component={CreateTask} />
            <Route path="/task/retrieve" component={RetrieveTask} />
            <Route path='/task/update/:id' component={UpdateTask} />
            {/* <Route path='/task/update/:id/:date/:title/:description' component={UpdateTask} /> */}
            <Route path="/task/detail/:id" component={RetriveTaskDetail} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppClass;
