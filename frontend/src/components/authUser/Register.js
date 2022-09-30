import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* ----------- */
/* Material UI */
/* ----------- */
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
/* ----------- */
import Copyright from './Copyright';
import { registerUser } from '../../redux/actions/userActions';

const theme = createTheme();

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [successFlagForSubmit, setSuccessFlagForSubmit] = React.useState(false);
    const [errorFlagForSubmit, setErrorFlagForSubmit] = React.useState(false);
    const [errorEmailFormat, setErrorEmailFormat] = React.useState(false);
    const [errorPasswordLength, setErrorPasswordLength] = React.useState(false);
    const [errorPasswordMatch, setErrorPasswordMatch] = React.useState(false);

    const handleSubmitForUserRegistration = async (event) => {
        event.preventDefault();
        setErrorPasswordMatch(false);
        setErrorPasswordMatch(false);
        setErrorEmailFormat(false);

        /* Input Object Creation */
        const data = new FormData(event.currentTarget);
        const values = {
            username: data.get('userName'),
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        };
        /* Validation Functionalities */
        const validateEmailFn = (email) => {
            const validEmailRegexExpression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;     /* // const validEmailRegexExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; */
            if (validEmailRegexExpression.test(email)) {
                return true;
            } else {
                setErrorEmailFormat(true);
                return false;
            }
        };
        const passwordLengthFn = (password) => {
            if (password.length < 6) {
                setErrorPasswordLength(true);
                return false;
            }
            return true;
        };
        const matchPasswordFn = (password, confirmPassword) => {
            if (password !== confirmPassword) {
                setErrorPasswordMatch(true);
                return false;
            }
            return true;
        };
        /* Validation Function Calls */
        const validateEmail = validateEmailFn(values.email);
        const passwordLength = passwordLengthFn(values.password);
        const matchPassword = matchPasswordFn(values.password, data.get('confirmPassword'));

        /* Final Submission Code */
        if (validateEmail && passwordLength && matchPassword) {
            console.log("hi api");
            /* action dispatch - redux */
            dispatch(
                registerUser(
                    values,
                    setSuccessFlagForSubmit,
                    setErrorFlagForSubmit,
                    navigate
                )
            );
        }
    };

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
                        Sign up
                    </Typography>
                    {
                        successFlagForSubmit ?
                            <Snackbar open={true} autoHideDuration={6000}>
                                <Alert severity="success" sx={{ width: '100%' }}>
                                    User Created Successfully!
                                </Alert>
                            </Snackbar>
                            : errorFlagForSubmit ?
                                <Snackbar open={true} autoHideDuration={6000}>
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                        Error! Try again later.
                                    </Alert>
                                </Snackbar>
                                :
                                null
                    }
                    <Box component="form" onSubmit={handleSubmitForUserRegistration} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name="userName"
                                    autoComplete="user-name"
                                    autoFocus
                                    onChange={() => setErrorPasswordMatch(false)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={() => setErrorPasswordMatch(false)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={() => setErrorPasswordMatch(false)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={() => {
                                        setErrorPasswordMatch(false);
                                        setErrorEmailFormat(false)
                                    }
                                    }
                                    error={errorEmailFormat ? true : false}
                                    helperText={errorEmailFormat ?
                                        "Invalid format!"
                                        : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={() => {
                                        setErrorPasswordMatch(false);
                                        setErrorPasswordLength(false);
                                    }
                                    }
                                    error={errorPasswordLength ? true : false}
                                    helperText={errorPasswordLength ?
                                        "Password length must be atleast of 6."
                                        : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirm-new-password"
                                    onChange={() => setErrorPasswordMatch(false)}
                                    error={errorPasswordMatch ? true : false}
                                    helperText={errorPasswordMatch ?
                                        "Password mismatch!"
                                        : null
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}