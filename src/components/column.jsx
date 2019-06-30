import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { List } from './list';
import { AddTask } from '../components/addTask';
import { ContentEditableHeader } from './contentEditableHeader';
export class Column extends Component {

    render() {
        return (
            this.props.data.map((list, index) => <div key={index} className="card_column">
                <div className="title px-2 pt-2">
                    <ContentEditableHeader list_data={{ list_name: list.list_name, list_id: list._id, list_index: index }} />
                </div>
                <Droppable droppableId={`list${index + 1}`} type={'list'}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <div className="p-2 list_holder">
                                {list.task.map((data, i) =>
                                    <List key={i} drop_id={list.list_name + i} index={i} data={data} list_i={index} />
                                )}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <AddTask column={list} index={index} />
            </div>
            )
        )
    }
}

export default Column;
