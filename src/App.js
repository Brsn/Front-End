import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import CreateTodo from "./components/create-todo";
import EditTodo from "./components/edit-todo";
import TodosList from "./components/todos-list";
import deleteTodo from "./components/delete-todo";

class App extends Component {
  render() {
    return (
      <Router>

        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand"></Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/todos" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact component={TodosList} />
          <Route path="/components/:id" component={EditTodo} />
          <Route path="/todos" component={CreateTodo} />
          <Route path="/component/:id" component={deleteTodo} />
        </div>
      </Router >

    );
  }
}

export default App;
