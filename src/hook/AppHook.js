import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBarHookBootstrap from './components/navbar/NavBarHookBootstrap';
import Home from "./containers/pages/home/Home"
import About from "./containers/pages/about/About"
import Contact from "./containers/pages/contact/Contact"
import TaskCreate from "./containers/pages/tasks/taskCreate/TaskCreate"
import TaskRetrieve from "./containers/pages/tasks/taskRetrieve/TaskRetrieve"
import TaskUpdate from "./containers/pages/tasks/taskUpdate/TaskUpdate"
import TaskRetriveDetail from './containers/pages/tasks/taskRetrieveDetail/TaskRetriveDetail';
import PageNotFound from './containers/pages/pageNotFound/PageNotFound';

function AppHook() {
    return (
        <BrowserRouter>
            <div className="App">
                <NavBarHookBootstrap />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route path="/task/create" component={TaskCreate} />
                    <Route path="/task/retrieve" component={TaskRetrieve} />
                    <Route path='/task/update/:id' component={TaskUpdate} />
                    <Route path="/task/detail/:id" component={TaskRetriveDetail} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default AppHook
