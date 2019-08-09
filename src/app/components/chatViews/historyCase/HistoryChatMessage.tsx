import React from "react";
import { adjustDateZone } from "../../../util/helpersFunc";

export const HistoryChatMessage = props => {
    const { message, me } = props;

    let whoseReply;
    let className = `chat-m`;
    switch (message.type) {
        case "originalQuestion":
            whoseReply = me === "patient" ? "green" : "blue";
            className = `${className} ${whoseReply}`;
            break;
        case "reply":
            whoseReply = me === message.reply.replier.type ? "green" : "blue";
            className = `${className} ${whoseReply}`;
            break;
        case "answer":
        case "answerGroup":
        case "question":
        case "questionGroup":
        case "transfer":
        case "Closed":
        default:
            className = `${className} dark`;
    }

    return (
        <>
            {message.type === "Closed" ? (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>إغلاق السؤال</h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(props.updated_at)}</span>
                            </div>
                        </div>
                        <div className="msg">
                            <p>تم إغلاق هذا السؤال في {adjustDateZone(props.updated_at)}</p>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            {message.type === "originalQuestion" ? (
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
                            <p>{message.question.description}</p>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            {message.type === "reply" ? (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>
                                    {message.reply.replier.type === me
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
                            <p>{message.reply.reply}</p>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
            {message.type === "answer" ? (
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
                            {message.answer.question_template.question_type === "TextInput" ||
                            message.answer.question_template.question_type === "Textarea" ? (
                                <>
                                    <div className="q-text">
                                        <h4>{message.answer.question_template.question_text_ar}</h4>
                                        <p>{message.answer.question_answer}</p>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {message.answer.question_template.question_type === "RadioInput" ? (
                                <>
                                    <div className="q-radio">
                                        <h4>{message.answer.question_template.question_text_ar}</h4>
                                        <div className="radio-group">
                                            {message.answer.question_template.question_options_ar.map(
                                                option => (
                                                    <div key={option} className="radio">
                                                        <input
                                                            type="radio"
                                                            name="q10"
                                                            value={option}
                                                            disabled="disabled"
                                                            checked={
                                                                message.answer.question_answer ===
                                                                option
                                                                    ? "checked"
                                                                    : ""
                                                            }
                                                        />
                                                        <span>{option}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {message.answer.question_template.question_type === "CheckboxInput" ? (
                                <>
                                    <div className="q-check">
                                        <h4>{message.answer.question_template.question_text_ar}</h4>
                                        <div className="checkbox-group">
                                            {message.answer.question_template.question_options_ar.map(
                                                option => (
                                                    <div key={option} className="checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name="q3"
                                                            value={option}
                                                            disabled="disabled"
                                                            checked={
                                                                JSON.parse(
                                                                    message.answer.question_answer
                                                                ).indexOf(option) >= 0
                                                                    ? "checked"
                                                                    : ""
                                                            }
                                                        />
                                                        <span>{option}</span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {message.answer.question_template.question_type === "FileInput" ? (
                                <>
                                    <div className="q-file">
                                        <h4>{message.answer.question_template.question_text_ar}</h4>
                                        {JSON.parse(message.answer.question_answer).map(file => (
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
                    </div>
                </>
            ) : (
                <></>
            )}
            {message.type === "answerGroup" ? (
                <>
                    {message.answerGroup.map(answer => (
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
                                {answer.answer.question_template.question_type === "TextInput" ||
                                answer.answer.question_template.question_type === "Textarea" ? (
                                    <>
                                        <div className="q-text">
                                            <h4>
                                                {answer.answer.question_template.question_text_ar}
                                            </h4>
                                            <p>{answer.answer.question_answer}</p>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {answer.answer.question_template.question_type === "RadioInput" ? (
                                    <>
                                        <div className="q-radio">
                                            <h4>
                                                {answer.answer.question_template.question_text_ar}
                                            </h4>
                                            <div className="radio-group">
                                                {answer.answer.question_template.question_options_ar.map(
                                                    option => (
                                                        <div key={option} className="radio">
                                                            <input
                                                                type="radio"
                                                                name="q10"
                                                                value={option}
                                                                disabled="disabled"
                                                                checked={
                                                                    answer.answer
                                                                        .question_answer === option
                                                                        ? "checked"
                                                                        : ""
                                                                }
                                                            />
                                                            <span>{option}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {answer.answer.question_template.question_type ===
                                "CheckboxInput" ? (
                                    <>
                                        <div className="q-check">
                                            <h4>
                                                {answer.answer.question_template.question_text_ar}
                                            </h4>
                                            <div className="checkbox-group">
                                                {answer.answer.question_template.question_options_ar.map(
                                                    option => (
                                                        <div key={option} className="checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="q3"
                                                                value={option}
                                                                disabled="disabled"
                                                                checked={
                                                                    JSON.parse(
                                                                        answer.answer
                                                                            .question_answer
                                                                    ).indexOf(option) >= 0
                                                                        ? "checked"
                                                                        : ""
                                                                }
                                                            />
                                                            <span>{option}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {answer.answer.question_template.question_type === "FileInput" ? (
                                    <>
                                        <div className="q-file">
                                            <h4>
                                                {answer.answer.question_template.question_text_ar}
                                            </h4>
                                            {JSON.parse(answer.answer.question_answer).map(file => (
                                                <a key={file.name} href={file.url}>
                                                    <p>{answer.answer.question_answer}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <></>
            )}
            {message.type === "transfer" ? (
                <>
                    {message.transfer.status !== "Rejected" ? (
                        <>
                            <div className={className}>
                                <div className="header">
                                    <div className="sender">
                                        <h4>تحويل السؤال لطبيب آخر</h4>
                                    </div>
                                    <div className="date">
                                        <span>{adjustDateZone(props.updated_at)}</span>
                                    </div>
                                </div>
                                <div className="msg">
                                    <p>الطبيب طلب تحويل السؤال لطبيب آخر</p>
                                    {message.transfer.status === "Waiting" ? (
                                        <p>لم يتم التحويل قبل إغلاق السؤال</p>
                                    ) : (
                                        <p>
                                            تم استلام السؤال يوم{" "}
                                            {adjustDateZone(message.transfer.updated_at)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {me === "doctor" ? (
                                <>
                                    <div className={className}>
                                        <div className="header">
                                            <div className="sender">
                                                <h4>تحويل السؤال لطبيب آخر</h4>
                                            </div>
                                            <div className="date">
                                                <span>{adjustDateZone(props.updated_at)}</span>
                                            </div>
                                        </div>
                                        <div className="msg">
                                            <p>تم رفض التحويل</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
};
