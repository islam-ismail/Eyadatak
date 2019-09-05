import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import authReducer from "../components/auth/authReducer";
import globalStateReducer from "../components/globalState/globalStateReducer";
import newCaseReducer from "../components/newCase/newCaseReducer";
import myCasesListReducer from "../components/myCasesList/myCasesListReducer";
import chatCaseReducer from "../components/chatViews/chatCaseReducer";
import transferCaseReducer from "../components/transferCase/transferCaseReducer";
import historyAccessReducer from "../components/chatViews/historyAccess/historyAccessReducer";
import historyCaseReducer from "../components/chatViews/historyCase/historyCaseReducer";
import questionTemplateReducer from "../components/questionTemplate/questionTemplateReducer";
import paymentReceiptsReducer from "../components/user-wallet/PaymentReceiptsListReducer";

const rootReducer = combineReducers({
    global: globalStateReducer,
    auth: authReducer,
    form: FormReducer,
    newCase: newCaseReducer,
    myCasesList: myCasesListReducer,
    chatCase: chatCaseReducer,
    transferCase: transferCaseReducer,
    historyAccess: historyAccessReducer,
    historyCase: historyCaseReducer,
    questionTemplate: questionTemplateReducer,
    paymentReceipts: paymentReceiptsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
