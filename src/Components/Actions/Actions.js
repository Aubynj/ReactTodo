import Dispatcher from '../Dispatcher/Dispatcher';

export default {
    createTodo : function(text){
        Dispatcher.dispatch({
            type : "CREATE_TODO",
            text,
            id : new Date().getTime()
        })
    },
    deleteTodo : function(id) {
        Dispatcher.dispatch({
            type : "DELETE_TODO",
            id 
        })
    },
    getAllTodo : function() {
        Dispatcher.dispatch({
            type : "FETCH_TODO"
        })
    }
}