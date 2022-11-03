import * as React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* ----------- */
import { getTasks, inviteTask } from '../../redux/actions/taskActions';
/* ----------- */
/* Material UI */
/* ----------- */
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../../components/header/Header';
import Title from '../../components/Title';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getUsers } from '../../redux/actions/userActions';

const theme = createTheme();

export default function CreateTask() {
    const { id: taskID } = useParams()  // get the task id from params
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /* current user id to be checked and filtered from the users object */
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    /* State */
    const [errorFlagForSubmit, setErrorFlagForSubmit] = React.useState(false);
    const [selectedInviteeUser, setSelectedInviteeUser] = React.useState('');

    /* Getting the selected 'task' from the 'tasks' state in the redux store */
    React.useEffect(() => {
        dispatch(getTasks());
        dispatch(getUsers());
    }, [dispatch]);
    const { tasks } = useSelector(state => state.tasksReducer);
    const selectedTask = tasks.find(task => task._id === taskID);
    const { _id: selectedTaskID, task_name } = selectedTask;

    /* Fetching all users to populate  */
    const { users } = useSelector(state => state.usersReducer);

    /* Task to be invited from the team staff(invitee) list 
    excluding current user(Inviter) and the Manager (the task-assignor) */
    const teamStaffOfUsers = users.filter(user =>
        user._id !== userID && user.userrole !== "Manager"
    );

    const handleSelectInviteeUser = (event) => {
        setSelectedInviteeUser(event.target.value);
    };

    const handleSubmitForInviteTask = (event) => {
        event.preventDefault();
        const values = {
            inviter_user_id: userID,
            task_id: selectedTaskID,
            invitee_user_id: selectedInviteeUser
        };
        //console.log(values);
        /* action dispatch - redux */
        dispatch(inviteTask(values, setErrorFlagForSubmit, navigate));
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
                        <Typography variant="div">
                            <Title><AssignmentIcon /> Invite the Task</Title>
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
                        <Box component="form" onSubmit={handleSubmitForInviteTask} sx={{ mt: 3 }}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <InputLabel>Task Name</InputLabel>
                                    <Input
                                        id="taskName"
                                        readOnly
                                        value={task_name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="inviteeUserLabel">Select the Team Member</InputLabel>
                                        <Select
                                            labelId="inviteeUserLabel"
                                            id="inviteeUser"
                                            value={selectedInviteeUser}
                                            label="Select the Team Member"
                                            onChange={handleSelectInviteeUser}
                                        >
                                            {
                                                teamStaffOfUsers.map((user) => (
                                                    <MenuItem
                                                        key={user._id}
                                                        value={user._id}
                                                    >
                                                        {user.email}
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
                                sx={{ my: 5 }}
                            >
                                Invite
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </React.Fragment>

    );
}