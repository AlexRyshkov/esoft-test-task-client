import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkAuthorized, logout } from "../actions/auth";

const roles = {
    teamlead: "Руководитель",
    employee: "Работник"
  }

function NavBar({ user, dispatch }) {
    dispatch(checkAuthorized);

    const logoutClick = () => {
        dispatch(logout());
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="">Тестовое задание</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                {user ? <React.Fragment>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="todos">Задачи <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <div style={{ paddingRight: 10 }}>
                        <div>{user.login}
                        </div>
                        <div style={{ fontSize: "12px" }}>
                            {roles[user.role]}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={logoutClick}>
                        Выйти
                    </button>
                </React.Fragment> :
                    <React.Fragment>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="todos"><span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                        <a href="login" className="btn btn-primary" role="button">Войти</a>
                    </React.Fragment>}
            </div>
        </nav>
    </div>);
}


function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(NavBar);