import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TodoFilter from "./todoTable/TodoFilter";
import TodoTable from "./todoTable/TodoTable";
import NewTodoForm from "./NewTodoForm";
import CenteredModal from "./CenteredModal";
import { Button } from "react-bootstrap";
import EditTodoForm from "./EditTodoForm";
import { CLEAR_EDITED_TODO } from "../actions/types";
import styled from "styled-components";
import TodoMessage from "./TodoMessage";
import { fetchTodos } from "../actions/todos";
import NavBar from "./NavBar";

const TableSettingsCol = styled.div`
    padding-top: 20px;
`;

const TableCol = styled.div`
    padding-top: 20px;
`;


function Todo(props) {
    const { dispatch, user, editedTodo, todoMessage, todoFilter } = props;
    const [showNewTodo, setShowNewTodo] = useState(false);
    useEffect(() => {
        if (todoMessage.message === "Задача успешно создана" | todoMessage.message === "Задача успешно обновлена") {
            setShowNewTodo(false);
            dispatch(fetchTodos(todoFilter));
        }
        if (todoMessage.message === "Задача успешно обновлена") {
            dispatch({ type: CLEAR_EDITED_TODO });
        }
    }, [todoMessage]);
    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <TableSettingsCol>
                            <p className="h5">Настройки таблицы</p>
                            <TodoFilter />
                            <CenteredModal title="Редактирование задачи" component={EditTodoForm} show={editedTodo !== null} onHide={() => { dispatch({ type: CLEAR_EDITED_TODO }) }} />
                        </TableSettingsCol>
                    </div>
                    <div className="col-10">
                        <TableCol />
                        {user.role === "teamlead" &&
                            <div>
                                <Button variant="primary" onClick={() => setShowNewTodo(true)}>Новая задача</Button>
                                <CenteredModal title="Новая задача" component={NewTodoForm} show={showNewTodo} onHide={() => setShowNewTodo(false)} />
                            </div>}
                        <TodoTable />
                        <TableCol />
                    </div>
                </div>
                <TodoMessage />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { user } = state.auth;
    const { editedTodo, todoMessage, todoFilter } = state;
    return {
        user,
        editedTodo,
        todoMessage,
        todoFilter
    };
}

export default connect(mapStateToProps)(Todo);