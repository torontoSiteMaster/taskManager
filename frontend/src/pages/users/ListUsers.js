import * as React from 'react';
//import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import { indigo, deepOrange } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { TableContainer, Tooltip } from '@mui/material';

import Title from '../../components/Title';
import Header from '../../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions/userActions';


/* function preventDefault(event) {
    event.preventDefault();
} */

export default function Users() {
    const { users } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    // const user = JSON.parse(localStorage.getItem('user'));
    return (
        <React.Fragment>
            <Header />
            <Title>Users</Title>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>SlNo.</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell colSpan={2} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((user, idx) => (
                            <TableRow key={user._id}>
                                <TableCell>{++idx}</TableCell>
                                <TableCell>{user.firstname}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit User">
                                        <IconButton aria-label="edit" component={Link} to={`/edituser/${user._id}`}>
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
        </React.Fragment>
    );
}