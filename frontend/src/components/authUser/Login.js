import * as React from 'react';
import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* ----------- */
/* Material UI */
/* ----------- */
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/* ----------- */
import { loginUser } from '../../redux/actions/userActions';

const theme = createTheme();

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorFlagForSubmit, setErrorFlagForSubmit] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const [rememberMe, setRememberMe] = React.useState(false);

    const handleChangeRemember = (e) => {
        setRememberMe(e.target.checked)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const values = {
            email: data.get('email'),
            password: data.get('password'),
            rememberMe
        };
        /* action dispatch - redux */
        dispatch(
            loginUser(
                values,
                setErrorFlagForSubmit,
                setErrorMessage,
                navigate
            )
        );
    };
    const vertical = 'top';
    const horizontal = 'left';
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {
                        errorFlagForSubmit ?
                            <Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={true} autoHideDuration={6000}>
                                <Alert variant="outlined" severity="error" sx={{ width: '100%' }}>
                                    Error! {errorMessage}.
                                </Alert>
                            </Snackbar>
                            :
                            null
                    }
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" onChange={handleChangeRemember} color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}