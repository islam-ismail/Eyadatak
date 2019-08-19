import React, { SFC } from "react";
import { adjustDateZone } from "../../../util/helpersFunc";
import { CaseChatElement } from "../chatCaseTypes";
import { CaseReply } from "../../../types/models/CaseReply";
import { MedicalCase } from "../../../types/models/MedicalCase";
import { CaseQuestionAnswer } from "../../../types/models/CaseQuestionAnswer";
import { QuestionTemplate } from "../../../types/models/QuestionTemplate";
import { CaseTransfer } from "../../../types/models/CaseTransfer";

interface CompProps {
    message: CaseChatElement | { type: "Closed" };
    me?: string;
    updated_at?: string;
}

export const HistoryChatMessage: SFC<CompProps> = props => {
    const { message, me } = props;

    let whoseReply;
    let className = `chat-m`;
    let answer: CaseQuestionAnswer;
    let question_template: QuestionTemplate;
    let updated_at: string;

    switch (message.type) {
        case "originalQuestion":
            whoseReply = me === "patient" ? "green" : "blue";
            className = `${className} ${whoseReply}`;
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
                            <p>{(message.question as MedicalCase).description}</p>
                        </div>
                    </div>
                </>
            );
        case "reply":
            whoseReply = me === (message.reply as CaseReply).replier.type ? "green" : "blue";
            className = `${className} ${whoseReply}`;
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>
                                    {(message.reply as CaseReply).replier.type === me
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
                            <p>{(message.reply as CaseReply).reply}</p>
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
                            question_template.question_type === "Textarea" ? (
                                <>
                                    <div className="q-text">
                                        <h4>{question_template.question_text_ar}</h4>
                                        <p>{answer.question_answer}</p>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
                            {question_template.question_type === "RadioInput" ? (
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
                            ) : (
                                <></>
                            )}
                            {question_template.question_type === "CheckboxInput" ? (
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
                            ) : (
                                <></>
                            )}
                            {question_template.question_type === "FileInput" ? (
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
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </>
            );

        case "answerGroup":
            const answerGroup: CaseChatElement[] = message.answerGroup as CaseChatElement[];
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
                                    question_template.question_type === "Textarea" ? (
                                        <>
                                            <div className="q-text">
                                                <h4>{question_template.question_text_ar}</h4>
                                                <p>{answer.question_answer}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {question_template.question_type === "RadioInput" ? (
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
                                    ) : (
                                        <></>
                                    )}
                                    {question_template.question_type === "CheckboxInput" ? (
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
                                    ) : (
                                        <></>
                                    )}
                                    {question_template.question_type === "FileInput" ? (
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
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            );
        case "transfer":
            const transfer = message.transfer as CaseTransfer;
            updated_at = props.updated_at as string;
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
                                        <span>{adjustDateZone(updated_at)}</span>
                                    </div>
                                </div>
                                <div className="msg">
                                    <p>الطبيب طلب تحويل السؤال لطبيب آخر</p>
                                    {transfer.status === "Waiting" ? (
                                        <p>لم يتم التحويل قبل إغلاق السؤال</p>
                                    ) : (
                                        <p>تم استلام السؤال يوم {adjustDateZone(updated_at)}</p>
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
                                                <span>{adjustDateZone(updated_at)}</span>
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
            );
        case "Closed":
            updated_at = props.updated_at as string;
            return (
                <>
                    <div className={className}>
                        <div className="header">
                            <div className="sender">
                                <h4>إغلاق السؤال</h4>
                            </div>
                            <div className="date">
                                <span>{adjustDateZone(updated_at)}</span>
                            </div>
                        </div>
                        <div className="msg">
                            <p>تم إغلاق هذا السؤال في {adjustDateZone(updated_at)}</p>
                        </div>
                    </div>
                </>
            );
    }
    return <></>;
};
