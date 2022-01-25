import React from 'react'
import { Box } from '@mui/material'

function Logo(sx) {
    return (
        <Box component = 'img' src='' alt='LOGO' sx={{ width: 40, height: 40, ...sx }} />
    )
}

export default Logo
