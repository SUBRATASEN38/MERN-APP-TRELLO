import React, { Component } from 'react'
import { save_list_title, delete_list } from '../global/main-service';
import { global_state, update_state } from '../global/global-state';

export class ContentEditableHeader extends Component {
    constructor() {
        super();
        this.headerRef = React.createRef();
        this.state = { cont_edit: false, value: '' };
    }
    editable($e) {
        if ($e.nativeEvent.ctrlKey) $e.preventDefault();
        let title = $e.nativeEvent.target.innerHTML;
        this.setState({ value: title });
    }

    editHeading($e) {
        let title = $e.nativeEvent.target.innerHTML;
        this.setState({ cont_edit: true, value: title }, () => {
            this.headerRef.current.focus();
        });
    }

    saveHeading() {
        this.setState({ cont_edit: false });
        let data = save_list_title({ heading: this.state.value, id: this.props.list_data.list_id });
        data.then(response => response.json()).then(data => {
            if (data.response.status === 200) {
                console.log(data);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    deleteList(index, id) {
        console.log(index);
        console.log(id);
        let deleted_list = delete_list({ id: id });
        deleted_list.then(res => res.json()).then(data => {
            if (data.response.status === 200) {
                this.setState({ cont_edit: false });
                let temp_state = { ...global_state };
                temp_state.list.splice(index, 1);
                update_state(temp_state.list);
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="d-flex justify-content-between align-items-center">
                <h5 dangerouslySetInnerHTML={{ __html: (this.props.list_data.list_name) }} className={`mb-0  ${!this.state.cont_edit ? 'cursor_pointer' : null}`}
                    onClick={($e) => this.editHeading($e)} onKeyUp={($e) => this.editable($e)} onBlur={() => this.saveHeading()}
                    contentEditable={this.state.cont_edit} suppressContentEditableWarning="true" ref={this.headerRef} />

                <i className="text-danger fas fa-times-circle cursor_pointer" onClick={() => this.deleteList(this.props.list_data.list_index, this.props.list_data.list_id)}></i>
            </div>

        )
    }
}

export default ContentEditableHeader
