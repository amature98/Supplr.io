import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, ClickAwayListener, IconButton, Input, InputAdornment, Slide } from '@mui/material';

function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () =>{
        setIsOpen((prev) => !prev)
    }

    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div>
                {!isOpen && (
                    <IconButton onClick={handleOpen}>
                        <SearchIcon width={20} height={20} />
                    </IconButton>
                )}

                <Slide direction='down' in={isOpen} mountOnEnter unmountOnExit>
                    <Input 
                        autoFocus
                        fullWidth
                        disableUnderline
                        placeholder='Search...'
                        sx={{ mr: 1, fontWeight: 'fontWeightBold'}}
                        startAdornment={
                            <InputAdornment position='start'>
                                <Box 
                                    sx={{ color: 'text.disabled', width: 20, height: 20}}
                                >
                                    <SearchIcon />
                                </Box>
                            </InputAdornment>
                        }
                    />
                    <Button variant='contained' onClick={handleClose}>
                        Search
                    </Button>
                </Slide>
            </div>
        </ClickAwayListener>
    )
}

export default SearchBar
