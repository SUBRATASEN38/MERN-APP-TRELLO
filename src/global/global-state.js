import { BehaviorSubject } from 'rxjs';
let global_state = {}
// let global_url = 'https://mern-react-trello.herokuapp.com/';
let global_url = 'http://localhost:3000/';

let g_state = new BehaviorSubject(global_state);

let update_state = (data) => {
    global_state = { ...global_state, list: data };
    g_state.next(global_state);
    console.log(data);
}

let update_only_state = (data) => {
    g_state.next(data);
}

export { global_state, update_state, update_only_state, g_state, global_url }