import { AnyAction } from "redux";

export interface AppAction extends AnyAction {
    type: string;
    payload?: any;
    excludeRefresh?: boolean;
}
