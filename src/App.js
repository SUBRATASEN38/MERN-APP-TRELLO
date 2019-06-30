import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './components/column';
import { AddList } from './components/addList';
import { g_state, update_state, global_url } from './global/global-state';
import './App.scss';

export class App extends Component {
  global_subscription;
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.global_subscription === undefined) {
      this.global_subscription = g_state.subscribe(data => {
        console.log(data);
        // debugger
        this.setState({ task_list: data.list });
      });
    }
    this.fetchdata();
  }

  fetchdata() {
    fetch(global_url + 'get-list', {
    }).then(response => response.json()).then(data => {
      if (data.response.status === 200) {
        update_state(data.response.result);
      }
    }).catch(error => {
      console.log(error)
    })
  }

  onDragEnd(result) {
    let temp_state = { ...this.state };
    let { source, destination } = result;
    console.log({ source, destination });
    if (destination !== null) {
      let source_and_destination_equel = source.index === destination.index && source.droppableId === destination.droppableId;
      if (!source_and_destination_equel) {
        let source_i = parseInt(source.droppableId.split('list')[1] - 1);
        let destination_i = parseInt(destination.droppableId.split('list')[1] - 1);
        let source_id = temp_state.task_list[source_i]._id;
        let destination_id = temp_state.task_list[destination_i]._id;
        let temp_source_data = temp_state.task_list[source_i].task[source.index];
        let source_data = { ...temp_source_data, ...{ col_id: destination_id } };
        temp_state.task_list[source_i].task.splice(source.index, 1);
        temp_state.task_list[destination_i].task.splice(destination.index, 0, source_data);
        this.setState({ ...temp_state }, () => {
          console.log(destination_id);
          let data = { source_id: source_id, destination_id: destination_id, source_i: source.index, destination_i: destination.index, source_data: source_data };
          console.log(this.state);
          fetch('https://mern-react-trello.herokuapp.com/dd-update-task', {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data),
          }).then(response => response.json()).then(data => {
            console.log(data);
          }).catch(error => {
            console.log(error)
          })
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid py-2">
          <div className="card_holder w-100">
            <div className="d-flex w-100 align-items-start">
              <DragDropContext
                onDragEnd={this.onDragEnd.bind(this)}>
                {this.state.task_list !== undefined ? <Column data={this.state.task_list} /> : null}
              </DragDropContext>
              <AddList />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;