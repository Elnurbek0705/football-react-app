import React, { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const UserAvatar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar onClick={handleClick} sx={{ bgcolor: "#1976d2", cursor: "pointer" }}>
        <AccountCircle sx={{ fontSize: 32, color: "#fff",}} />
      </Avatar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            maxHeight: 48 * 4.5 + 8,
            width: "20ch",
            mt: 2,
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
        <MenuItem onClick={handleClose}>My favourites</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
