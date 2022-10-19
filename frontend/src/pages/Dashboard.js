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
import { makeStyles } from "@mui/styles";


import { Box, Chip, Container, Modal, TableContainer, TablePagination, Tooltip, Typography } from '@mui/material';

import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../redux/actions/taskActions';

const useStyles = makeStyles({
    assign: {
        "&:hover": {
            color: '#3f51b5'
        }
    }
});

const Dashboard = () => {
    const classes = useStyles();
    const [openModal, setOpenModel] = useState(false);
    const [taskSelectedToView, setTaskSelectedToView] = useState({});

    const { username, email } = JSON.parse(localStorage.getItem('user'));
    const { tasks } = useSelector(state => state.tasksReducer);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);
    // console.log(tasks);

    // Custom functions
    const handleViewTaskModal = (e, id) => {
        e.preventDefault();
        setOpenModel(true);
        const task = tasks.find(task => task._id === id);
        setTaskSelectedToView(task);
    }
    return (
        <React.Fragment>
            <Header />
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    flexFlow: { xs: 'column wrap', sm: 'row' },
                    alignContent: { xs: 'flex-start' },
                    justifyContent: 'space-between',
                    margin: '0.4rem auto',
                    gap: 0.5
                }}
                >
                    <Chip
                        label={`USER: ${username}`}
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
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>SlNo.</TableCell>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Invited</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell colSpan={4} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tasks.map((task, idx) => (
                                <TableRow key={task._id}>
                                    <TableCell>{++idx}</TableCell>
                                    <TableCell>{task.task_name}</TableCell>
                                    <TableCell>{task.task_invited ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{task.task_status}</TableCell>

                                    <TableCell align="center">
                                        <Tooltip title="Assign Task">
                                            <IconButton
                                                aria-label="assign"
                                                sx={{
                                                    color: indigo[900],
                                                    fontSize: '1rem',
                                                    padding: '5px',
                                                    border: '1px solid'
                                                }}
                                                component={Link}
                                                to={`/assigntask/${task._id}`}
                                            >
                                                <span className={classes.assign}>Assign</span>
                                            </IconButton>
                                        </Tooltip>
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
        </React.Fragment >

    )
}

export default Dashboard;