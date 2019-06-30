import React, { Component } from 'react'
import { save_list_content } from '../global/main-service';
import { global_state, update_state } from '../global/global-state';

export class ContentEditableTask extends Component {
    constructor() {
        super();
        this.taskRef = React.createRef();
        this.state = { cont_edit: false, value: '' };
    }
    editable($e) {
        if ($e.nativeEvent.ctrlKey) $e.preventDefault();
        let title = $e.nativeEvent.target.innerHTML;
        this.setState({ value: title });
    }
    editTask($e) {
        let value = $e.nativeEvent.target.innerHTML;
        this.setState({ cont_edit: true, value: value }, () => {
            this.taskRef.current.focus();
        });
    }

    saveTask() {
        console.log(this.state);
        let data = save_list_content({ content: this.state.value, id: this.props.task.col_id, index: this.props.task.index });
        data.then(response => response.json()).then(data => {
            if (data.response.status === 200) {
                this.setState({ cont_edit: false });
                let temp_state = { ...global_state };
                let temp_task = { ...global_state.list[this.props.task.list_i].task[this.props.task.index], ...{ task: this.state.value } }
                temp_state.list[this.props.task.list_i].task.splice(this.props.task.index, 1);
                temp_state.list[this.props.task.list_i].task.splice(this.props.task.index, 0, temp_task);
                console.log(temp_state);
                update_state(temp_state.list);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <p dangerouslySetInnerHTML={{ __html: (this.props.task.task_content) }} className={`mb-0 ${!this.state.cont_edit ? 'cursor_pointer' : null}`}
                onClick={($e) => this.editTask($e)} onKeyUp={($e) => this.editable($e)} onBlur={() => this.saveTask()}
                contentEditable={this.state.cont_edit} suppressContentEditableWarning="true" ref={this.taskRef} />
        )
    }
}

export default ContentEditableTask
