import React, { Component, ComponentType, ChangeEvent, MouseEvent } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "./myCasesListActions";
import MyCasesListTableHeader from "./MyCasesListTableHeader";
import { adjustDateZone } from "../../util/helpersFunc";
import magnifyingGlass from "../../assets/images/magnifying-glass.svg";
import { MedicalCase } from "../../types/models/MedicalCase";
import { AppState } from "../../reducers/rootReducer";
import { SortAndFilterOptions } from "./myCasesListReducer";
import { MyCasesListActionsSignatures } from "./myCasesListTypes";

const mapState = (state: AppState) => ({
    locale: state.global.locale,
    filteredCases: state.myCasesList.filteredCases,
    sortAndFilter: state.myCasesList.sortAndFilter
});

type CompStateProps = ReturnType<typeof mapState>;

type CompActionProps = MyCasesListActionsSignatures;

interface CompOwnProps {
    userType: string;
    caseClicked: (clickedCase: MedicalCase) => void;
}

type CompProps = CompOwnProps & CompStateProps & CompActionProps;

interface CompState {
    filteredCases: MedicalCase[];
    sortAndFilter: SortAndFilterOptions;
    page: number;
    rowsPerPage: number;
}

class MyCasesListTable extends Component<CompProps, CompState> {
    state: CompState = {
        filteredCases: [],
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
            filteredCases: this.props.filteredCases
        }));
    }

    componentDidUpdate(prevProps: CompProps) {
        if (prevProps.filteredCases !== this.props.filteredCases) {
            this.setState(() => ({
                filteredCases: this.props.filteredCases
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
        this.props.sortCasesListRequest(orderBy, order, this.state.filteredCases);
    };

    handleChangePage = (event: string) => {
        if (event === "prev") {
            if (this.state.page !== 0) this.setState(() => ({ page: this.state.page - 1 }));
        } else {
            if (this.state.page < this.state.filteredCases.length / this.state.rowsPerPage - 1)
                this.setState(() => ({ page: this.state.page + 1 }));
        }
    };

    handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setState(() => ({ rowsPerPage: parseInt(event.target.value, 10) }));
        event.persist();
    };

    handleRowClick = (event: MouseEvent<HTMLAnchorElement>, clickedCase: MedicalCase) => {
        event.preventDefault();
        this.props.caseClicked(clickedCase);
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
                            <select
                                className="select"
                                name="gender"
                                onChange={this.handleFilterChange}
                            >
                                <option value="male">ترتيب حسب</option>
                                {this.props.userType === "doctor" ? (
                                    <option value="patient_name">اسم المريض</option>
                                ) : (
                                    <option value="doctor_name">اسم الطبيب</option>
                                )}
                                <option value="speciality_name">التخصص</option>
                                <option value="created_at">تاريخ بدء السؤال</option>
                                <option value="description">السؤال</option>
                                <option value="updated_at">تاريخ آخر تحديث</option>
                                <option value="latestReply">أحدث رد</option>
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
                    {/* <TablePagination
            className='actions left'
            rowsPerPageOptions={[2, 5, 10, 25]}
            component='div'
            count={this.state.filteredCases.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          /> */}
                </div>
                <div className="container">
                    <table className="all_cases">
                        <MyCasesListTableHeader
                            prepareSort={this.prepareSort}
                            orderBy={this.state.sortAndFilter.orderBy}
                            order={this.state.sortAndFilter.order}
                            userType={this.props.userType}
                        />
                        <tbody>
                            {this.state.filteredCases
                                .slice(
                                    this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage +
                                        this.state.rowsPerPage
                                )
                                .map(myCase => (
                                    <tr key={myCase.id} className={myCase.is_read ? "" : "unread"}>
                                        <td>
                                            <a
                                                href="/"
                                                onClick={event =>
                                                    this.handleRowClick(event, myCase)
                                                }
                                            >
                                                {this.props.userType !== "doctor"
                                                    ? myCase.doctor_name
                                                    : myCase.patient_name}
                                            </a>
                                        </td>
                                        {myCase.sub_speciality_name ? (
                                            <td>
                                                <a
                                                    href="/"
                                                    onClick={event =>
                                                        this.handleRowClick(event, myCase)
                                                    }
                                                >
                                                    {myCase.sub_speciality_name}:{" "}
                                                    {myCase.speciality_name}
                                                </a>
                                            </td>
                                        ) : (
                                            <td>
                                                <a
                                                    href="/"
                                                    onClick={event =>
                                                        this.handleRowClick(event, myCase)
                                                    }
                                                >
                                                    {myCase.speciality_name}
                                                </a>
                                            </td>
                                        )}
                                        <td className="date">
                                            <a
                                                href="/"
                                                onClick={event =>
                                                    this.handleRowClick(event, myCase)
                                                }
                                            >
                                                {adjustDateZone(myCase.created_at)}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href="/"
                                                onClick={event =>
                                                    this.handleRowClick(event, myCase)
                                                }
                                            >
                                                {myCase.description}
                                            </a>
                                        </td>
                                        <td className="date">
                                            <a
                                                href="/"
                                                onClick={event =>
                                                    this.handleRowClick(event, myCase)
                                                }
                                            >
                                                {adjustDateZone(myCase.updated_at)}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href="/"
                                                onClick={event =>
                                                    this.handleRowClick(event, myCase)
                                                }
                                            >
                                                {myCase.latestReply}
                                            </a>
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

export default compose<ComponentType<CompOwnProps>>(
    connect(
        mapState,
        actions
    )
)(MyCasesListTable);
