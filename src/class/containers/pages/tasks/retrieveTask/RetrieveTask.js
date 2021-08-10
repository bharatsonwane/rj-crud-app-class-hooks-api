import React, { Component } from 'react'
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import mdl from "./RetrieveTask.module.css"
import { Link } from "react-router-dom"
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import { NotificationManager, NotificationContainer } from 'react-notifications';


class RetrieveTask extends Component {
    // // ----------constructor------------------------------
    constructor(props) {
        super(props)
        // // ----------Props & context & ref ------------------------------


        // // ----------Object Property------------------------------



        // // ----------state------------------------------
        this.state = {
            tasks: [],
            isLoading: false,
            deleteTask: false,
            retrieveError: null,
            deleteError: null,
        }
    }

    // // ----------Lifecycle Method------------------------------
    // async request
    componentDidMount() {
        this.setState({ isLoading: true })
        this.handleRetrieveTask()
    }

    // shouldComponentUpdate() {

    //     return true
    // }

    componentDidUpdate(prevProps, prevState) {
        const { tasks, isLoading, deleteTask, retrieveError, deleteError } = this.state
        console.log(prevState.deleteTask, deleteTask)
        if (prevState.retrieveError !== retrieveError && retrieveError) {
            setTimeout(() => {
                NotificationManager.error("Not able to retrieve data.", "", 1000)
            }, 500);
        }
        if (prevState.deleteTask !== deleteTask && deleteTask) {
            setTimeout(() => {
                NotificationManager.success("Task Deleted Successfully.", "", 1000)
            }, 500);
        }
        if (prevState.deleteError !== deleteError && deleteError) {
            setTimeout(() => {
                NotificationManager.error("Not able to delete task.", "", 1000)
            }, 500);
        }

    }


    // // ----------handler functions--------------------------------------------------
    retrieveTaskListToServer = async (task) => {
        let url = "http://localhost:3005/todo/"      // url
        let config = {
            method: 'GET',                          // GET request
        }

        const request = await fetch(url, config)     // api request call 
        return await request
    }

    handleRetrieveTask = async () => {
        this.setState({ isLoading: true, retrieveError: null, })
        const response = this.retrieveTaskListToServer()
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let taskData = JSON.parse(data)
                this.setState({ isLoading: false, tasks: taskData, })
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ isLoading: false, retrieveError: error, })
            })
    }



    deleteTaskToServer = async (id) => {
        let url = "http://localhost:3005/todo/" + id      // url
        let config = {
            method: 'DELETE',                          // POST request
        }

        const request = await fetch(url, config)     // api request call 
        return await request
    }

    handleDeleteTask = async (id) => {
        this.setState({ isLoading: true, deleteTask: false, deleteError: null, })
        const response = this.deleteTaskToServer(id)
            .then(response => response.json())
            .then(async (data) => {
                console.log('Success:', data);
                this.setState({ deleteTask: true })
                this.handleRetrieveTask()
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ isLoading: false, deleteError: error, })
            })
    }

    handleEditTask = (task) => {
        this.props.history.push(`/task/update/${task.id}`, {
            task: task,
        })
    }

    handleTaskDetail = (tasks, task) => {
        // // 1st way using props.history
        this.props.history.push(`/task/detail/${task.id}`, {
            tasks: tasks, // total task list
            task: task   // single task
        })
    }

    render() {
        const { tasks, isLoading } = this.state
        return (
            <React.Fragment>
                <LoadingIndicator show={isLoading} />
                <NotificationContainer />
                <div className="container">
                    {!isLoading &&
                        <div className="py-4">
                            <h1>Task List</h1>
                            {tasks.length > 0 ? (
                                <table id={mdl.table_class}>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Date</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Detail</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.tasks.map(task => {
                                            return (
                                                <tr key={task.id}>
                                                    <td>{task.id}</td>
                                                    <td>{task.date}</td>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)} onClick={(e) => this.handleTaskDetail(tasks, task)} >Detail</button></td>
                                                    <td><button onClick={(e) => this.handleEditTask(task)} type="button" className="btn btn-warning">Edit</button></td>
                                                    {/* <td><Link to={`/task/update/${task.id}/${task.date}/${task.title}/${task.description}`} type="button" className="btn btn-warning">Edit</Link></td> */}
                                                    <td><button type="button" className="btn btn-danger" onClick={() => this.handleDeleteTask(task.id)}>Delete</button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            ) : <div>Data is not available</div>}
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default RetrieveTask
