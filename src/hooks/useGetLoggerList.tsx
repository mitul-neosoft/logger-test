import { useQuery } from '@tanstack/react-query';
import { getLoggerList } from '../api/logger-wrapper';

export const useGetLoggerList = () => {
    return useQuery(
        [
            'loggers'
        ],
        async ({ signal }) =>
            getLoggerList(signal),
        { refetchOnWindowFocus: false }
    );
};
