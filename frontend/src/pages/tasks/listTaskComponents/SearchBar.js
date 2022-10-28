import React, { Fragment } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


const SearchBar = (props) => {
    return (
        <Fragment>
            <FormControl sx={{ m: 2, paddingLeft: '15px', width: '90%' }}>
                <InputLabel htmlFor='outlined-adornment-amount'>Search Task</InputLabel>
                <OutlinedInput
                    id='outlined-adornment-amount'
                    onChange={(e) => props.onSearch(e.target.value.toLowerCase())}
                    value={props.value}
                    startAdornment={
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    }
                    endAdornment={
                        <IconButton onClick={() => props.cancelSearch("")} position='end'>
                            <CloseIcon />
                        </IconButton>}
                    label='Search'
                />
            </FormControl></Fragment>

    )
}

export default SearchBar;