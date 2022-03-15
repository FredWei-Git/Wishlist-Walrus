import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light color-nav navbar-expand-lg" >
                <div><img className="walrusLogo" src="images/walruslogo.png" alt="" /></div>
                <Link to="/" className="navbar-brand">Wishlist Walrus</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Wishlist</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add Item</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Add Recipient</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}