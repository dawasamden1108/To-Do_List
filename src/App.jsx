// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: [],
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input in not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,
                
                // Add completed status
                completed: false,
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    // Edit an item in the list
    editItem = (index) => {
      const todos = [...this.state.list];
      const editedTodo = prompt('Edit the todo:');
      if (editedTodo !== null && editedTodo.trim() !== '') {
        let updatedTodos = [...todos]
        updatedTodos[index].value= editedTodo
        this.setState({
          list: updatedTodos,
      });
      }
    }

    // Toggle completed status of an item
    toggleComplete = (index) => {
        const list = [...this.state.list];
        list[index].completed = !list[index].completed;
        this.setState({
            list: list,
        });
    }

    // Handle Enter key press
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.addItem();
        }
    }

    render() {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center todo-container">
                <div className="p-4 rounded-4 shadow-lg todo-card">
                    <Row className="w-100">
                        <Col className="text-center">
                            <h1 className="display-4 fw-bold mb-4 todo-title">
                                TODO LIST
                            </h1>
                        </Col>
                    </Row>

                <Row className="justify-content-center">
                    <Col xs={12}>
                        <InputGroup className="mb-4">
                            <FormControl
                                placeholder="Add a new task..."
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                onKeyPress={this.handleKeyPress}
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                                className="todo-input"
                            />
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => this.addItem()}
                                className="todo-add-btn"
                            >
                                ADD
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <ListGroup>
                            {/* map over and print items */}
                            {this.state.list.map((item, index) => {
                                return (
                                  <div key = {index}> 
                                    <ListGroup.Item
                                        className={`mb-3 todo-item ${item.completed ? 'todo-item-completed' : 'todo-item-default'}`}
                                    >
                                        <div className="todo-content">
                                            <Button 
                                                size="sm"
                                                className={`todo-checkbox ${item.completed ? 'todo-checkbox-checked' : 'todo-checkbox-unchecked'}`}
                                                onClick={() => this.toggleComplete(index)}
                                            >
                                                {item.completed ? '✓' : ''}
                                            </Button>
                                            <span className={`todo-text ${item.completed ? 'todo-text-completed' : 'todo-text-default'}`}>
                                                {item.value}
                                            </span>
                                        </div>
                                        <span>
                                            <Button 
                                                className="todo-edit-btn"
                                                onClick={() => this.editItem(index)}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                className="todo-delete-btn"
                                                onClick={() => this.deleteItem(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </span>
                                    </ListGroup.Item>
                                  </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
                </div>
            </div>
        );
    }
}

export default App;