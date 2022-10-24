import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
const PageNotFound = () => {
    return (
        <div id="wrapper">
            <img src="https://i.imgur.com/qIufhof.png" alt="404" width="450px" />
            <div id="info">
                <h2>This page could not be found</h2>
            </div>
            <Button variant="outlined" sx={{ mt: 3, mb: 2 }}>
                <Link to="/login">Back to Login</Link>
            </Button>
        </div>
    )
}

export default PageNotFound;