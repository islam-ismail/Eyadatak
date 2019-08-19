import React, { SFC } from "react";
import { Link } from "react-router-dom";

export const BoxLink: SFC<{ label: string; count?: number; amount?: number }> = props => {
    let boxLabel = "";
    switch (props.label) {
        case "Open":
            boxLabel = "كل الأسئلة المفتوحة";
            break;
        case "New":
            boxLabel = "الأسئلة الجديدة";
            break;
        case "Waiting for patient reply":
            boxLabel = "في انتظار رد المريض";
            break;
        case "Waiting for doctor reply":
            boxLabel = "في انتظار رد الطبيب";
            break;
        case "Closed":
            boxLabel = "الأسئلة المغلقة";
            break;
        case "TRANSFER CASES":
            boxLabel = "الأسئلة المحولة";
            break;
        case "ALL MY CASES":
            boxLabel = "كل الأسئلة";
            break;
        case "Wallet Balance":
            boxLabel = "رصيد المحفظة";
            break;
        default:
            boxLabel = "";
    }
    return (
        <>
            {props.amount === undefined ? (
                <Link
                    to={{
                        pathname: "/my-cases-list",
                        state: { label: props.label }
                    }}
                    className="stat"
                >
                    <div className="title">
                        <h4>{boxLabel}</h4>
                    </div>
                    <div className="number">
                        <p>{props.count}</p>
                    </div>
                </Link>
            ) : (
                <Link to="/wallet" className="stat">
                    <div className="title">
                        <h4>{boxLabel}</h4>
                    </div>
                    <div className="number">
                        <p>{props.amount}</p>
                        <span>ج.م.</span>
                    </div>
                </Link>
            )}
        </>
    );
};
