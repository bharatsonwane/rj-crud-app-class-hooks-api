import React from 'react'
import TaskForm from '../taskForm/TaskForm'

function TaskCreate() {

    const taskField = {
        id: "",
        date: "",
        title: "",
        description: "",
        technology: { uiTech: "", backEndTech: "" },
        library: { redux: false, saga: false, numpy: false, pandas: false }
    }
    
    const isTaskUpdate = false

    return (
        <div>
            <TaskForm taskField={taskField} isTaskUpdate={isTaskUpdate} />
        </div>
    )
}

export default TaskCreate
