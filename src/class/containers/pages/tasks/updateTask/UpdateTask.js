import React, { Component } from "react";
import FormTask from "../taskForm/FormTask";

class UpdateTask extends Component {
    constructor(props) {
        super(props)
        let task = this.props.location.state.task
        this.state = {
            taskField: task,
            isTaskUpdate: true
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Edit Task</h1>
                <FormTask history={this.props.history} taskState={this.state} />
            </div>
        )
    }
}

export default UpdateTask;
