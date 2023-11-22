import React from "react";
import {
    Link, NavLink
} from "react-router-dom";
import "./nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class NavBar extends React.Component {
    render() {
        return (
            <>
                <div className="navbar">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact={true}>Home</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/doctor">Doctor</NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-patient">Create Patient</NavLink>
                        </li>

                    </ul>
                    <ul className="nav">
                        <div className="list_icon">
                            <NavLink className="nav-link" to="/manage-schedule"><FontAwesomeIcon className="item" color="#8e8e8e" icon="fas fa-sign-out-alt" /></NavLink>
                        </div>
                    </ul>
                </div>
            </>
        );
    }
}

export { NavBar };