import {EventEmitter} from 'events'
import Dispatcher from './Dispatcher/Dispatcher'

class TodoStore extends EventEmitter{
    constructor(){
        super();
        this.todo = []
    }

    createTodo(text){
        const id = new Date().getTime();
        this.todo.push({
            id,
            text,
            satisfy : false
        })
        this.emit("created");
    }

    deleteTodo(id){
        this.todo.splice(this.todo.findIndex(d => d.id == id.trim()), 1);
        this.emit("created");
    }

    getAllTodo(){
        return this.todo;
    }

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

const TodoStor = new TodoStore();
Dispatcher.register(TodoStor.handleActionSet.bind(TodoStor))
// window.Dispatcher = Dispatcher
export default TodoStor