import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => (
    <tr>
        <td>{props.item.username}</td>
        <td>{props.item.description}</td>
        <td>{props.item.cost}</td>
        <td>{props.item.link}</td>
        <td>{props.item.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.item._id}>Edit Item</Link> | <a href="#" onClick={() => { props.deleteItem(props.item._id) }}>Delete</a>
        </td>
    </tr>
)

export default class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = { items: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/')
            .then(response => {
                this.setState({ items: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id) {
        axios.delete('http://localhost:5000/items/' + id)
            .then(res => console.log(res.data));
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    itemList() {
        return this.state.items.map(currentitem => {
            return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Wishlist</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Recipient</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Link</th>
                            <th>Date</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.itemList()}
                    </tbody>
                </table>
            </div>
        )
    }
}