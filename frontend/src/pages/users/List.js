import * as React from 'react';
//import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Header from '../../components/header/Header';


/* function preventDefault(event) {
    event.preventDefault();
} */

export default function Users() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <React.Fragment>
            <Header />
            <Title>Users</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow key={user._id}>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>

                    {/* {user.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.firstname}</TableCell>
                            <TableCell>{row.lastname}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
            {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link> */}
        </React.Fragment>
    );
}