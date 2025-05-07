import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { Fragment, useState } from "react"

function UserMenu(){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    return(
        <>
            <Fragment>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="Large"
                        aria-controls={open? 'account-menu' : undefined}
                        aria-haspopup= 'true'
                        aria-expanded={open ? 'true' : undefined}
                    >
                    <Avatar sx={{width: 32, height: 32}}>R</Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open = {open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                                },
                                '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{horizontal: "right", vertical: "top"}}
                    anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                >
                    <MenuItem onClick={handleClose}>
                        LogOut
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        Delect Account
                    </MenuItem>
                </Menu>
            </Fragment>
        </>
    )
}

export default UserMenu