import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import queryString from "query-string";

class AcceptSuccess extends Component<RouteComponentProps> {
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.amount_cents);
        console.log(values.success);
        console.log(values.order);
        console.log(values.currency);
        console.log(values.id);
        console.log(new Date(values.created_at as string));
        console.log(values["source_data.type"]);
        console.log(values["source_data.sub_type"]);
        if (values.merchant_order_id as string) {
            let merchant_order_id = (values.merchant_order_id as string).split("/");
            if (merchant_order_id && merchant_order_id[1]) {
                // let medicalCaseId = merchant_order_id[1];
                // fetch the medicalCase by medicalCaseId
                // update it in state.myCasesList
            }
        }
        // this.props.updateCaseInMyList(responseData.data.medical_case);
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="dashboard">
                        <div style={{ margin: "auto", width: "400px" }}>
                            You have completed the payment process successfully
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default AcceptSuccess;
