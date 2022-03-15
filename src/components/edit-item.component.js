import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditItem extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            cost: 0,
            link: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    cost: response.data.cost,
                    link: response.data.link,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                this.setState({ users: response.data.map(user => user.username) });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
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
        e.preventDefault();

        const item = {
            username: this.state.username,
            description: this.state.description,
            cost: this.state.cost,
            link: this.state.link,
            date: this.state.date,
        };

        console.log(item);

        axios.post('http://localhost:5000/items/update/' + this.props.match.params.id, item)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Recipient: </label>
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
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Edit Item" class="btn btn-outline-primary" data-mdb-ripple-color="dark" />
                    </div>
                </form>
            </div>
        )
    }
}