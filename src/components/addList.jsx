import React, { Component } from 'react'
import { add_list } from '../global/main-service';
import { global_state, update_only_state } from '../global/global-state';

export class AddList extends Component {
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

    submitForm() {
        let data = add_list(this.state)
        data.then(response => response.json()).then(data => {
            if (data.response.status === 200) {
                let temp_global_state = { ...global_state };
                temp_global_state.list.push(data.response.result[0]);
                console.log(temp_global_state);
                update_only_state(temp_global_state);
                this.toggle_form();
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="card_column">
                <div className="add_list_holder p-2">
                    {!this.state.add_list ? <button type="button" className="btn btn-secondary btn-block" onClick={() => this.toggle_form()}><i className="fas fa-plus-circle"></i> Add List</button> : null}
                    {this.state.add_list ? <form>
                        <div className="mb-0 form-group">
                            <input className="form-control" id="list_name" type="text" placeholder="Enter List Name" value={this.state.value} onChange={($e) => this.change_form_value($e)} />
                        </div>
                        <div className="mb-0 mt-1 text-right form-group two_btn_form_group">
                            <button type="button" disabled={!this.state.form_valid_required} className="btn btn-info" onClick={() => this.submitForm()}>Sumbit</button>
                            <button type="button" className="btn btn-danger" onClick={() => this.toggle_form()}><i className="fas fa-times-circle"></i></button>
                        </div>
                    </form> : null}
                </div>
            </div>
        )
    }
}

export default AddList
