import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import {
    XTable,
    XTableData,
    XTableHeader,
    XTableSortValues,
} from 'src/components/XTable';
import { useGetLoggerList } from 'src/hooks/useGetLoggerList';
import { LoggerResponseData } from 'src/api/types';
import { useRouter } from 'next/router';
import { objectSort } from 'src/utils/helper';
import { LoggerResponseDataLableChange } from 'src/utils/constants';

const headers: XTableHeader[] = [
    {
        key: 'log_id',
        name: 'Log ID',
    },
    {
        key: 'application_type',
        name: 'Application Type',
    },
    {
        key: 'application_id',
        name: 'Application ID',
    },
    {
        key: 'action_type',
        name: 'Action',
    },
    {
        key: 'action_details',
        name: 'Action Details',
    },
    {
        key: 'creation_timestamp',
        name: 'Date : Time',
    }
];

const transformData = ({
    data,
}: {
    data?: LoggerResponseData[];
}): XTableData[] => {
    if (!data) {
        return [];
    }
    return data.map((item) => {
        return {
            log_id: item.logId,
            application_type: item.applicationType,
            application_id: item.applicationId,
            action_type: item.actionType,
            action_details: item.actionDetails || null,
            creation_timestamp: item.creationTimestamp.replace(' ', " / "),
        };
    });
};

interface XTableProps {
    setActionType: Dispatch<
        SetStateAction<string[] | undefined>
    >;
    setApplicationType: Dispatch<
        SetStateAction<string[] | undefined>
    >;
}

const LoggerTable = ({ setActionType, setApplicationType }: XTableProps) => {
    const router = useRouter();
    const [loggerData, setLoggerData] = useState<LoggerResponseData[]>();
    const { isLoading, data, error } = useGetLoggerList();
    const [totalCount, setTotalCount] = useState<number>(data?.result?.recordsFiltered || 0);
    const initialPagesDetail = {
        page: 0,
        rowsPerPage: 10
    }
    const [pages, setPages] = useState(initialPagesDetail);

    const [sortValues, setSortValues] = useState<XTableSortValues>({
        sortBy: "log_id",
        sortOrder: "asc"
    });

    const sortAppLoggerData = (toBeSotedLogger: LoggerResponseData[]) => {
        let sortedData: any = [];
        switch (sortValues.sortBy) {
            case "log_id":
            case "action_type":
            case "application_type":
            case "application_id":
                sortedData = objectSort(toBeSotedLogger, LoggerResponseDataLableChange[sortValues.sortBy], sortValues.sortOrder);
                break;
            case "creation_timestamp":
                sortedData = objectSort(toBeSotedLogger, LoggerResponseDataLableChange[sortValues.sortBy], sortValues.sortOrder, true);
                break;
        }
        setLoggerData([...sortedData] as LoggerResponseData[]);

    }

    const setUniqueValues = () => {
        const uniqueApplicationSet = new Set(data?.result.auditLog.map(item => item.applicationType));
        const uniqueApplicationArray = Array.from(uniqueApplicationSet.values()).filter((element): element is string => {
            return element !== null;
        });
        setApplicationType(uniqueApplicationArray);
        const uniqueActionSet = new Set(data?.result.auditLog.map(item => item.actionType));
        const uniqueActionArray = Array.from(uniqueActionSet.values()).filter((element): element is string => {
            return element !== null;
        });
        setActionType(uniqueActionArray);
    }

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        if (data?.result.recordsFiltered) {
            if (router.query) {
                const filteredRows = data?.result.auditLog.filter((row: LoggerResponseData) => {
                    let isFitForSearch = true;
                    if (router.query.action_type) {
                        if (router.query.action_type === row.actionType)
                            isFitForSearch = true;
                        else 
                            return false;
                    }
                    
                    if (router.query.application_type) {
                        if (router.query.application_type === row.applicationType)
                            isFitForSearch = true;
                        else
                            return false;
                    }
                    if (router.query.application_id) {
                        if (row.applicationId?.toString().includes(router.query.application_id.toString()))
                            isFitForSearch = true;
                        else 
                            return false;
                    }
                    if (router.query.from_date) {
                        const selectedFromDate = moment(router.query.from_date).startOf("date");
                        const rowDate = moment(row.creationTimestamp).startOf("date");
                        if(router.query.to_date) {
                            const selectedToDate = moment(router.query.to_date).startOf("date");
                            if (selectedFromDate.isSameOrBefore(rowDate) && selectedToDate.isSameOrAfter(rowDate)) {
                                isFitForSearch = true;
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            if (selectedFromDate.isSame(rowDate)) {
                                isFitForSearch = true;
                            }
                            else {
                                return false;
                            }
                        }
                    }
                    return isFitForSearch
                });
                sortAppLoggerData(filteredRows);
                setTotalCount(filteredRows.length);
                setPages(initialPagesDetail)
            }
            else
                setLoggerData(data.result.auditLog)

            setUniqueValues();
        }

    }, [router, data, router.isReady]);

    useEffect(() => {
        if (loggerData) {
            sortAppLoggerData(loggerData);
        }
    }, [sortValues]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <h1>Something went wrong.</h1>;

    if (!loggerData) {
        return <div>No data</div>;
    }
    return (
        <>
            <XTable
                headers={headers}
                data={transformData({ data: loggerData })}
                pagination={{
                    setPages,
                    pages,
                    count: totalCount,
                }}
                sort={{
                    sortValues,
                    setSortValues
                }}
            />
        </>
    );
};

export default LoggerTable;
