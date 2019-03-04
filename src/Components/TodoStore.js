import {EventEmitter} from 'events'
import Dispatcher from './Dispatcher/Dispatcher'

class TodoStore extends EventEmitter{
    constructor(){
        super();
        this.todo = [] //Setting Todo Items to be empty array
    }

    // Method for CREATING TodoStore items
    createTodo(text){
        const id = new Date().getTime();
        this.todo.push({
            id,
            text,
            satisfy : false
        })
        this.emit("created");
    }

    // Method for DELETING Todostore items with index
    deleteTodo(id){
        this.todo.splice(this.todo.findIndex(d => d.id == id.trim()), 1);
        this.emit("created");
    }

    // Method for GETTING all Todostore items
    getAllTodo(){
        return this.todo;
    }

    // Handle actions needed for dispatcher method
    handleActionSet(action){
        switch(action.type){
            case "CREATE_TODO": {
                this.createTodo(action.text)
                break;
            }
            case "DELETE_TODO": {
                this.deleteTodo(action.id)
                break;
            }
            case "FETCH_TODO": {
                this.getAllTodo()
                break;
            }
            default:
                this.getAllTodo()
        }
    }
}

// Create a new instance of TodoStore
const TodoStor = new TodoStore();

// Register dispatcher with the store
Dispatcher.register(TodoStor.handleActionSet.bind(TodoStor))

// Access the dispatcher globally to be use for testing
window.Dispatcher = Dispatcher

// Exporting TodoStore for use
export default TodoStor