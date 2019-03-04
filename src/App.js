import React, { Component } from 'react';
import Actions from './Components/Actions/Actions'
import TodoStor from './Components/TodoStore';

import logo from './logo.svg';

class App extends Component {
	constructor(){
		super();
		this.state = {
			todoText : "",
			todoData : TodoStor.getAllTodo()
		}
		// Handling event for state changes and event submission
		this.handelChange = this.handelChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDeleteItems = this.handleDeleteItems.bind(this);
	}

	componentWillMount(){
        TodoStor.on("created", () => {
            console.log("Event fired")
			this.setState({
				todoData : TodoStor.getAllTodo()
			})
        })
	}

	// Fetching Todo items with Flux Actions
	fetchAllTodo(){
		Actions.getAllTodo();
	}

	// Handling all event for input field
	handelChange(e){
		this.setState({todoText: e.target.value})
	}

	// Handling all form submission event
	handleSubmit(e){
		e.preventDefault();
		const {todoText} = this.state;
		Actions.createTodo(todoText)
		this.setState({todoText : ""})
	}

	// Handling all items delete event
	handleDeleteItems(e){
		const id = e.target.attributes.keyset.value
		Actions.deleteTodo(id)
	}
	
	render() {
		const {todoData} = this.state
        const todo_list = todoData.map((todos) => { //Mapping every todo items with li element
			return (
				<li className="list-group-item-list" key={todos.id}>
					{todos.text} <span className="close-list" keyset={todos.id} onClick={this.handleDeleteItems}>x</span>
				</li>
			);
		});
		return (
			<section>
				<section className="container">
					<section className="row">
						<section className="col-md-4"></section>
						<section className="col-md-4">
							<section className="logo-container">
								<img src={logo} className="App-logo" alt="logo" />						
							</section>
							<h1 className="text-center">Todo Creator</h1>
							{/* <button className="btn btn-primary" onClick={this.fetchAllTodo.bind(this)}>Load</button> */}
							<form onSubmit={this.handleSubmit}>
								<section className="form-group input-group">
									<input className="form-control input-field-big"
										placeholder="Enter todo item"
										value = {this.state.todoText}
										onChange={this.handelChange} required/>
									<span className="input-group-btn">
										<button className="btn btn-large btn-primary">Add</button>								
									</span>
								</section>
							</form>
							<ul className="list-group">
								{todo_list}
							</ul>
						</section>
						<section className="col-md-4"></section>
					</section>
				</section>
			</section>
		);
  }
}


export default App;