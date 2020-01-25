import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        {/* function that renders the JSX and props with the gog between completed or not. */}
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_name}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td>
            <Link to={"/todos/" + props.todo._id}>Edit</Link>

        </td>
        <td>

            <Link to={"/todos/" + props.todo._id}> Delete</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };


        this.refreshPage = this.refreshPage.bind(this)

    }


    refreshPage() {
        axios.get('https://merntodolistbackend.herokuapp.com/todos/')
            .then(response => {
                this.setState({ todos: response.data });

            })
            .catch(function (error) {
                console.log("Testing for an error:", error);
            })
    }

    componentDidMount() {
        // If the component mounts the page refreshes
        this.refreshPage();



    }

    //maps through the databases and returns each todo
    todoList() {
        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Todo Name</th>
                            <th>Description</th>
                            <th>Completed</th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>

        )
    }
}
