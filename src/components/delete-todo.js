import React, { Component } from 'react';
import axios from "axios";

export default class deleteTodo extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            //intializes the state
            todo_name: '',
            todo_description: '',

        }
    }
    componentDidMount() {
        axios.get('https://merntodolistbackend.herokuapp.com/todos/' + this.props.match.params.id)
            //get request to the backend "server" for the todolist
            .then(response => {
                this.setState({
                    //sets the state with the original properties
                    todo_name: response.data.todo_name,
                    todo_description: response.data.todo_description,
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onSubmit(e) {
        alert("Todo Deleted");
        e.preventDefault();
        const obj = {
            todo_name: this.state.todo_name,
            todo_description: this.state.todo_description,
        };
        axios.delete("https://merntodolistbackend.herokuapp.com/todos/" + this.props.match.params.id, obj)
            //deletes our todo in the backend by matching the id and using the onsubmit object
            .then(res => console.log(res.data));
        this.setState({
            //here we reset the state after submitting
            todo_name: '',
            todo_description: '',
            //this.props.history.push('/');
        }
        )
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" className="form-control" value={this.state.todo_name} onChange={this.onChangeTodoName}>
                        </input>
                    </div>
                    <div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeTodoDescription}>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">

                            <input type="submit" value="Delete Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
