import * as React from 'react';
import { Link } from "react-router-dom";
import { blue } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Header from '../../components/header/Header';
import { Container, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Title from '../../components/Title';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ResponsiveStack() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            <Header />
            <Title>User Profile</Title>
            <Container component="main" maxWidth="xs">
                <Stack
                    spacing={{ xs: 2, sm: 4 }}
                >
                    <Item>User Name: {user.username}</Item>
                    <Item>Email: {user.email}</Item>
                    <Item>Name: {user.firstname} {user.lastname}</Item>
                    <Item>User Role: {user.userrole}</Item>
                </Stack>
                <Button
                    sx={{ mt: 5 }}
                    aria-label="edit"
                    variant="outlined"
                    component={Link} to={`/edituser/${user._id}`}>
                    <EditIcon sx={{ color: blue[400] }} /> Edit Profile
                </Button>
            </Container>
        </div>
    );
}
