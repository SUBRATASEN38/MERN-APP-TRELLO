import { global_url } from './global-state';
let add_task = async (props, state) => {
    let col_id = props.column._id;
    return fetch(global_url + 'add-task', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ task: state.form_value, col_id: col_id }),
    })
}

let add_list = async (state) => {
    return fetch(global_url + 'add-list', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ list_name: state.form_value }),
    })
}

let save_list_title = async (heading) => {
    return fetch(global_url + 'update-heading', {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ ...heading }),
    })
}

let save_list_content = async (content) => {
    return fetch(global_url + 'update-task', {
        method: 'put',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ ...content }),
    })
}

let delete_task = async (content) => {
    return fetch(global_url + 'delete-task', {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ ...content }),
    })
}


let delete_list = async (id) => {
    return fetch(global_url + 'delete-list', {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ ...id }),
    })
}


export { add_task, add_list, save_list_title, save_list_content, delete_task, delete_list }