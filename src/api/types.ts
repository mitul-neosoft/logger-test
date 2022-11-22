
export interface LoggerListQueryParams {
    action_type?: string;
    application_type?: string;
    application_id?: string;
    from_date?: string | null
    to_date?: string | null
}


export interface LoggerResponseData {
    logId: string;
    applicationType?: string;
    applicationId?: string;
    actionType: string;
    actionDetails?: string;
    companyId?: string;
    ip: string;
    userAgent: string;
    userId?: string;
    source?: string;
    ownerId?: string;
    logInfo?: string;
    creationTimestamp: string
}

export interface LoggerListResponse {
    totalPages: number;
    number: number;
    recordsTotal: number;
    recordsFiltered: number;
    auditLog: LoggerResponseData[]
}


export interface LoggerList {
    success: boolean;
    elapsed: number;
    result: LoggerListResponse
}