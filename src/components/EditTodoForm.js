import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import userService from '../services/user.service';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { updateTodo } from '../actions/todos';


function EditTodoForm(props) {
    const { todo, user, dispatch } = props;
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [assignees, setAssignees] = useState([]);
    const onSubmit = data => {
        dispatch(updateTodo(todo.id, data));
    }

    useEffect(() => {
        if (isTeamlead)
            userService.getAssignees().then(res => {
                setAssignees(res.data);
            });
    }, []);

    if (!todo) {
        return <React.Fragment></React.Fragment>;
    }

    const isTeamlead = user.role === "teamlead";
    const isTeamleadTask = todo.initiatorId === user.id;
    const isAssignedToUser = !isTeamlead & user.id === todo.assigneeId;
    const readOnly = !isTeamlead;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Заголовок</label>
                <input readOnly={readOnly} type="text" className="form-control" id="title" {...register("title", { value: todo.title, required: true })} />
                {errors.title && <span className="text-danger">Заголовок не указан</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea readOnly={readOnly} className="form-control" id="description" rows="5"  {...register("description", { value: todo.description, required: true })}></textarea>
                {errors.description && <span className="text-danger">Описание не указано</span>}
            </div>
            <div className="form-group">
                <label htmlFor="completeDate">Дата окончания</label>
                <Controller
                    control={control}
                    name="completeDate"
                    defaultValue={todo.completeDate}
                    render={({ field }) => {
                        return (
                            <DatePicker
                                readOnly={readOnly}
                                disabled={readOnly}
                                className="form-control"
                                wrapperClassName="form-control"
                                showTimeSelect
                                onChange={(e) => field.onChange(e)}
                                selected={new Date(field.value)}
                                locale={ru}
                                dateFormat="dd-MM-yyyy HH:mm"
                                timeCaption="Время"
                            />
                        )
                    }}
                />
                {errors.completeDate && <span className="text-danger">Дата окончания не указана</span>}
            </div>
            <div className="form-group">
                <label htmlFor="priority">Приоритет</label>
                <select readOnly={readOnly} disabled={readOnly} className="form-control" id="priority"  {...register("priority", { value: todo.priority, required: true })}>
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                </select>
                {errors.priority && <span className="text-danger">Приоритет не указан</span>}
            </div>
            <div className="form-group">
                <label htmlFor="assigneeId">Ответственный пользователь</label>
                {isTeamlead ?
                    <React.Fragment>
                        {isTeamleadTask ? <><select className="form-control" id="assigneeId" {...register("assigneeId", { defaultValue: todo.assigneeId, required: true })}>
                            {assignees.map(assignee => <option selected={assignee.id === todo.assigneeId} key={assignee.id} value={assignee.id}>{assignee.login}</option>)}
                        </select>
                            {errors.assigneeId && <span className="text-danger">Не указан ответственный пользователь</span>}</> :
                            <input readOnly={readOnly} type="text" className="form-control" id="assigneeId" value={todo.Assignee.login} />
                        }

                    </React.Fragment>
                    :
                    <input readOnly disabled type="text" className="form-control" value={todo.Assignee.login} />
                }

            </div>
            <div className="form-group">
                <label htmlFor="status">Статус</label>
                <select readOnly={!isAssignedToUser} disabled={!isAssignedToUser} className="form-control" id="status"  {...register("status", { value: todo.status, required: true })}>
                    <option value="todo">к выполнению</option>
                    <option value="inProgress">выполняется</option>
                    <option value="canceled">отменена</option>
                    <option value="completed">выполнена</option>
                </select>
                {errors.status && <span className="text-danger">Статус не указан</span>}
            </div>
            <input type="submit" className="btn btn-primary" value="Сохранить" />
        </form>
    );
}

function mapStateToProps(state) {
    const todo = state.editedTodo;
    const { user } = state.auth;
    return {
        todo, user
    };
}

export default connect(mapStateToProps)(EditTodoForm);