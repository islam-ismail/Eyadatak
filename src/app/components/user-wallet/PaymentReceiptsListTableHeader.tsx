import React, { Component, FormEvent } from "react";

export interface CompProps {
    order?: string;
    orderBy?: string;
    prepareSort: (sortId: string) => void;
}

class PaymentReceiptsListTableHeader extends Component<CompProps> {
    headerData = [
        {
            id: "target",
            label: "النوع"
        },
        { id: "amount", label: "المبلغ" },
        { id: "payment_method", label: "طريقة الدفع" },
        { id: "completed", label: "مكتمل" },
        { id: "transaction_id", label: "رمز المعاملة" },
        { id: "created_at", label: "تاريخ الإنشاء" },
        { id: "updated_at", label: "تاريخ آخر تحديث" }
    ];

    sortRequest = (sortId: string) => (event: FormEvent) => {
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

export default PaymentReceiptsListTableHeader;
