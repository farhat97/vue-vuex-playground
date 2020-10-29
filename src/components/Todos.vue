<template>
    <div>
        <h3> Todos </h3>
        <div class="legend">
            <span>Double click to mark as complete </span>
            <span>
                <span class="incomplete-box"></span> = Incomplete
            </span>
            <span>
                <span class="complete-box"></span> = Complete
            </span>
        </div>
        
        <div class="todos">
            <div 
                v-for="todo in allTodos"
                @dblclick="onDblClick(todo)" 
                v-bind:key="todo.id" 
                class="todo"
                v-bind:class="{'is-complete':todo.completed}">
                {{ todo.title }}
                <font-awesome-icon icon="trash" class="icon" v-on:click="deleteTodo(todo.id)"/>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Todos",
    computed: mapGetters(['allTodos']),
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
        onDblClick(todo) {
            const updatedTodo = {
                ...todo,
                completed: !todo.completed
            }

            this.updateTodo(updatedTodo);
        }
    },
    created() {
        this.fetchTodos();
    }
}
</script>

<style scoped>
.todos
{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo
{
    border: 1px solid #ccc;
    background: #07db83;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
}
.icon
{
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
    font-size: 13px;
}
.legend
{
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
}
.complete-box
{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #35495e;
}
.is-complete
{
    background: #545c59;
    color: #fff;
}
.incomplete-box
{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #07db83;
}
@media (max-width: 500px)
{
    .todos
    {
        grid-template-columns: 1fr;
    }
}
</style>