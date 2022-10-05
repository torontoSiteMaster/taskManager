import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* ----------- */
/* Material UI */
/* ----------- */
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
/* ----------- */
import { updateUser } from '../../redux/actions/userActions';
import { Checkbox, Chip } from '@mui/material';
import Header from '../../components/header/Header';

const theme = createTheme();

export default function EditUser() {
    const { id } = useParams()  // get the user id from params

    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* Local States */
    const [checked, setChecked] = React.useState(false);
    const [successFlagForSubmit, setSuccessFlagForSubmit] = React.useState(false);
    const [errorFlagForSubmit, setErrorFlagForSubmit] = React.useState(false);
    const [errorPasswordLength, setErrorPasswordLength] = React.useState(false);
    const [errorPasswordMatch, setErrorPasswordMatch] = React.useState(false);

    /* Getting the selected 'user' from the 'users' state in the redux store */
    const { users } = useSelector(state => state.usersReducer);
    const user = users.find(user => user._id === id);

    /* Checkbox For Password Change*/
    const handleCheckForPasswordChange = (event) => {
        setChecked(event.target.checked);
    }

    /* Final submit */
    const handleSubmitForUpdateUser = async (event) => {
        event.preventDefault();
        setErrorPasswordLength(false);
        setErrorPasswordMatch(false);

        /* Input Object Creation */
        const data = new FormData(event.currentTarget);
        const values = {
            username: data.get('userName'),
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
        };
        /* Final Dispatch Function  */
        const dispatchFunction = (values) => {
            /* action dispatch - redux */
            dispatch(
                updateUser(
                    id,
                    values,
                    setSuccessFlagForSubmit,
                    setErrorFlagForSubmit,
                    navigate
                )
            );
        };
        /* ------------------------------------------
        If 'checked' for a password change then,
        ---------------------------------------------
        Validation Functionalities for Password */
        if (checked) {
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
            values['password'] = data.get('password');
            const passwordLength = passwordLengthFn(values.password);
            const matchPassword = matchPasswordFn(values.password, data.get('confirmPassword'));

            /* Final Submission Code with Password */
            if (passwordLength && matchPassword) {
                /* calling function to dispatch - redux */
                dispatchFunction(values);
            }
            else {
                return false;
            }
        }
        /* Final Submission Without Password */
        else {
            /* calling function to dispatch - redux */
            dispatchFunction(values);
        };

    };

    return (
        <React.Fragment>
            <Header />
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
                        <Typography component="h1" variant="h5">
                            <EditIcon /> Edit User
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
                        <Box component="form" onSubmit={handleSubmitForUpdateUser} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        defaultValue={user.username}
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        autoComplete="user-name"
                                        onChange={() => setErrorPasswordMatch(false)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        defaultValue={user.firstname}
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
                                        defaultValue={user.lastname}
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
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheckForPasswordChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Chip
                                        label="Change Password? (Select/Check to see options)"
                                        variant="outlined" color="primary"
                                        sx={{ color: deepOrange[400] }}
                                    />
                                </Grid>
                                {checked &&
                                    <>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="New Password"
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
                                    </>
                                }
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ my: 3 }}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>

    );
}