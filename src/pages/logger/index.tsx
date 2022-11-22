import { Stack } from '@mui/material';
import { useState } from 'react';
import { LoggerFilter } from 'src/components/Logger/LoggerFilter';
import LoggerTable from 'src/components/Logger/LoggerTable';

export default function Logger() {
    const [actionType, setActionType] = useState<string[]>();
    const [applicationType, setApplicationType] = useState<string[]>();
    return (
        <Stack spacing={2}>
            <h1>Logger</h1>
            <LoggerFilter 
                actionType={actionType}
                applicationType={applicationType}
            />
            <LoggerTable 
                setActionType={setActionType}
                setApplicationType={setApplicationType}
            />
        </Stack>
    );
}
