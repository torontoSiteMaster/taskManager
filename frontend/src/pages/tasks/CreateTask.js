import * as React from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
/* ----------- */
import { Checkbox, Chip } from '@mui/material';
import Header from '../../components/header/Header';
import Title from '../../components/Title';

const theme = createTheme();

export default function CreateTask() {
    const handleSubmitForCreateTask = () => {
        console.log('create user final values');
    }

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
                        <Typography variant="h5">
                            <Title><AddIcon /> Add a new Task</Title>
                        </Typography>

                        <Box component="form" onSubmit={handleSubmitForCreateTask} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        //defaultValue={user.username}
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        name="userName"
                                        autoComplete="user-name"
                                    //onChange={() => setErrorPasswordMatch(false)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        //defaultValue={user.firstname}
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                    //onChange={() => setErrorPasswordMatch(false)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        //defaultValue={user.lastname}
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    //onChange={() => setErrorPasswordMatch(false)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Checkbox
                                        //checked={checked}
                                        //onChange={handleCheckForPasswordChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <Chip
                                        label="Change Password? (Select/Check to see options)"
                                        variant="outlined" color="primary"
                                        sx={{ color: deepOrange[400] }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ my: 3 }}
                            >
                                Add Task
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>

    );
}