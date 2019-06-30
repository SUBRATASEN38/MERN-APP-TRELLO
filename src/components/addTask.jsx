import React, { Component } from 'react'
import { add_task } from '../global/main-service';
import { global_state, update_only_state } from '../global/global-state';

export class AddTask extends Component {
    global_subscription;

    constructor() {
        super();
        this.state = {
            add_list: false,
            form_value: '',
            form_valid_required: false
        }
    }

    toggle_form() {
        this.setState(this.state.add_list ? { add_list: false, form_value: '', form_valid_required: false } : { add_list: true });
    }

    change_form_value($e) {
        let value = $e.target.value;
        this.setState({ ...this.state, ...{ form_value: value } });
        if (value !== '' && !this.state.form_valid_required) {
            this.setState({ form_valid_required: true })
        } else if (value === '' && this.state.form_valid_required) {
            this.setState({ form_valid_required: false })
        }
    }

    submitTask() {
        let data = add_task(this.props, this.state);
        data.then(response => response.json()).then(data => {
            if (data.response.status === 200) {
                let temp_global_state = { ...global_state };
                temp_global_state.list.splice(this.props.index, 1);
                temp_global_state.list.splice(this.props.index, 0, data.response.result[0]);
                update_only_state(global_state);
                this.toggle_form();
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="add_task">
                <div className="add_task_holder px-2 pb-2">
                    {!this.state.add_list ? <button type="button" className="btn btn-secondary btn-block text-left p-2" onClick={() => this.toggle_form()}><i className="fas fa-plus-circle"></i> Add Task</button> : null}
                    {this.state.add_list ? <form>
                        <div className="mb-0 form-group">
                            <textarea className="form-control" id="list_name" type="text" placeholder="Enter Task" value={this.state.value} onChange={($e) => this.change_form_value($e)} />
                        </div>
                        <div className="mb-0 mt-1 text-right form-group two_btn_form_group">
                            <button type="button" disabled={!this.state.form_valid_required} className="btn btn-info" onClick={() => this.submitTask()}>Sumbit</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.toggle_form()}><i className="fas fa-times-circle"></i></button>
                        </div>
                    </form> : null}
                </div>
            </div>
        )
    }
}

export default AddTask
