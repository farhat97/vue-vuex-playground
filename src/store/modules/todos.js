import axios from 'axios';

const state = {
    todos: [ ]    
};

const getters = {
    allTodos: (state) => state.todos

};

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos'
        );

        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post(
            'https://jsonplaceholder.typicode.com/todos', 
            { title, completed: false }
        );

        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },
    async filterTodos({ commit }, limit) {
        // get selected number to filter
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
        );
        commit('filteredTodos', response.data);
    },
    async updateTodo({ commit }, updatedTodo) {
        const response = await axios.put(
            `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
            updatedTodo
        );

        console.log(response.data);
        commit('updateTodo', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    filteredTodos: (state, todos) => (state.todos = todos),
    updateTodo: (state, updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);

        if(index !== -1) {
            state.todos.splice(index, 1, updatedTodo);
        }
    }
};

// technically, you would do "state: state, getters: getters".. and so on
// since they are called the same, we can omit the value part
export default {
    state,
    getters,
    actions,
    mutations
};