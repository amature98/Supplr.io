import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { set, sub, formatDistanceToNow } from 'date-fns'
//Components
import { Avatar, Badge, Box, Divider, IconButton, List, ListItemAvatar, ListItemText, ListSubheader, Menu, Tooltip, Typography } from '@mui/material'
import { ShoppingBasketIcon, LocalShippingIcon, WatchLaterIcon, NotificationsIcon, CheckRoundedIcon} from '@mui/icons-material';

const id = Math.floor(Math.random() * 100)
//notification Object
const NOTIFICATION = [
    {
        uid: id,
        type: 'order_placed',
        title: 'Your order has been placed',
        description: 'Your order is being shipped',
        createdAt: set(new Date(), { hours: 3, minutes: 10 }),
        isUnRead:true,
    },
    {
        uid: id,
        type: 'order_placed',
        title: 'Your order has been placed',
        description: 'Your order is being shipped',
        createdAt: set(new Date(), { hours: 5, minutes: 30 }),
        isUnRead:true,
    },
    {
        uid: id,
        type: 'order_placed',
        title: 'Your order has been placed',
        description: 'Your order is being shipped',
        createdAt: sub(new Date(), { hours: 6, minutes: 30 }),
        isUnRead:false,
    },
    {
        uid: id,
        type: 'order_placed',
        title: 'Your order has been placed',
        description: 'Your order is being shipped',
        createdAt: sub(new Date(), {day: 1, hours: 8, minutes: 30 }),
        isUnRead:false,
    },
]

function renderNotification(notification) {
    const title = (
        <Typography>
            <Typography variant = 'h6'> {notification.title} </Typography>
            <Typography component='span' variant = 'h6'> {notification.description} </Typography>
        </Typography>
    )
    if (notification.type === 'order_placed') {
        return {
            avatar: ShoppingBasketIcon,
            title
        }
    }
    if (notification.type === 'order_shipped') {
        return {
            avatar: LocalShippingIcon,
            title
        }
    }
}

NotificationItem.propTypes = {
    notification: PropTypes.object.isRequired
}

function NotificationItem({notification}) {
    const { avatar, title } = renderNotification(notification)

    return (
        <ListItem 
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
                ...(notification.isUnRead && {
                bgcolor: 'action.selected'
                })
            }}
        >
            <ListItemAvatar>
                <Avatar sx = {{ bgcolor= 'background'}}> {avatar} </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.disabled'
                    }}
                  >
                    <Box component={Icon} icon={ WatchLaterIcon } sx={{ mr: 0.5, width: 16, height: 16 }} />
                    {formatDistanceToNow(new Date(notification.createdAt))}
                  </Typography>
                }
            >
            </ListItemText>
        </ListItem>
    )
}

function NotificationPopup() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [notifications, setNotifications] = useState(NOTIFICATION)
    const open = Boolean(anchorEl)
    const totalUnRead = notifications.filter((item) => item.isUnRead === true).length

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = (event) => {
        setAnchorEl(null)
    }

    const handleMarkAllAsRead = () =>{
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                isUnRead: false
            }))
        )
    }

    return(
        <>
            <Box sx={{ display:'flex', alignnItems: 'center', textAlign: 'center'}}>
                <Tooltip title='Notifications'>
                    <IconButton
                        onClick={handleClick}
                        size='small'
                        sx={{ ml:2 }}
                        aria-controls={open ? 'notification-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Badge badgeContent={totalUnRead} color='error'>
                            <Avatar sx={{ width: 32, height: 32}}> <NotificationsIcon /> </Avatar>
                        </Badge>
                    </IconButton>    
                </Tooltip>
            </Box>
            <Menu 
                anchorEl={anchorEl}
                id='notification-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClick}
                sx={{ width: 360 }}
            >
                <Box sx={{ display: 'flex', alignitems: 'center', py: 2, px: 2.5}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='subtitle'>Notifications</Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            You have { totalUnRead } unread messages
                        </Typography>
                    </Box>

                    { totalUnRead > 0 && (
                        <Tooltip title='Mark all as read'>
                            <IconButton color='primary' onClick={handleMarkAllAsRead}>
                                <CheckRoundedIcon width={32} height={32} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                <Divider />

                <List
                    disablePadding
                    sx={{ width: '100%', maxWidth: 360 }}
                    aria-labelledby='new-notifications'
                    subheader={
                        <ListSubheader disableSticky sx={{py:1, px:2.5, typography: 'outlined'}} id='new-nontifications'>
                            Just in 
                        </ListSubheader>
                    }
                >
                    {notifications.slice(0,5).map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </List>

                <Divider />

                <Box sx={{ p:1 }}>
                    <Button fullwidth to='/Notifications'>
                        View All
                    </Button>
                </Box>
            </Menu>
        </>
    )
}

export default NotificationPopup
