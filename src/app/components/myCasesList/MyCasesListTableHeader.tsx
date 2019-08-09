import React, { Component } from "react";
// import TableHead from '@material-ui/core/TableHead'
// import TableRow from '@material-ui/core/TableRow'
// import TableCell from '@material-ui/core/TableCell'
// import TableSortLabel from '@material-ui/core/TableSortLabel'

class MyCasesListTableHeader extends Component {
    headerData = [
        {
            id: this.props.userType !== "doctor" ? "doctor_name" : "patient_name",
            label: this.props.userType !== "doctor" ? "اسم الطبيب" : "اسم المريض"
        },
        { id: "speciality_name", label: "التخصص" },
        { id: "created_at", label: "تاريخ بدء السؤال" },
        { id: "description", label: "السؤال" },
        { id: "updated_at", label: "تاريخ آخر تحديث" },
        { id: "latestReply", label: "أحدث رد" }
    ];

    sortRequest = sortId => event => {
        this.props.prepareSort(sortId);
        event.preventDefault();
    };

    render() {
        // const { orderBy, order } = this.props
        return (
            <thead>
                <tr>
                    {this.headerData.map(headerCell => (
                        <th key={headerCell.id} onClick={this.sortRequest(headerCell.id)}>
                            {/* // align='left'
              // padding='default'
              // sortDirection={orderBy === headerCell.id ? order : false}
              // className='tableCell' */}

                            {/* <TableSortLabel
                active={orderBy === headerCell.id}
                direction={order}
                onClick={this.sortRequest(headerCell.id)}
              > */}
                            {headerCell.label}
                            {/* </TableSortLabel> */}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default MyCasesListTableHeader;
