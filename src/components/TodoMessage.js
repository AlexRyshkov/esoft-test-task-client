import React from "react";
import { connect } from "react-redux";
import { CLEAR_TODO_MESSAGE } from "../actions/types";
import ToastMessage from "./ToastMessage";

function TodoMessage(props) {
    const { dispatch, todoMessage } = props;

    return <div
        style={{
            position: "fixed",
            right: 10,
            bottom: 10
        }}
    >
        {todoMessage.message && <ToastMessage close={() => { dispatch({ type: CLEAR_TODO_MESSAGE }) }} title={todoMessage.title} message={todoMessage.message} />}
    </div>;
}

function mapStateToProps(state) {
    const { todoMessage } = state;
    return {
        todoMessage
    };
}

export default connect(mapStateToProps)(TodoMessage);