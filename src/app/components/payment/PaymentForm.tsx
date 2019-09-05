import React, { SFC, MouseEventHandler, ChangeEventHandler } from "react";
import weaccept from "../../assets/images/weaccept.png";
import fawry from "../../assets/images/fawry.png";

interface CompOwnProps {
    paymentSource: "Payment method" | "Wallet";
    paymentMethodType?: "Accept" | "Fawry";
    done: boolean;
    amount: number;
    walletBalance: number;
    fawryReferenceNumber?: string;
    changePaymentSource: ChangeEventHandler;
    changePaymentMethodType: ChangeEventHandler;
    handleSubmit: MouseEventHandler;
}

const PaymentForm: SFC<CompOwnProps> = props => {
    const {
        paymentSource,
        paymentMethodType,
        done,
        amount,
        walletBalance,
        fawryReferenceNumber,
        handleSubmit,
        changePaymentSource,
        changePaymentMethodType
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
                            <>
                                <div className="payment-method">
                                    <input
                                        type="radio"
                                        data-value="Wallet"
                                        onChange={changePaymentSource}
                                        checked={paymentSource === "Wallet"}
                                        className="wallet"
                                        id="wallet"
                                    />
                                    <label htmlFor="wallet">المحفظة الإلكترونية</label>
                                    <input
                                        type="radio"
                                        data-value="Payment method"
                                        onChange={changePaymentSource}
                                        checked={paymentSource === "Payment method"}
                                        className="credit"
                                        id="credit"
                                    />
                                    <label htmlFor="credit">طريقة دفع</label>
                                </div>
                                {paymentSource === "Wallet" && (
                                    <div className="payment-info">
                                        <div className="item">
                                            <div className="amount">
                                                <p>{walletBalance}</p>
                                                <span>ج.م.</span>
                                            </div>
                                            <div className="name">
                                                <p>الرصيد الحالي</p>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="amount">
                                                <p>{walletBalance - amount}</p>
                                                <span>ج.م.</span>
                                            </div>
                                            <div className="name">
                                                <p>الرصيد المتبقي بعد الدفع</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {paymentSource === "Payment method" && (
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
                            </>
                        )}
                    </div>
                </div>
                <div className="summary">
                    <h3>ملخص الطلب</h3>
                    <div className="order">
                        <div className="item">
                            <div className="amount">
                                <p>{amount}</p>
                                <span>ج.م.</span>
                            </div>
                            <div className="name">
                                <p>مبلغ إجمالي</p>
                            </div>
                        </div>
                    </div>
                    {paymentSource === "Payment method" ? (
                        <div className="providor">
                            <p>
                                يتم إرسال معلومات الدفع الخاصة بك مباشرةً إلى معالج الدفع ولا يتم
                                حفظها على خوادمنا.
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
                    ) : (
                        <></>
                    )}
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

export default PaymentForm;
