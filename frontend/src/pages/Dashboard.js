import React, { Fragment, useState } from 'react';
import Header from '../components/header/Header';
import { Link } from "react-router-dom";
import { indigo, deepOrange, purple } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ViewIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { makeStyles } from "@mui/styles";
import Paper from '@mui/material/Paper';
import { Box, Chip, Container, Modal, TableContainer, Tooltip, Typography } from '@mui/material';

import Title from '../components/Title';
import SearchBar from './tasks/listTaskComponents/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignedTasks, getTasks } from '../redux/actions/taskActions';

const useStyles = makeStyles({
    assign: {
        "&:hover": {
            color: '#FF8C00',
        }
    },
    assigned: {
        color: '#056608',
        fontWeight: '600'
    }
});

const Dashboard = () => {
    const classes = useStyles();
    const [openModal, setOpenModel] = useState(false);
    const [taskSelectedToView, setTaskSelectedToView] = useState({});
    const [search, setSearch] = useState('');

    const { _id: currentUserID, username, email, userrole } = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTasks());
        dispatch(getAssignedTasks());
    }, [dispatch]);
    const { tasks } = useSelector(state => state.tasksReducer);
    const { assignedTasks } = useSelector(state => state.assignedTasksReducer);
    /* removing _id from assignedTasks, to avoid collision with tasks._id while merging */
    assignedTasks.forEach(function (v) { delete v._id });

    /* creating a new array combining 'tasks' and 'assignedTasks'  */
    //let tasksInfo = assignedTasks.map(v => ({ ...v, ...tasks.find(sp => v.task_id === sp._id) }))
    let originalTasksInfo = tasks.map(v => ({ ...v, ...assignedTasks.find(sp => sp.task_id === v._id) }))

    /* state for tasksInfo */
    const [tasksInfo, setTasksInfo] = useState(originalTasksInfo);

    /* Manager Dashboard - tableRows */
    const tableRowsForManager = tasksInfo.map((task, idx) => (
        <TableRow key={task._id}>
            <TableCell>{++idx}</TableCell>
            <TableCell>{task.task_name}</TableCell>
            <TableCell>{task.task_invited ? 'Yes' : 'No'}</TableCell>
            <TableCell>{task.task_status}</TableCell>

            <TableCell align="center">

                {task['task_id'] ?
                    <span className={classes.assigned}>
                        Assigned
                        <AssignmentTurnedInIcon fontSize="small" />
                    </span>
                    :
                    <Tooltip title="Assign Task">
                        <IconButton
                            aria-label="assign"
                            sx={{
                                color: deepOrange[900],
                                fontSize: '1rem',
                                //padding: '5px',
                                //border: '1px solid'
                            }}
                            component={Link}
                            to={`/assigntask/${task._id}`}
                        >
                            <span className={classes.assign}>Assign</span>
                        </IconButton>
                    </Tooltip>
                }

            </TableCell>
            <TableCell align="right">
                <Tooltip title="View Task">
                    <IconButton aria-label="view" onClick={e => handleViewTaskModal(e, task._id)}>
                        <ViewIcon sx={{ color: purple[400] }} />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell align="center">
                <Tooltip title="Edit">
                    <IconButton aria-label="edit" component={Link} to={`/`}>
                        <EditIcon sx={{ color: indigo[400] }} />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell>
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon sx={{ color: deepOrange[300] }} />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    ));
    /* Staff Dashboard - tableRows */
    const tableRowsForStaff = tasksInfo.map((task, idx) => (
        (currentUserID === task.assignee_user_id) ?
            <TableRow key={task._id}>
                <TableCell>{++idx}</TableCell>
                <TableCell>{task.task_name}</TableCell>
                <TableCell>{task.task_invited ? 'Yes' : 'No'}</TableCell>
                <TableCell>{task.task_status}</TableCell>
                <TableCell align="center">
                    <Tooltip title="Invite Task">
                        <IconButton
                            aria-label="invitation"
                            sx={{
                                color: deepOrange[900],
                                fontSize: '1rem',
                                //padding: '5px',
                                //border: '1px solid'
                            }}
                            component={Link}
                            to={`/invitetask/${task._id}`}
                        >
                            <span className={classes.assign}>Invite</span>
                        </IconButton>
                    </Tooltip>
                </TableCell>

                <TableCell align="center">
                    <Tooltip title="View Task">
                        <IconButton
                            aria-label="view"
                            onClick={e => handleViewTaskModal(e, task._id)}
                        >
                            <ViewIcon sx={{ color: purple[400] }} />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            :
            null
    ));
    /**********************
    // Search functionality
    ***********************/
    const onSearchChange = (searchedVal) => {
        if (searchedVal) {
            const filteredRows = originalTasksInfo.filter((row) => {
                return row.task_name.toLowerCase().includes(searchedVal.toLowerCase());
            });
            setTasksInfo(filteredRows);
        }
        else {
            setTasksInfo(originalTasksInfo);
        }
        setSearch(searchedVal);
    };
    const cancelSearch = (val) => {
        onSearchChange(val);
    };
    // Custom functions - View functionality
    const handleViewTaskModal = (e, id) => {
        e.preventDefault();
        setOpenModel(true);
        const task = tasks.find(task => task._id === id);
        setTaskSelectedToView(task);
    }

    return (
        <Fragment>
            <Header />
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    flexFlow: { xs: 'column wrap', sm: 'row' },
                    alignContent: { xs: 'flex-start' },
                    justifyContent: 'space-between',
                    margin: '0.4rem auto 2.5rem',
                    gap: 0.5
                }}
                >
                    <Chip
                        label={`USER: ${username}`}
                        variant="contained" color="primary"
                        sx={{ color: deepOrange[50], fontSize: '1rem' }}
                    />
                    <Chip
                        label={`ROLE: ${userrole}`}
                        variant="contained" color="primary"
                        sx={{ color: deepOrange[50], fontSize: '1rem' }}
                    />
                    <Chip
                        label={email}
                        variant="outlined" color="primary"
                        sx={{ color: deepOrange[600], fontSize: '1rem' }}
                    />
                </Box>
                <Title>List of Tasks</Title>
                <Paper>
                    <SearchBar onSearch={onSearchChange} value={search} cancelSearch={cancelSearch} />
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>SlNo.</TableCell>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Invited</TableCell>
                                    {/* <TableCell>Inviter/Invitee</TableCell> */}
                                    <TableCell>Status</TableCell>
                                    <TableCell colSpan={4} align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userrole === 'Manager' ? tableRowsForManager : tableRowsForStaff}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </Container>

            <Modal
                sx={{
                    bgcolor: 'darkblue'
                }}
                open={openModal}
                onClose={() => setOpenModel(false)}
            >
                <Box position="absolute" top="10%" left="5%" color="#ffffff">
                    <Typography variant="h4">Task:</Typography>
                    <Typography variant="h5" gutterBottom>
                        {taskSelectedToView.task_name}
                    </Typography>
                    <Typography variant="h4">Description:</Typography>
                    <Typography variant="h6" gutterBottom>
                        {taskSelectedToView.task_description}
                    </Typography>
                    <Typography variant="h4">Deadline:</Typography>
                    <Typography variant="h5" gutterBottom>
                        {taskSelectedToView.task_deadline_date}
                    </Typography>
                </Box>
            </Modal>

            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={10} // totalRows-This is what your request should be returning in addition to the current page of rows.
                rowsPerPage={10}  // rowsPerPage
                page={0} // page
            //onPageChange={handleChangePage}
            //onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
        </Fragment >

    )
}

export default Dashboard;