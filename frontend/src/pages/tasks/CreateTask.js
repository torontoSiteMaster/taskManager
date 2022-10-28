import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* ----------- */
import { createTask, getTasks } from '../../redux/actions/taskActions';
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
import Header from '../../components/header/Header';
import Title from '../../components/Title';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const theme = createTheme();

export default function CreateTask() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* user id to be passed to task object */
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    /* State */
    const [errorFlagForSubmit, setErrorFlagForSubmit] = React.useState(false);
    const [selectedPreceedingTask, setSelectedPreceedingTask] = React.useState('');
    const [selectedFollowingTask, setSelectedFollowingTask] = React.useState('');

    React.useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);
    const { tasks } = useSelector(state => state.tasksReducer);

    const handleSelectedPreceedingTask = (event) => {
        setSelectedPreceedingTask(event.target.value);
    };
    const handleSelectedFollowingTask = (event) => {
        setSelectedFollowingTask(event.target.value);
    };

    const handleSubmitForCreateTask = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const values = {
            task_name: data.get('taskName'),
            task_description: data.get('taskDescription'),
            preceeding_task_id: selectedPreceedingTask,
            following_task_id: selectedFollowingTask,
            user_id: userID
        };
        /* action dispatch - redux */
        dispatch(createTask(values, setErrorFlagForSubmit, navigate));
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

                        {
                            errorFlagForSubmit ?
                                <Snackbar open={true} autoHideDuration={6000}>
                                    <Alert severity="error" sx={{ width: '100%' }}>
                                        Error! Try again later.
                                    </Alert>
                                </Snackbar>
                                :
                                null
                        }

                        <Box component="form" onSubmit={handleSubmitForCreateTask} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="taskName"
                                        label="Task Name"
                                        name="taskName"
                                        autoComplete="task-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        autoComplete="task-description"
                                        name="taskDescription"
                                        fullWidth
                                        id="taskDescription"
                                        label="Task Description"
                                        multiline={true}
                                        rows={3}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="preceedingTaskLabel">Preceeding Task</InputLabel>
                                        <Select
                                            required
                                            labelId="preceedingTaskLabel"
                                            id="preceedingTask"
                                            value={selectedPreceedingTask}
                                            label="Select Preceeding Task"
                                            onChange={handleSelectedPreceedingTask}
                                        >
                                            {
                                                tasks.map((task) => (
                                                    <MenuItem
                                                        key={task._id}
                                                        value={task._id}
                                                    >
                                                        {task.task_name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="followingTaskLabel">Following Task</InputLabel>
                                        <Select
                                            required
                                            labelId="followingTaskLabel"
                                            id="followingTask"
                                            value={selectedFollowingTask}
                                            label="Select Following Task"
                                            onChange={handleSelectedFollowingTask}
                                        >
                                            {
                                                tasks.map((task) => (
                                                    <MenuItem
                                                        key={task._id}
                                                        value={task._id}
                                                    >
                                                        {task.task_name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
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