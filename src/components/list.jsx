import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { ContentEditableTask } from './contentEditableTask';
import { delete_task } from '../global/main-service';
import { global_state, update_state } from '../global/global-state';

export class List extends Component {
    deleteTask(col_id, data) {
        console.log(this.props.list_i);
        console.log(col_id);
        console.log(data);
        let delete_data = { col_id: col_id, task_time_stamp: data.time_stamp }
        let deleted_data = delete_task(delete_data);
        deleted_data.then(res => res.json()).then(data => {
            if (data.response.status === 200) {
                let temp_state = { ...global_state };
                temp_state.list[this.props.list_i].task.splice(this.props.index, 1);
                console.log(temp_state);
                update_state(temp_state.list);
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <Draggable draggableId={`draggable-${this.props.drop_id}`} index={this.props.index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="py-1 list_parent">
                            <div className="list p-2">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0 font-weight-bold">Task</p>
                                    <i className="text-danger fas fa-times-circle cursor_pointer" onClick={() => this.deleteTask(this.props.data.col_id, this.props.data)}></i>
                                </div>
                                <ContentEditableTask task={{ task_content: this.props.data.task, col_id: this.props.data.col_id, index: this.props.index, list_i: this.props.list_i }} />
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default List
