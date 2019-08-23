import { ApiResponse } from "../../../api-response";

export const Api_DoctorCaseTransfersRemoveCaseTransfer_Endpoint = (case_transfer_id: number) =>
    `doctor/case_transfers/${case_transfer_id}`;

export const Api_DoctorCaseTransfersRemoveCaseTransfer_HttpMethod = "DELETE";

export interface Api_DoctorCaseTransfersRemoveCaseTransfer_Response extends ApiResponse {}
