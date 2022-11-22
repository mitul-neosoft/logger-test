import { useState } from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import FormControl from '@mui/material/FormControl';
import { LoggerListQueryParams } from 'src/api/types';

interface XFilterProps {
    actionType: string[] | undefined;
    applicationType: string[] | undefined;
}

export const LoggerFilter = ({ actionType, applicationType }: XFilterProps) => {
    const router = useRouter();
    const [errorAlert, setErrorAlert] = useState<boolean>(false);
    let defaultSearchCriteria: Partial<LoggerListQueryParams> = {
        action_type: router?.query?.action_type ? router.query.action_type.toString() : "",
        application_type: router?.query?.application_type ? router.query.application_type.toString() : "",
        application_id: router?.query?.application_id ? router.query.application_id.toString() : "",
        from_date: router?.query?.from_date ? router.query.from_date.toString() : null,
        to_date: router?.query?.to_date ? router.query.to_date.toString() : null,
    };

    const resetValues: Partial<LoggerListQueryParams> = {
        action_type: "",
        application_type: "",
        application_id: "",
        from_date: null,
        to_date: null

    }
    const onReset = () => {
        defaultSearchCriteria = { ...resetValues };
        router.push({
            pathname: router.pathname,
        });
    }

    return (
        <>
            <Formik
                initialValues={defaultSearchCriteria}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    if (values.to_date && !values.from_date) {
                        setErrorAlert(true);
                        setTimeout(() => {
                            setErrorAlert(false);
                        }, 5000)
                        return;
                    }
                    defaultSearchCriteria = { ...values }
                    
                    let searchQueryParams: Partial<LoggerListQueryParams> = {};
                    if (values.action_type) {
                        searchQueryParams['action_type'] = values.action_type
                    }
                    if (values.application_type) {
                        searchQueryParams['application_type'] = values.application_type
                    }
                    if (values.application_id) {
                        searchQueryParams['application_id'] = values.application_id
                    }
                    if (values.from_date) {
                        searchQueryParams['from_date'] = moment(values.from_date?.toString()).format('YYYY-MM-DD')
                    }
                    if (values.to_date) {
                        searchQueryParams['to_date'] = moment(values.to_date?.toString()).format('YYYY-MM-DD')
                    }
                    router.push({
                        pathname: router.pathname,
                        query: {
                            ...searchQueryParams,
                        },
                    });
                    actions.setSubmitting(false);
                }}
            >
                {({ values, handleChange, setFieldValue }) => {
                    return (
                        <Form>
                            <Paper sx={{ flexGrow: 1, padding: 2 }}>
                                <Grid container spacing={2}>
                                    {errorAlert &&
                                        <Grid item xs={12}>
                                            <Alert severity="error">Please select From date!</Alert>
                                        </Grid>
                                    }
                                    <Grid item xs={2} md={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="action_type">Action Type</InputLabel>
                                            <Select
                                                id="action_type"
                                                name="action_type"
                                                label="Action Type"
                                                value={values.action_type}
                                                onChange={handleChange}
                                            >
                                                {actionType?.map((val) => {
                                                    return <MenuItem value={val} key="action_type_{val}">{val}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <FormControl fullWidth>
                                            <InputLabel id="application_type">Application Type</InputLabel>
                                            <Select
                                                id="application_type"
                                                name="application_type"
                                                label="Application Type"
                                                value={values.application_type}
                                                onChange={handleChange}
                                            >
                                                {applicationType?.map((val) => {
                                                    return <MenuItem value={val} key="app_type_{val}">{val}</MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        <TextField
                                            id="application_id"
                                            name="application_id"
                                            label="Application ID"
                                            value={values.application_id}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={2} md={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="From Date"
                                                inputFormat="MM/DD/YYYY"
                                                value={values.from_date}
                                                onChange={val => {
                                                    setFieldValue('from_date', val)
                                                }}
                                                minDate={values.to_date}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={2} md={2}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="To Date"
                                                inputFormat="MM/DD/YYYY"
                                                value={values.to_date}
                                                onChange={val => {
                                                    setFieldValue('to_date', val)
                                                }}
                                                maxDate={values.from_date}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>

                                    <Grid item xs={12} lg={2} md={2} style={{ display: 'flex', alignSelf: 'flex-end' }}>
                                        <Button
                                            color="error"
                                            variant="contained"
                                            type="reset"
                                            style={{ marginRight: 5 }}
                                            onClick={() => onReset()}
                                        >
                                            RESET
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                        >
                                            SEARCH
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};
