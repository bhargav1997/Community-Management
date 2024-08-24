import * as React from "react";
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";

const StudentSideBar = () => {
   const location = useLocation();
   return (
      <>
         <React.Fragment>
            <ListItemButton component={Link} to='/'>
               <ListItemIcon>
                  <HomeIcon color={location.pathname === ("/" || "/HouseMember/dashboard") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Home' />
            </ListItemButton>
            <ListItemButton component={Link} to='/HouseMember/events'>
               <ListItemIcon>
                  <AssignmentIcon color={location.pathname.startsWith("/HouseMember/events") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Subjects' />
            </ListItemButton>
            <ListItemButton component={Link} to='/HouseMember/attendance'>
               <ListItemIcon>
                  <ClassOutlinedIcon color={location.pathname.startsWith("/HouseMember/attendance") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Attendance' />
            </ListItemButton>
            <ListItemButton component={Link} to='/HouseMember/complain'>
               <ListItemIcon>
                  <AnnouncementOutlinedIcon color={location.pathname.startsWith("/HouseMember/complain") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Complain' />
            </ListItemButton>
         </React.Fragment>
         <Divider sx={{ my: 1 }} />
         <React.Fragment>
            <ListSubheader component='div' inset>
               User
            </ListSubheader>
            <ListItemButton component={Link} to='/HouseMember/profile'>
               <ListItemIcon>
                  <AccountCircleOutlinedIcon color={location.pathname.startsWith("/HouseMember/profile") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Profile' />
            </ListItemButton>
            <ListItemButton component={Link} to='/logout'>
               <ListItemIcon>
                  <ExitToAppIcon color={location.pathname.startsWith("/logout") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Logout' />
            </ListItemButton>
         </React.Fragment>
      </>
   );
};

export default StudentSideBar;
