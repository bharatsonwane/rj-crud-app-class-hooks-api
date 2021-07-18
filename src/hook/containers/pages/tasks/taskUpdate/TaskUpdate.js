import React from 'react'
import TaskForm from '../taskForm/TaskForm'

function TaskUpdate(props) {
    let taskField = props.location.state.task
    const isTaskUpdate = true
    return (
        <div>
            <TaskForm taskField={taskField} isTaskUpdate={isTaskUpdate} />
        </div>
    )
}

export default TaskUpdate
