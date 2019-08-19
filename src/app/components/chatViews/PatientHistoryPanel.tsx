import React, { SFC } from "react";
import { adjustDateZone } from "../../util/helpersFunc";
import { MedicalCase } from "../../types/models/MedicalCase";

interface CompProps {
    questionsOrHistoryActive: string;
    caseIsClosed: boolean;
    requestStatus: string;
    accessLevel: string;
    historyCases: MedicalCase[];
    waitingApproval: boolean;
    openHistoryAccessModal: (t: string) => void;
    handleHistoryCaseClick: (historyCase: MedicalCase) => void;
}
export const PatientHistoryPanel: SFC<CompProps> = props => {
    const { questionsOrHistoryActive } = props;
    return (
        <div className={`history aside${questionsOrHistoryActive === "active" ? "-active" : ""}`}>
            {props.caseIsClosed ? (
                <>
                    <div className="info">
                        <h4>هذا السؤال مغلق. لا يمكنك الاطلاع على تاريخ هذا المريض.</h4>
                    </div>
                </>
            ) : (
                <>
                    {props.requestStatus === "Approved" ? (
                        <>
                            {props.accessLevel === "All" ? (
                                <>
                                    <div className="title">
                                        <h3>أسئلة المريض السابقة</h3>
                                        {props.historyCases.map(historyCase => (
                                            <div className="section" key={historyCase.id}>
                                                <a
                                                    href="/"
                                                    onClick={e =>
                                                        props.handleHistoryCaseClick(historyCase)
                                                    }
                                                >
                                                    <h4>{historyCase.description}</h4>
                                                </a>
                                                <div className="date">
                                                    <p>{adjustDateZone(historyCase.created_at)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {/* props.accessLevel === 'Speciality' */}
                                    {props.waitingApproval ? (
                                        <>
                                            <div className="info">
                                                <h4>
                                                    لديك حق الاطلاع على أسئلة المريض السابقة في نفس
                                                    التخصص
                                                </h4>
                                                <h4>
                                                    طلب الاطلاع على كل الأسئلة السابقة في انتظار رد
                                                    المريض
                                                </h4>
                                            </div>
                                            <div className="title">
                                                <h3>أسئلة المريض السابقة</h3>
                                                {props.historyCases.map(historyCase => (
                                                    <div className="section" key={historyCase.id}>
                                                        <a
                                                            href="/"
                                                            onClick={() =>
                                                                props.handleHistoryCaseClick(
                                                                    historyCase
                                                                )
                                                            }
                                                        >
                                                            <h4>{historyCase.description}</h4>
                                                        </a>
                                                        <div className="date">
                                                            <p>
                                                                {adjustDateZone(
                                                                    historyCase.created_at
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="title">
                                                <div className="section">
                                                    <h4>
                                                        لديك حق الاطلاع على أسئلة المريض السابقة في
                                                        نفس التخصص
                                                    </h4>
                                                    <h4>
                                                        يمكنك طلب الاطلاع على كل أسئلة المريض
                                                        السابقة
                                                    </h4>
                                                    <button
                                                        onClick={() =>
                                                            props.openHistoryAccessModal("one")
                                                        }
                                                        className="btn"
                                                    >
                                                        طلب الاطلاع على كل الأسئلة السابقة
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="title">
                                                <h3>أسئلة المريض السابقة</h3>
                                                {props.historyCases.map(historyCase => (
                                                    <div className="section" key={historyCase.id}>
                                                        <a
                                                            href="/"
                                                            onClick={() =>
                                                                props.handleHistoryCaseClick(
                                                                    historyCase
                                                                )
                                                            }
                                                        >
                                                            <h4>{historyCase.description}</h4>
                                                        </a>
                                                        <div className="date">
                                                            <p>
                                                                {adjustDateZone(
                                                                    historyCase.created_at
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {props.waitingApproval ? (
                                <>
                                    <div className="title">
                                        <h3>تم ارسال الطلب إلى المريض. في انتظار رد المريض.</h3>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    {/* props.requestStatus === undefined OR 'Declined' OR 'Expired' */}
                                    <div className="title">
                                        <div className="section">
                                            <h4>يمكنك طلب الاطلاع على أسئلة المريض السابقة</h4>
                                            <button
                                                onClick={() => props.openHistoryAccessModal("both")}
                                                className="btn"
                                            >
                                                طلب الاطلاع على الأسئلة السابقة
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};
