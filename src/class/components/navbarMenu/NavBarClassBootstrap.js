import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
// import { propTypes } from 'react-bootstrap/esm/Image'
import { NavLink, withRouter } from "react-router-dom"
import mdl from "./NavBarClassBootstrap.module.css"


export class NavBarClassBootstrap extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" exact to="/">Home</NavLink>
                            <NavLink className="nav-link" exact to="/about">About</NavLink>
                            <NavLink className="nav-link" exact to="/contact">Contact</NavLink>

                        </Nav>
                        <Nav>
                            <NavDropdown title="Action" className={mdl.nav_dropdown} id="collasible-nav-dropdown">
                                <NavDropdown.Item><NavLink exact to="/task/retrieve">Retrieve Task</NavLink></NavDropdown.Item>
                                {/* <div onClick={()=>props.history.push("/tasks/list")} >tasklist</div>    */}
                                <NavDropdown.Divider />
                                <NavDropdown.Item><NavLink exact to="/task/create">Create Task</NavLink></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}

export default withRouter(NavBarClassBootstrap)
