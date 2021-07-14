import React from "react";
import { connect } from "react-redux";
import GroupByAssigneeForm from "./GroupByAssigneeForm";
import GroupByDateForm from "./GroupByDateForm";
import { fetchTodos } from "../../actions/todos";
import styled from "styled-components";

const ButtonApplyFilter = styled.div`
    padding-top: 10px;
`;

const GroupByDiv = styled.div`
    padding:10px;
    margin-bottom: 5px;
`;

function TodoFilter(props) {
    const { dispatch, todoFilter, user } = props;
    const applyFilter = () => {
        dispatch(fetchTodos(todoFilter));
    };

    return (
        <React.Fragment>
            <GroupByDiv className="card">
                <GroupByDateForm />
            </GroupByDiv>
            {user.role === "teamlead" && <GroupByDiv className="card">
                <GroupByAssigneeForm />
            </GroupByDiv>}
            <ButtonApplyFilter>
                <button className="btn btn-primary" onClick={applyFilter}>Применить</button>
            </ButtonApplyFilter>
        </React.Fragment >
    );
}

function mapStateToProps(state) {
    const { todoFilter } = state;
    const { user } = state.auth;
    return {
        todoFilter,
        user
    };
}

export default connect(mapStateToProps)(TodoFilter);