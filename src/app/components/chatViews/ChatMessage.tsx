import React, { SFC, MouseEventHandler } from "react";
import Button from "../../UIComponents/Button";
import { adjustDateZone } from "../../util/helpersFunc";
import { CaseChatElement } from "./chatCaseTypes";
import { PatientHistoryAccess } from "../../types/models/PatientHistoryAccess";
import { MedicalCase } from "../../types/models/MedicalCase";
import { CaseReply } from "../../types/models/CaseReply";
import { CaseQuestionAnswer } from "../../types/models/CaseQuestionAnswer";
import { QuestionTemplate } from "../../types/models/QuestionTemplate";
import { CaseTransfer } from "../../types/models/CaseTransfer";
import { CaseQuestion } from "../../types/models/CaseQuestion";

interface CompProps {
    message: CaseChatElement | { type: "Closed" };
    me?: string;
    updated_at?: string;
    userId?: number;
    requestRespondedTo?: boolean;
    waitingLevel?: string;
    openQuestionPanel?: MouseEventHandler;
    handleAccessRequestResponse?: (requestResponse: string, accessLevel?: string) => void;
}

export const ChatMessage: SFC<CompProps> = props => {
    const { message, me, userId, requestRespondedTo } = props;

    let whoseReply: string;
    let className = `chat-m`;
    let question_template: QuestionTemplate;
    let answer: CaseQuestionAnswer;

    switch (message.type) {
        case "accessRequest":
            const accessRequest = message.accessRequest as PatientHistoryAccess;
            if (accessRequest.status === "Waiting approval") {
                return (
                    <>
                        <div className={className}>
                            <div className="header">
                                <div className="sender">
                                    <h4>طلب الحصول على حق الاطلاع على الأسئلة السابقة</h4>
                                </div>
                                <div className="date">
                                    <span>{adjustDateZone(accessRequest.created_at)}</span>
                                </div>
                            </div>
                            <div className="msg">
                                {me === "patient" ? (
                                    <>
                                        {requestRespondedTo ? (
                                            <>
                                                <p>شكرًا على الرد</p>
                                            </>
                                        ) : (
                                            <>
                                                <h4>
                                                    الطبيب طلب الاطلاع على{" "}
                                                    {props.waitingLevel === "All"
                                                        ? "كل الأسئلة السابقة"
                                                        : "الأسئلة السابقة في نفس التخصص"}
                                                </h4>
                                                <p>برجاء الرد على الطلب</p>
                                                <Button
                                                    onClick={() =>
                                                        props.handleAccessRequestResponse &&
                                                        props.handleAccessRequestResponse(
                                                            "Approved",
                                                            props.waitingLevel
                                                        )
                                                    }
                                                >
                                                    أوافق
                                                </Button>
                                                {props.waitingLevel === "All" ? (
                                                    <>
                                                        <Button
                                                            onClick={() =>
                                                                props.handleAccessRequestResponse &&
                                                                props.handleAccessRequestResponse(
                                                                    "Approved",
                                                                    "Speciality"
                                                                )
                                                            }
                                                        >
                                                            أوافق على نفس التخصص فقط
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                <Button
                                                    onClick={() =>
                                                        props.handleAccessRequestResponse &&
                                                        props.handleAccessRequestResponse(
                                                            "Declined"
                                                        )
                                                    }
                                                >
                                                    لا أوافق
                                                </Button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <p>في انتظار رد المريض على الطلب</p>
                                )}
                            </div>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className={className}>
                            <div className="header">
                                <div className="sender">
                                    <h4>طلب الحصول على حق الاطلاع على الأسئلة السابقة</h4>
                                </div>
                                <div className="date">
                                    <span>{adjustDateZone(accessRequest.created_at)}</span>
                                </div>
                            </div>
                            <div className="msg">
                                <h4>الطبيب طلب الاطلاع على الأسئلة السابقة</h4>
                                {accessRequest && accessRequest.status === "Approved" ? (
                                    <>
                                        <p>
                                            تمت الموافقة على اطلاع الطبيب على{" "}
                                            {accessRequest.access_level === "All"
                                                ? "كل الأسئلة السابقة"
                                                : "الأسئلة السابقة في نفس التخصص"}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p>تم رفض الطلب</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                );
            }
        case "originalQuestion":
            whoseReply = me === "patient" ? "green" : "blue";
            className = `${className} ${whoseReply}`;
            const question = message.question as MedicalCase;
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>{me === "patient" ? "أنت" : "المريض"}</h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(message.created_at)}</span>
                            </div>
                        </div>
                        <div className="msg">
                            <p>{question.description}</p>
                        </div>
                    </div>
                </>
            );
        case "reply":
            const reply = message.reply as CaseReply;
            whoseReply = me === reply.replier.type ? "green" : "blue";
            className = `${className} ${whoseReply}`;
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>
                                    {reply.replier.type === me
                                        ? "أنت"
                                        : me === "patient"
                                        ? "الطبيب"
                                        : "المريض"}
                                </h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(message.created_at)}</span>
                            </div>
                        </div>
                        <div className="msg">
                            <p>{reply.reply}</p>
                        </div>
                    </div>
                </>
            );
        case "answer":
            answer = message.answer as CaseQuestionAnswer;
            question_template = answer.question_template as QuestionTemplate;
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>إجابات المريض على أسئلة الطبيب</h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(message.created_at)}</span>
                            </div>
                        </div>
                        <div className="msg">
                            {question_template.question_type === "TextInput" ||
                                (question_template.question_type === "Textarea" && (
                                    <>
                                        <div className="q-text">
                                            <h4>{question_template.question_text_ar}</h4>
                                            <p>{answer.question_answer}</p>
                                        </div>
                                    </>
                                ))}
                            {question_template.question_type === "RadioInput" && (
                                <>
                                    <div className="q-radio">
                                        <h4>{question_template.question_text_ar}</h4>
                                        <div className="radio-group">
                                            {question_template.question_options_ar.map(option => (
                                                <div key={option} className="radio">
                                                    <input
                                                        type="radio"
                                                        name="q10"
                                                        value={option}
                                                        disabled={true}
                                                        checked={answer.question_answer === option}
                                                    />
                                                    <span>{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            {question_template.question_type === "CheckboxInput" && (
                                <>
                                    <div className="q-check">
                                        <h4>{question_template.question_text_ar}</h4>
                                        <div className="checkbox-group">
                                            {question_template.question_options_ar.map(option => (
                                                <div key={option} className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name="q3"
                                                        value={option}
                                                        disabled={true}
                                                        checked={
                                                            JSON.parse(
                                                                answer.question_answer
                                                            ).indexOf(option) >= 0
                                                        }
                                                    />
                                                    <span>{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            {question_template.question_type === "FileInput" && (
                                <>
                                    <div className="q-file">
                                        <h4>{question_template.question_text_ar}</h4>
                                        {JSON.parse(answer.question_answer).map(
                                            (file: { name: string; url: string }) => (
                                                <a key={file.name} href={file.url}>
                                                    <p>{file.name}</p>
                                                </a>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            );
        case "answerGroup":
            const answerGroup = message.answerGroup as CaseChatElement[];
            return (
                <>
                    {answerGroup.map(answerElement => {
                        answer = answerElement.answer as CaseQuestionAnswer;
                        question_template = answer.question_template as QuestionTemplate;
                        return (
                            <div key={answer.id} className={className}>
                                <div className="header">
                                    <div className="sender">
                                        <h4>إجابات المريض على أسئلة الطبيب</h4>
                                    </div>
                                    <div className="date">
                                        <span>{adjustDateZone(answer.created_at)}</span>
                                    </div>
                                </div>
                                <div className="msg">
                                    {question_template.question_type === "TextInput" ||
                                        (question_template.question_type === "Textarea" && (
                                            <>
                                                <div className="q-text">
                                                    <h4>{question_template.question_text_ar}</h4>
                                                    <p>{answer.question_answer}</p>
                                                </div>
                                            </>
                                        ))}
                                    {question_template.question_type === "RadioInput" && (
                                        <>
                                            <div className="q-radio">
                                                <h4>{question_template.question_text_ar}</h4>
                                                <div className="radio-group">
                                                    {question_template.question_options_ar.map(
                                                        option => (
                                                            <div key={option} className="radio">
                                                                <input
                                                                    type="radio"
                                                                    name="q10"
                                                                    value={option}
                                                                    disabled={true}
                                                                    checked={
                                                                        answer.question_answer ===
                                                                        option
                                                                    }
                                                                />
                                                                <span>{option}</span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {question_template.question_type === "CheckboxInput" && (
                                        <>
                                            <div className="q-check">
                                                <h4>{question_template.question_text_ar}</h4>
                                                <div className="checkbox-group">
                                                    {question_template.question_options_ar.map(
                                                        option => (
                                                            <div key={option} className="checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    name="q3"
                                                                    value={option}
                                                                    disabled={true}
                                                                    checked={
                                                                        JSON.parse(
                                                                            answer.question_answer
                                                                        ).indexOf(option) >= 0
                                                                    }
                                                                />
                                                                <span>{option}</span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {question_template.question_type === "FileInput" && (
                                        <>
                                            <div className="q-file">
                                                <h4>{question_template.question_text_ar}</h4>
                                                {JSON.parse(answer.question_answer).map(
                                                    (file: { name: string; url: string }) => (
                                                        <a key={file.name} href={file.url}>
                                                            <p>{answer.question_answer}</p>
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            );
        case "question":
        case "questionGroup":
            const caseQuestion = message.question as CaseQuestion;
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>أسئلة مرسلة من الطبيب</h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(message.created_at)}</span>
                            </div>
                        </div>
                        <div className="msg">
                            {me === "patient" ? (
                                <>
                                    <p>برجاء الإجابة على الأسئلة المرسلة من الطبيب</p>
                                    <button className="btn" onClick={props.openQuestionPanel}>
                                        اضغط هنا للإجابة
                                    </button>
                                </>
                            ) : (
                                <p>في انتظار رد المريض على الأسئلة</p>
                            )}
                        </div>
                    </div>
                </>
            );
        case "transfer":
            const transfer = message.transfer as CaseTransfer;
            return (
                <>
                    {transfer.status !== "Rejected" ? (
                        <>
                            <div className={className}>
                                <div className="header">
                                    <div className="sender">
                                        <h4>تحويل السؤال لطبيب آخر</h4>
                                    </div>
                                    <div className="date">
                                        <span>{adjustDateZone(props.updated_at || "")}</span>
                                    </div>
                                </div>
                                <div className="msg">
                                    <p>الطبيب طلب تحويل السؤال لطبيب آخر</p>
                                    {transfer.status === "Waiting" ? (
                                        <p>في انتظار تأكيد الطبيب الجديد</p>
                                    ) : (
                                        <p>
                                            تم استلام السؤال يوم{" "}
                                            {adjustDateZone(transfer.updated_at)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {me === "doctor" && userId === transfer.from_doctor.id ? (
                                <>
                                    <div className={className}>
                                        <div className="header">
                                            <div className="sender">
                                                <h4>تحويل السؤال لطبيب آخر</h4>
                                            </div>
                                            <div className="date">
                                                <span>
                                                    {adjustDateZone(props.updated_at || "")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="msg">
                                            <p>
                                                تم رفض التحويل، يمكنك التحويل لطبيب آخر أو اختيار
                                                التخصص
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </>
            );
        case "Closed":
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>إغلاق السؤال</h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(props.updated_at || "")}</span>
                            </div>
                        </div>
                        <div className="msg">
                            <p>تم إغلاق هذا السؤال في {adjustDateZone(props.updated_at || "")}</p>
                        </div>
                    </div>
                </>
            );
    }
};
