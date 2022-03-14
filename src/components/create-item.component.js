import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateItem extends Component {
    // constructor
    constructor(props) {
        super(props);

        // To make sure the "this" keyword works properly we need to bind
        // the methods to this class so that "this" will refer to the class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // setting initial state of the component
        this.state = {
            username: '',
            description: '',
            cost: 0,
            link: '',
            date: new Date(),
            users: []
        }
    }

    // hardcode users
    componentDidMount() { // lifecycle method that is called before react loads anything onto the webpage
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username // set the default to the first username in the database
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // methods to update the state properties of this component
    onChangeUsername(e) {
        this.setState({ // always use setState to update states
            username: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeCost(e) {
        this.setState({
            cost: e.target.value
        });
    }
    onChangeLink(e) {
        this.setState({
            link: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevents the default HTML form submit behavior from occuring
        const item = { // you can declare variables if you're only going to use them in one method
            username: this.state.username,
            description: this.state.description,
            cost: this.state.cost,
            link: this.state.link,
            date: this.state.date,
        };
        console.log(item);
        // send http post request to add item to database
        axios.post('http://localhost:5000/items/add', item)
            .then(res => console.log(res.data));
        //window.location = '/'; // the location is updated so that it returns to the homepage
        this.setState({
            username: '',
            description: '',
            cost: 0,
            link: '',
            date: new Date(),
        })
    }

    render() {
        return (
            <div>
                <h3>Create New Item Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cost (in CAD): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.cost}
                            onChange={this.onChangeCost}
                        />
                    </div>
                    <div className="form-group">
                        <label>Link: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.link}
                            onChange={this.onChangeLink}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Item Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}