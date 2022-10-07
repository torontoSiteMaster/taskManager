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
                        <Typography variant="div">
                            <Title><AddIcon /> Add a new Task</Title>
                        </Typography>

                        <Box component="form" onSubmit={handleSubmitForCreateTask} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        //defaultValue={user.username}
                                        required
                                        fullWidth
                                        id="taskName"
                                        label="Task Name"
                                        name="taskName"
                                        autoComplete="task-name"
                                    //onChange={() => setErrorPasswordMatch(false)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        //defaultValue={user.firstname}
                                        autoComplete="task-description"
                                        name="taskDescription"
                                        required
                                        fullWidth
                                        id="taskDescription"
                                        label="Task Description"
                                        multiline={true}
                                        rows={3}
                                    //onChange={() => setErrorPasswordMatch(false)}
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