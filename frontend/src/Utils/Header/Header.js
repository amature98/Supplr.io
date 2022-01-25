import React from 'react'
import PropTypes  from 'prop-types'

//MUI Components
import { Box, Grid,Typography } from '@mui/material'

function Header({text, title}) {
    return (
        <Box>
            <Grid 
                container 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant='h5' className='header-title'>{title}</Typography>
                    <Typography variant='h6'> {text} </Typography>       
                </Grid>
            </Grid>
        </Box>
    )
}

Header.propTypes = {
    text: PropTypes.string
}

export default Header
