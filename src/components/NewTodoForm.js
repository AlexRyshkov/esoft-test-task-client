import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { Controller, useForm } from 'react-hook-form';
import userService from '../services/user.service';
import ru from 'date-fns/locale/ru';
import { addTodo } from '../actions/todos';
import { connect, useDispatch } from 'react-redux';

function NewTodoForm({ message }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [assignees, setAssignees] = useState([]);
    const onSubmit = data => {
        data.completeDate = new Date(data.completeDate).toISOString();
        dispatch(addTodo(data));
    }
    useEffect(() => {
        userService.getAssignees().then(res => {
            setAssignees(res.data);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Заголовок</label>
                <input type="text" className="form-control" id="title" {...register("title", { required: true })} />
                {errors.title && <span className="text-danger">Заголовок не указан</span>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea className="form-control" id="description" rows="5"  {...register("description", { required: true })}></textarea>
                {errors.description && <span className="text-danger">Описание не указано</span>}
            </div>
            <div className="form-group">
                <label htmlFor="completeDate">Дата окончания</label>
                <Controller
                    control={control}
                    name="completeDate"
                    render={({ field }) => (
                        <DatePicker
                            id="completeDate"
                            className="form-control"
                            wrapperClassName="form-control"
                            showTimeSelect
                            onChange={(e) => field.onChange(e)}
                            selected={field.value}
                            locale={ru}
                            dateFormat="dd-MM-yyyy HH:mm"
                            timeCaption="Время"
                            placeholderText="ДД-ММ-ГГГГ ЧЧ:мм"
                        />
                    )}
                />
                {errors.completeDate && <span className="text-danger">Дата окончания не указана</span>}
            </div>
            <div className="form-group">
                <label htmlFor="priority">Приоритет</label>
                <select className="form-control" id="priority"  {...register("priority", { defaultValue: "high", required: true })}>
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                </select>
                {errors.priority && <span className="text-danger">Приоритет не указан</span>}
            </div>
            {assignees.length > 0 &&
                <div className="form-group">
                    <label htmlFor="assigneeId">Ответственный пользователь</label>
                    <select className="form-control" id="assigneeId" {...register("assigneeId", { defaultValue: assignees[0].id, required: true })}>
                        {assignees.map((assignee, i) => <option key={assignee.id} value={assignee.id}>{assignee.login}</option>)}
                    </select>
                    {errors.assigneeId && <span className="text-danger">Не указан ответственный пользователь</span>}
                </div>}
            {(message & message !== "ok") ? <div className="alert alert-danger" role="alert">
                {message}
            </div> : null}
            <input type="submit" className="btn btn-primary" value="Создать" />
        </form>
    );
}

function mapStateToProps(state) {
    const { message } = state.todoMessage;
    return {
        message
    };
}

export default connect(mapStateToProps)(NewTodoForm);