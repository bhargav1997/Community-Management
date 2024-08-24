import * as React from "react";
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";

const SideBar = () => {
   const location = useLocation();
   return (
      <>
         <React.Fragment>
            <ListItemButton component={Link} to='/'>
               <ListItemIcon>
                  <HomeIcon color={location.pathname === ("/" || "/Admin/dashboard") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Home' />
            </ListItemButton>
            <ListItemButton component={Link} to='Admin/houses'>
               <ListItemIcon>
                  <ClassOutlinedIcon color={location.pathname.startsWith("Admin/houses") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Houses' />
            </ListItemButton>
            <ListItemButton component={Link} to='/Admin/subjects'>
               <ListItemIcon>
                  <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Events' />
            </ListItemButton>
            <ListItemButton component={Link} to='/Admin/hleaders'>
               <ListItemIcon>
                  <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/hleaders") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='House Leaders' />
            </ListItemButton>
            <ListItemButton component={Link} to='/Admin/housemembers'>
               <ListItemIcon>
                  <PersonOutlineIcon color={location.pathname.startsWith("/Admin/housemembers") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='House Members' />
            </ListItemButton>
            <ListItemButton component={Link} to='/Admin/notices'>
               <ListItemIcon>
                  <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Notices' />
            </ListItemButton>
            <ListItemButton component={Link} to='/Admin/complains'>
               <ListItemIcon>
                  <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? "primary" : "inherit"} />
               </ListItemIcon>
               <ListItemText primary='Complains' />
            </ListItemButton>
         </React.Fragment>
         <Divider sx={{ my: 1 }} />
         <React.Fragment>
            <ListSubheader component='div' inset>
               User
            </ListSubheader>
            <ListItemButton component={Link} to='/Admin/profile'>
               <ListItemIcon>
                  <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? "primary" : "inherit"} />
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

export default SideBar;
