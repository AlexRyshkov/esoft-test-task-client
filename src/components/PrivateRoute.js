import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, role, user, ...rest }) {
    return <Route {...rest} render={props => {
        if (!user) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if (role & user.role === role) {
            return <Redirect to={{ pathname: '/' }} />
        }

        return <Component {...props} />
    }} />
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(PrivateRoute);