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
    questionTemplate: questionTemplateReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
