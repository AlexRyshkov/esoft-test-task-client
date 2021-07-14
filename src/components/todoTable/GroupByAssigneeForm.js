import React from "react";
import { connect } from "react-redux";
import { setTodoFilter } from "../../actions/todoFilter";

function GroupByAssigneeForm(props) {
    const { todoFilter, dispatch } = props;
    const onGroupAssigneeChange = (e) => {
        dispatch(setTodoFilter({ ...todoFilter, groupByAssignee: e.target.value }));
    }

    return (<React.Fragment>
        <div>Группировка по ответственным</div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadioAssigneeAll" value="all" checked={todoFilter.groupByAssignee === "all"} onChange={onGroupAssigneeChange} />
            <label className="form-check-label" htmlFor="inlineRadioAssigneeAll">Все</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" id="inlineRadioAssigneeTeamlead" value="teamlead" checked={todoFilter.groupByAssignee === "teamlead"} onChange={onGroupAssigneeChange} />
            <label className="form-check-label" htmlFor="inlineRadioAssigneeTeamlead">Текущий руководитель</label>
        </div>
    </React.Fragment>);
}

function mapStateToProps(state) {
    const { todoFilter } = state;
    return {
        todoFilter
    };
}

export default connect(mapStateToProps)(GroupByAssigneeForm);