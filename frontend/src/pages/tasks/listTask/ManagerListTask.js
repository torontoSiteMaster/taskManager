import React from 'react'

const ManagerListTask = () => {
    /* const tableRows = arr3.map((task, idx) => (
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
                                padding: '5px',
                                border: '1px solid'
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
    )); */
    return (
        <div>ManagerListTask</div>
    )
}

export default ManagerListTask