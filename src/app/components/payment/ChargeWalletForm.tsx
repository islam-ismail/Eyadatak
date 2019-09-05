import React, { SFC, MouseEventHandler, ChangeEventHandler } from "react";
import weaccept from "../../assets/images/weaccept.png";
import fawry from "../../assets/images/fawry.png";

interface CompOwnProps {
    paymentMethodType?: "Accept" | "Fawry";
    done: boolean;
    fawryReferenceNumber?: string;
    changePaymentMethodType: ChangeEventHandler;
    amountToBePaidHandler: ChangeEventHandler<HTMLInputElement>;
    handleSubmit: MouseEventHandler;
}

const ChargeWalletForm: SFC<CompOwnProps> = props => {
    const {
        paymentMethodType,
        done,
        fawryReferenceNumber,
        handleSubmit,
        changePaymentMethodType,
        amountToBePaidHandler
    } = props;

    return (
        <main className="content">
            <div className="payment-wrapper">
                <div className="payment">
                    <h3>دفع</h3>
                    <div id="payment-form">
                        {done ? (
                            fawryReferenceNumber ? (
                                <p>Fawry reference number: {fawryReferenceNumber}</p>
                            ) : (
                                <></>
                            )
                        ) : (
                            <div className="payment-method">
                                <input
                                    type="radio"
                                    data-value="Fawry"
                                    onChange={changePaymentMethodType}
                                    checked={paymentMethodType === "Fawry"}
                                    className="wallet"
                                    id="fawry"
                                />
                                <label htmlFor="fawry">فوري</label>
                                <input
                                    type="radio"
                                    data-value="Accept"
                                    onChange={changePaymentMethodType}
                                    checked={paymentMethodType === "Accept"}
                                    className="credit"
                                    id="accept"
                                />
                                <label htmlFor="accept">بطاقة إئتمان</label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="summary">
                    <h3>ملخص الطلب</h3>
                    <div className="order">
                        <div className="item">
                            <div className="amount">
                                <input
                                    type="text"
                                    id="amount-input"
                                    onChange={amountToBePaidHandler}
                                />
                                <label htmlFor="amount-input">المبلغ المضاف</label>
                            </div>
                        </div>
                    </div>

                    <div className="providor">
                        <p>
                            يتم إرسال معلومات الدفع الخاصة بك مباشرةً إلى معالج الدفع ولا يتم حفظها
                            على خوادمنا.
                        </p>
                        {paymentMethodType === "Accept" && (
                            <img
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "100px",
                                    marginTop: "10px"
                                }}
                                src={weaccept}
                                alt="weAccept"
                            />
                        )}
                        {paymentMethodType === "Fawry" && (
                            <img
                                style={{
                                    maxWidth: "150px",
                                    maxHeight: "100px",
                                    marginTop: "10px"
                                }}
                                src={fawry}
                                alt="fawry"
                            />
                        )}
                    </div>
                    <div className="pay">
                        <button className="btn" type="submit" onClick={handleSubmit}>
                            ادفع الآن
                        </button>
                    </div>
                </div>
            </div>

            <aside></aside>
        </main>
    );
};

export default ChargeWalletForm;
