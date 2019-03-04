import React from 'react';
import Actions from './Actions/Actions';

handleDeleteItems(e){
    const id = e.target.dataset.key;
    console.log(id)
}

const TodoList = (props) => {
    return (
    <li className="list-group-item-list" data-key={props.key}> {props.text} 
        <span className="close-list" onClick={this.handleDeleteItems.bind(this)}>x</span>
    </li>
    )
}