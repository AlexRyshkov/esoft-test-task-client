import React, { useEffect } from "react";
import { fetchTodo, fetchTodos } from "../../actions/todos";
import { connect, useDispatch } from "react-redux";
import { useTable } from 'react-table';
import moment from "moment";
import styled from "styled-components";

const TableRow = styled.tr`
&:hover {
    cursor: pointer;
    background: rgba(0,0,0,.075);
  }
`;


const statuses = {
    todo: "К выполнению",
    inProgress: "Выполняется",
    canceled: "Отменена",
    completed: "Выполнена",
};

const priorities = {
    high: "Высокий",
    medium: "Средний",
    low: "Низкий",
};

function TodoTable(props) {
    const { dispatch, todos, todoFilter } = props;
    var now = moment().utc();
    useEffect(() => {
        dispatch(fetchTodos(todoFilter));
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: 'Заголовок',
                accessor: 'title',
            },
            {
                Header: 'Приоритет',
                accessor: data => priorities[data.priority]
            },
            {
                Header: 'Дата окончания',
                accessor: data => moment(data.completeDate).format('DD.MM.YYYY HH:mm')
            },
            {
                Header: 'Ответственный',
                accessor: 'Assignee.login'
            },
            {
                Header: 'Статус',
                accessor: data => statuses[data.status]
            }
        ],
        []
    );

    const data = React.useMemo(() => todos, [todos]);
    return (
        <Table columns={columns} data={data} getCellProps={(cellInfo) => {
            let style = {};
            if (cellInfo.column.id === "title") {
                if (cellInfo.row.original.status === "completed") {
                    return { style: { color: "green" } };
                }
                return { style: { color: now.isAfter(cellInfo.row.original.completeDate) ? "red" : null } };
            }
            return { style: {} };
        }} />
    )
}

const defaultPropGetter = () => ({});

function Table({
    columns,
    data,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });
    const dispatch = useDispatch();
    return (
        <table style={{ width: 1200 }} {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <TableRow {...row.getRowProps()} onClick={() => {
                            dispatch(fetchTodo(row.original.id))
                        }}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps([getCellProps(cell)])}>{cell.render('Cell')}</td>
                            })}
                        </TableRow>
                    )
                })}
            </tbody>
        </table>
    );
}

function mapStateToProps(state) {
    const { todos, todoFilter } = state;
    return {
        todos, todoFilter
    };
}

export default connect(mapStateToProps)(TodoTable);