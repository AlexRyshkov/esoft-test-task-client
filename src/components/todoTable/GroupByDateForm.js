import React from "react";
import { connect } from "react-redux";
import { setTodoFilter } from "../../actions/todoFilter";

function GroupByDateForm(props) {
    const { todoFilter, dispatch } = props;
    const onGroupDateChange = (e) => {
        dispatch(setTodoFilter({ ...todoFilter, groupByCompleteDate: e.target.value }));
    }

    return (<React.Fragment>
        <div>Группировка по дате завершения</div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadioDateAll" value="all" checked={todoFilter.groupByCompleteDate === "all"} onChange={onGroupDateChange} />
            <label className="form-check-label" htmlFor="inlineRadioDateAll">Все</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadioDateToday" value="day" checked={todoFilter.groupByCompleteDate === "day"} onChange={onGroupDateChange} />
            <label className="form-check-label" htmlFor="inlineRadioDateToday">Сегодня</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadioDateWeek" value="week" checked={todoFilter.groupByCompleteDate === "week"} onChange={onGroupDateChange} />
            <label className="form-check-label" htmlFor="inlineRadioDateWeek">Неделя</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadioDateLongerWeek" value="longerWeek" checked={todoFilter.groupByCompleteDate === "longerWeek"} onChange={onGroupDateChange} />
            <label className="form-check-label" htmlFor="inlineRadioDateLongerWeek">Больше недели</label>
        </div>
    </React.Fragment>);
}

function mapStateToProps(state) {
    const { todoFilter } = state;
    return {
        todoFilter
    };
}

export default connect(mapStateToProps)(GroupByDateForm);