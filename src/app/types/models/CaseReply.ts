import { User } from "./User";

export interface CaseReply {
    id: number;
    case_id: number;
    replier_id: number;
    reply: string;
    is_read: number;
    created_at: string;
    updated_at: string;
    replier: User;
}
