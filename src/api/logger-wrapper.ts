import { api } from 'src/libs/client';
import {
    LoggerList,
} from './types';


export const getLoggerList = async (
    signal?: AbortSignal | undefined
): Promise<LoggerList> => {
    const resp = await api.get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`, {
        signal,
    });
    return resp.data;
};
