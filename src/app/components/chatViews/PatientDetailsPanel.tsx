import React from "react";
import { User } from "../../types/models/User";

export const PatientDetailsPanel = (props: { patient: User; detailsActive: string }) => {
    const { patient, detailsActive } = props;
    let age = 0;
    if (patient && patient.name) {
        age = new Date().getFullYear() - new Date(patient.birthdate).getFullYear();
    }
    return (
        <div className={`profile aside${detailsActive === "active" ? "-active" : ""}`}>
            {patient && patient.name ? (
                <>
                    <div className="section">
                        <div className="title">
                            <h3>تفاصيل المريض</h3>
                        </div>
                        <div className="info w-pic">
                            <img src={patient.picture_url} alt={patient.name} />
                            <p>{patient.name}</p>
                        </div>
                        <div className="info">
                            <h4>الجنس</h4>
                            <p>{patient.gender}</p>
                        </div>
                        <div className="info">
                            <h4>العمر</h4>
                            <p>{age}</p>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};
