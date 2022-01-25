import React, {useState} from 'react'
//MUI Components
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider,IconButton, Typography,Tooltip,} from '@mui/material'
import { HomeIcon, AccountCircleRoundedIcon, LogoutOutlinedIcon } from '@mui/icons-material';

//Menu OPtions
const MENU_OPTIONS = [
    {
        label: 'Home',
        icon: HomeIcon,
        iconColor: primary,
        linkTo: '#'
    },
    {
        label: 'Profile',
        icon: AccountCircleRoundedIcon,
        iconColor: primary,
        linkTo: '#'
    },
    {
        label: 'Logout',
        icon: LogoutOutlinedIcon,
        iconColor: primary,
        linkTo: '#'
    },
    
]

function AvatarDropdown() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <React.Fragment>
        <Box sm={{ display: 'flex', alignItems: 'center', textalign: 'center'}}>
            <Tooltip title = 'Account Settings'>
                <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ml:2}}
                    aria-controls = {open ? 'account-menu' : undefined}
                    aria-haspopup = 'true'
                    aria-expanded = {open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 32, height:32 }}>name</Avatar>
                </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elavation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow (0px2px 8px rgba(0,0,0,0.32)) ',
                    mt: '1.5',
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background-paper',
                        transform: 'trnaslateY(-50%) rotate(45deg) ',
                        zindex: 0
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom'}}
        >
            <Typography variant="subtitle1" noWrap>
                Account Name
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                Email Address
            </Typography>
           
            <Divider sx={{ my: 1 }}/>
            
            {MENU_OPTIONS.map((option) => (
                <MenuItem
                    key={option.label}
                    LinkComponent={option.linkTo}
                >
                    <Box  
                        component={Icon}
                        icon={option.icon}
                        sx={{color: option.iconColor}}
                    />
                    {option.label}
                </MenuItem>
            ))}
        </Menu>    
        </React.Fragment>
    )
}

export default AvatarDropdown