import React, { useState, useEffect } from 'react'
import mdl from './taskRetrieve.module.css'
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import { usePrevious } from "../../../../helper/customHooks/customHooks"  // custome usePrevious hook
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator';

function TaskRetrieve(props) {
    // // ----------Localization hooks & Router Hooks-------------


    // // ----------Props & context & ref ------------------------------


    // // ----------hooks useState--------------------------------------------------
    const [list, setList] = useState({
        tasks: [],
    })

    const [apiState, setApiState] = useState({
        isLoading: false,
        deleteTask: false,
        retrieveError: null,
        deleteError: null,
    })


    // // ----------hooks useEffect--------------------------------------------------
    useEffect(() => {
        handleRetrieveTask()
    }, [])


    const prevPropsState = usePrevious({ list, apiState })
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.apiState.retrieveError !== apiState.retrieveError && apiState.retrieveError) {
                setTimeout(() => {
                    NotificationManager.error("Not able to retrieve data.", "", 1000)
                }, 500);
            }
            if (prevPropsState.apiState.deleteTask !== apiState.deleteTask && apiState.deleteTask) {
                setTimeout(() => {
                    NotificationManager.success("Task Deleted Successfully.", "", 1000)
                }, 500);
            }
            if (prevPropsState.apiState.deleteError !== apiState.deleteError && apiState.deleteError) {
                setTimeout(() => {
                    NotificationManager.error("Not able to delete task.", "", 1000)
                }, 500);
            }
        }
    }, [list, apiState])


    // // ----------handler functions--------------------------------------------------
    const retrieveTaskListToServer = async (task) => {
        let url = "http://localhost:3005/todo/"      // url
        let config = {
            method: 'GET',                          // GET request
        }
        const request = await fetch(url, config)     // api request call 
        return await request
    }

    const handleRetrieveTask = async () => {
        setApiState({ ...apiState, isLoading: true, retrieveError: null, })
        const response = retrieveTaskListToServer()
            .then(response => response.json())
            .then(data => {
                let taskData = JSON.parse(data)
                setApiState({ ...apiState, isLoading: false, })
                setList({ ...list, tasks: taskData })
            })
            .catch((error) => {
                setApiState({ ...apiState, isLoading: false, retrieveError: error })
            })
    }

    const deleteTaskToServer = async (id) => {
        let url = "http://localhost:3005/todo/" + id      // url
        let config = {
            method: 'DELETE',                          // POST request
        }
        const request = await fetch(url, config)     // api request call 
        return await request
    }

    const handleDeleteTask = async (id) => {
        setApiState({ ...apiState, isLoading: true, deleteTask: false, deleteError: null, })
        const response = deleteTaskToServer(id)
            .then(response => response.json())
            .then(async (data) => {
                apiState.deleteTask = true  // dont want to rerender here so mutating state
                handleRetrieveTask()
            })
            .catch((error) => {
                setApiState({ ...apiState, isLoading: false, deleteError: error })
            })
    }

    const handleEditTask = (task) => {
        props.history.push(`/task/update/${task.id}`, {
            task: task
        })
    }

    const handleTaskDetail = (task) => {
        // // 1st way using props.history
        props.history.push(`/task/detail/${task.id}`, {
            task: task   // single task
        })
    }


    return (
        <React.Fragment>
            <LoadingIndicator show={apiState.isLoading} />
            <NotificationContainer />
            <div className="container">
                {!apiState.isLoading &&
                    <div className="py-4">
                        <h1>Task List</h1>
                        {console.log(list.tasks)}
                        {list.tasks && list.tasks.length > 0 ?
                            <table className={mdl.table_hooks} className="table border shadow">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Sr.NO.</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Data */}
                                    {list.tasks.map((task, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.id}</td>
                                            <td>{task.date}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)} onClick={(e) => handleTaskDetail(task)} >Detail</button>
                                                <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={() => handleEditTask(task)} type="button">Edit</button>
                                                {/* <td><Link to={`/task/update/${task.id}/${task.date}/${task.title}/${task.description}`} type="button" className="btn btn-warning">Edit</Link></td> */}
                                                <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={() => handleDeleteTask(task.id)}> Delete </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <h4>Data is not available</h4>}
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default TaskRetrieve
