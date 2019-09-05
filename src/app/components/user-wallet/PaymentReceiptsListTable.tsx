import React, { Component, ComponentType, ChangeEvent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "./PaymentReceiptsListActions";
import PaymentReceiptsListTableHeader from "./PaymentReceiptsListTableHeader";
import { adjustDateZone } from "../../util/helpersFunc";
import magnifyingGlass from "../../assets/images/magnifying-glass.svg";
import { AppState } from "../../reducers/rootReducer";
import { SortAndFilterOptions } from "./PaymentReceiptsListReducer";
import { PaymentReceiptsListActionsSignatures } from "./PaymentReceiptsListTypes";
import { PaymentReceipt } from "../../types/models/PaymentReceipt";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    paymentReceipts: state.paymentReceipts.paymentReceipts,
    sortAndFilter: state.paymentReceipts.sortAndFilter
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = PaymentReceiptsListActionsSignatures;

type CompProps = CompStateProps & CompActionProps;

interface CompState {
    paymentReceipts: PaymentReceipt[];
    sortAndFilter: SortAndFilterOptions;
    page: number;
    rowsPerPage: number;
}

class PaymentReceiptsListTable extends Component<CompProps, CompState> {
    state: CompState = {
        paymentReceipts: [],
        sortAndFilter: {
            order: "desc",
            orderBy: "updated_at",
            page: 0,
            rowsPerPage: 10
        },
        page: 0,
        rowsPerPage: 10
    };

    componentDidMount() {
        this.setState(() => ({
            paymentReceipts: this.props.paymentReceipts
        }));
    }

    componentDidUpdate(prevProps: CompProps) {
        if (prevProps.paymentReceipts !== this.props.paymentReceipts) {
            this.setState(() => ({
                paymentReceipts: this.props.paymentReceipts
            }));
        }
        if (
            prevProps.sortAndFilter.order !== this.props.sortAndFilter.order ||
            prevProps.sortAndFilter.orderBy !== this.props.sortAndFilter.orderBy
        ) {
            this.setState(() => ({
                sortAndFilter: this.props.sortAndFilter
            }));
        }
    }

    prepareSort = (orderBy: string) => {
        let order = "desc";
        if (
            orderBy === this.props.sortAndFilter.orderBy &&
            this.props.sortAndFilter.order === "desc"
        ) {
            order = "asc";
        }
        this.props.sortReceiptsListRequest(orderBy, order, this.state.paymentReceipts);
    };

    handleChangePage = (event: string) => {
        if (event === "prev" && this.state.page !== 0) {
            this.setState(() => ({ page: this.state.page - 1 }));
        } else if (
            this.state.page <
            this.state.paymentReceipts.length / this.state.rowsPerPage - 1
        ) {
            this.setState(() => ({ page: this.state.page + 1 }));
        }
    };

    handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState(() => ({ rowsPerPage: parseInt(event.target.value, 10) }));
        event.persist();
    };

    handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
        this.prepareSort(event.target.value);
        event.persist();
    };

    render() {
        return (
            <>
                <div className="action-bar cases">
                    <div className="select_all">
                        <input type="checkbox" name="select_all" id="select_all" />
                        <label htmlFor="select_all">اختر الكل</label>
                    </div>
                    <div className="search">
                        <input type="search" placeholder="تبحث عن شيء؟" />
                        <div className="s-icon">
                            <img src={magnifyingGlass} alt="search icon" />
                        </div>
                    </div>
                    <div className="actions left">
                        <div className="single">
                            <select className="select" onChange={this.handleFilterChange}>
                                <option value="id">ترتيب حسب</option>
                                <option value="target">النوع</option>
                                <option value="amount">المبلغ</option>
                                <option value="payment_method">طريقة الدفع</option>
                                <option value="completed">مكتمل</option>
                                <option value="transaction_id">رمز المعاملة</option>
                                <option value="created_at">تاريخ بدء السؤال</option>
                                <option value="updated_at">تاريخ آخر تحديث</option>
                            </select>
                        </div>
                        <div className="single">
                            <select
                                className="select"
                                name="gender"
                                onChange={this.handleChangeRowsPerPage}
                            >
                                <option value="10">10 أسئلة</option>
                                <option value="20">20 سؤال</option>
                                <option value="50">50 سؤال</option>
                                <option value="100">100 سؤال</option>
                            </select>
                        </div>
                        <div className="single pagination">
                            <button id="next" onClick={() => this.handleChangePage("prev")} />
                            <button id="prev" onClick={() => this.handleChangePage("next")} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <table className="all_cases">
                        <PaymentReceiptsListTableHeader
                            prepareSort={this.prepareSort}
                            orderBy={this.state.sortAndFilter.orderBy}
                            order={this.state.sortAndFilter.order}
                        />
                        <tbody>
                            {this.state.paymentReceipts
                                .slice(
                                    this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage +
                                        this.state.rowsPerPage
                                )
                                .map(myReceipt => (
                                    <tr key={myReceipt.id}>
                                        <td>{myReceipt.target}</td>
                                        <td>{myReceipt.amount}</td>
                                        <td>{myReceipt.payment_method.type}</td>
                                        <td>{myReceipt.completed === 1 ? "مكتمل" : "غير مكتمل"}</td>
                                        <td>{myReceipt.transaction_id}</td>
                                        <td className="date">
                                            {adjustDateZone(myReceipt.created_at)}
                                        </td>
                                        <td className="date">
                                            {adjustDateZone(myReceipt.updated_at)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default compose<ComponentType>(
    connect(
        mapState,
        actions
    )
)(PaymentReceiptsListTable);
