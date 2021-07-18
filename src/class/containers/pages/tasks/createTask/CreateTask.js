import React, { Component } from 'react'
import FormTask from '../taskForm/FormTask'

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskField: {
                id: "",
                date: "",
                title: "",
                description: "",
                technology: { uiTech: "", backEndTech: "" },
                library: { redux: false, saga: false, numpy: false, pandas: false }
            },
            isTaskUpdate: false
        }
    }

    render() {
        return (
            <div>
                <FormTask history={this.props.history} taskState={this.state} />
            </div>
        )
    }
}

export default CreateTask
