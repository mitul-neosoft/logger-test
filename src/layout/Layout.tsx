import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Container,
    Box,
    CssBaseline,
} from '@mui/material/';


const drawerWidth = 240;

type mainProps = {
    mainPage: JSX.Element;
};
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


export default function Layout(props: mainProps) {
    const [open, setOpen] = React.useState(true);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Main open={open}>
                <Container maxWidth="xl">{props.mainPage}</Container>
            </Main>
        </Box>
    );
}
