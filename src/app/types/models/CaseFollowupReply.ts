export interface CaseFollowupReply {
    id: number;
    case_id: number;
    followup_id: number;
    replier_id: number;
    reply: string;
    is_read: number;
    created_at: string;
    updated_at: string;
}
