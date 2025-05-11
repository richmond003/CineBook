import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { Fragment, useState } from "react"
import { useAuth } from "../context/AuthenContext";
import { useNavigate } from "react-router";

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

function UserMenu(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const fname = user.user.fname;
   console.log("first name:", fname)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null)
    
    const signOut = () =>{
        logout();
        navigate("/login")
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
                    <Avatar sx={{width: 32, height: 32}} {...stringAvatar(fname || "")}/>
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
                    <MenuItem onClick={()=>{
                        handleClose();
                        signOut()
                        }}>
                        LogOut
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleClose();
                        }}>
                        Delect Account
                    </MenuItem>
                </Menu>
            </Fragment>
        </>
    )
}

export default UserMenu