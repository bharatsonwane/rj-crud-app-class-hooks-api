import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import mdl from "./RetrieveTaskDetail.module.css"
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import { NotificationManager, NotificationContainer } from 'react-notifications';

export class RetriveTaskDetail extends Component {
    // // ----------constructor------------------------------
    constructor(props) {
        super(props)
        // // ----------Props & context & ref ------------------------------
        this.task = props.location.state.task
        this.tasks = props.location.state.tasks
        console.log("tasks:", this.tasks, "task:", this.task)

        const { library } = this.task
        this.libraryList = []
        if (library.redux === true) {
            this.libraryList.push("redux")
        }
        if (library.saga === true) {
            this.libraryList.push("saga")
        }
        if (library.numpy === true) {
            this.libraryList.push("numpy")
        }
        if (library.pandas === true) {
            this.libraryList.push("pandas")
        }


        // // ----------Object Property------------------------------



        // // ----------state------------------------------
        this.state = {
            isLoading: false
        }
    }


    // // ----------handler functions--------------------------------------------------
    deleteTaskToServer = async (id) => {
        let url = "http://localhost:3005/todo/" + id      // url
        let config = {
            method: 'DELETE',                          // POST request
        }

        const request = await fetch(url, config)     // api request call 
        return await request
    }

    handleDeleteTask = async (id) => {
        this.setState({ isLoading: true })
        const response = this.deleteTaskToServer(id)
            .then(response => response.json())
            .then(async (data) => {
                console.log('Success:', data);
                this.setState({ isLoading: false })
                setTimeout(() => {
                    NotificationManager.success("Task Deleted Successfully.", "", 1000)
                }, 500);
                this.props.history.push(`/task/retrieve`);
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ isLoading: false })
                setTimeout(() => {
                    NotificationManager.error("Not able to delete task.", "", 1000)
                }, 500);
            })
    }

    handleEditTask = (task) => {
        this.props.history.push(`/task/update/${task.id}`, {
            task: task,
        })
    }

    render() {
        const { id, date, title, description, technology, library } = this.task
        return (
            <React.Fragment>
                <LoadingIndicator show={this.state.isLoading} />
                <NotificationContainer />
                <h3>Task Detail</h3>
                <div>
                    <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                    <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => this.handleEditTask(this.task)} > Edit </button>
                    <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => this.handleDeleteTask(this.task.id)} > Delete </button>
                </div>
                <div className={mdl.container}>
                    <table >
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{date}</td>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <td>{title}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{description}</td>
                            </tr>
                            <tr>
                                <th>UI Technology</th>
                                <td>{technology.uiTech}</td>
                            </tr>
                            <tr>
                                <th>Back End Technology</th>
                                <td>{technology.backEndTech}</td>
                            </tr>
                            <tr>
                                <th>Library Used</th>
                                <td>
                                    {this.libraryList.map(lib => {
                                        let para = <span>{lib}, </span>
                                        return para
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default RetriveTaskDetail
