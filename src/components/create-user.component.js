import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: ''
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username
        }

        console.log(newUser);

        // send http post request to backend server
        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Add Recipient</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Recipient: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Add Recipient" class="btn btn-outline-primary" data-mdb-ripple-color="dark" />
                    </div>
                </form>
            </div>
        )
    }
}