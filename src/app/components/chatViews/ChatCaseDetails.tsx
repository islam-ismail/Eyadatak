import React from "react";
import { adjustDateZone } from "../../util/helpersFunc";

export const ChatCaseDetails = props => {
    const { chatCase, uploadedFiles } = props;
    let caseStatus;
    switch (chatCase.status) {
        case "Waiting for patient reply":
            caseStatus = "في انتظار رد المريض";
            break;
        case "Waiting for doctor reply":
            caseStatus = "في انتظار رد الطبيب";
            break;
        case "Closed":
            caseStatus = "مغلق";
            break;
        case "Open":
        default:
            caseStatus = "مفتوح";
    }
    return (
        <div className="aside-fixed">
            <div className="title">
                <h3>تفاصيل السؤال</h3>
            </div>
            <div className="info">
                <h4>السؤال</h4>
                <p>{chatCase.description}</p>
            </div>
            <div className="info">
                <h4>تاريخ بداية السؤال</h4>
                <p>{adjustDateZone(chatCase.created_at)}</p>
            </div>
            <div className="info">
                <h4>حالة السؤال</h4>
                <p>{caseStatus}</p>
            </div>
            <div className="info">
                <h4>التخصص الرئيسي</h4>
                <p>{chatCase.speciality_name}</p>
            </div>
            {chatCase.sub_speciality_name ? (
                <>
                    <div className="info">
                        <h4>التخصص الفرعي</h4>
                        <p>{chatCase.sub_speciality_name}</p>
                    </div>
                </>
            ) : (
                <></>
            )}
            {uploadedFiles && uploadedFiles.length > 0 ? (
                <>
                    <div className="info">
                        <h4>الملفات المرفقة</h4>
                        {uploadedFiles.map(file => (
                            <a key={file.name} href={file.url}>
                                <p>{file.name}</p>
                            </a>
                        ))}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};
