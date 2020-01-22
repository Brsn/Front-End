const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = process.env.PORT || 5000;
const path = require('path');
let Todo = require('./todo.model');

//middleware
app.use(cors());


app.use(bodyParser.json());


//mongoose.connect('mongodb+srv://admin:MJC3vhvKXTaWEpUv@helioatlas-1vrvg.mongodb.net/todos', { useNewUrlParser: true })
mongoose.connect('mongodb+srv://admin:MJC3vhvKXTaWEpUv@helioatlas-1vrvg.mongodb.net/todos?retryWrites=true&w=majority', { useNewUrlParser: true })
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/').post(function (req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/:id').delete(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send('data is not found');
            console.log("not found");
        }
        else
            todo.delete().then(todo => {
                res.json('todo', req.params.id);
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                    console.log("not possible");
                });
    });
});

todoRoutes.route('/:id').put(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_name = req.body.todo_name;
        todo.todo_description = req.body.todo_description;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated');
            console.log("todo update");
        })
            .catch(err => {
                res.status(400).send("Update not possible");
                console.log("todo cannot update");
            });
    });
});



app.use('/todos', todoRoutes);
//uses express routes

/* if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index'));
    })
} */
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
})