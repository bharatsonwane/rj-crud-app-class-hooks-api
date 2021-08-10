import React, { useState } from 'react'
import { Link } from "react-router-dom"
import mdl from "./TaskRetrieveDetail.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'
import { NotificationManager, NotificationContainer } from 'react-notifications';


function TaskRetriveDetail(props) {
    // // ----------Localization hooks & Router Hooks-------------


    // // ----------Props & context & ref ------------------------------
    // // // 1st way => taking task data => using react router
    let task = props.location.state.task
    let tasks = props.location.state.tasks

    const { id, date, title, description, technology, library } = task
    let libraryList = []
    if (library.redux === true) {
        libraryList.push("redux")
    }
    if (library.saga === true) {
        libraryList.push("saga")
    }
    if (library.numpy === true) {
        libraryList.push("numpy")
    }
    if (library.pandas === true) {
        libraryList.push("pandas")
    }


    // // ----------hooks useState--------------------------------------------------
    const [isLoading, setIsLoading] = useState(false)

    // // ----------handler functions--------------------------------------------------
    const deleteTaskToServer = async (id) => {
        let url = "http://localhost:3005/todo/" + id      // url
        let config = {
            method: 'DELETE',                          // POST request
        }
        const request = await fetch(url, config)     // api request call 
        return await request
    }


    const handleDeleteTask = async (id) => {
        setIsLoading(true)
        const response = deleteTaskToServer(id)
            .then(response => response.json())
            .then(async (data) => {
                console.log('Success:', data);
                setIsLoading(false)
                setTimeout(() => {
                    NotificationManager.success("Task Deleted Successfully.", "", 1000)
                }, 500);
                props.history.push(`/task/retrieve`);
            })
            .catch((error) => {
                console.error('Error:', error);
                setIsLoading(false)
                setTimeout(() => {
                    NotificationManager.error("Not able to delete task.", "", 1000)
                }, 500);
            })
    }

    const handleEditTask = (task) => {
        props.history.push(`/task/update/${task.id}`, {
            task: task
        })
    }

    return (
        <React.Fragment>
            <LoadingIndicator show={isLoading} />
            <NotificationContainer />
            <h3>Task Detail</h3>
            <div>
                <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleEditTask(task)} > Edit </button>
                <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => handleDeleteTask(task.id)} > Delete </button>
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
                                {libraryList.map(lib => {
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

export default TaskRetriveDetail
