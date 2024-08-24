import { useState } from "react";
import { CssBaseline, Box, Toolbar, List, Typography, Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppBar, Drawer } from "../../styled-components/styles";
import Logout from "../Logout";
import SideBar from "./SideBar";
import AdminProfile from "./AdminProfile";
import AdminHomePage from "./AdminHomePage";
import AccountMenu from "../../components/AccountMenu";

import AddStudent from "./studentRelated/AddStudent";
import SeeComplains from "./studentRelated/SeeComplains";
import ShowStudents from "./studentRelated/ShowStudents";
import StudentAttendance from "./studentRelated/StudentAttendance";
import ViewStudent from "./studentRelated/ViewStudent";

import AddNotice from "./noticeRelated/AddNotice";
import ShowNotices from "./noticeRelated/ShowNotices";

import ShowSubjects from "./subjectRelated/ShowSubjects";
import SubjectForm from "./subjectRelated/SubjectForm";
import ViewSubject from "./subjectRelated/ViewSubject";

import AddTeacher from "./teacherRelated/AddTeacher";
import ChooseClass from "./teacherRelated/ChooseClass";
import ShowTeachers from "./teacherRelated/ShowTeachers";
import TeacherDetails from "./teacherRelated/TeacherDetails";

import AddClass from "./classRelated/AddClass";
import ClassDetails from "./classRelated/ClassDetails";
import ShowClasses from "./classRelated/ShowClasses";
import ChooseSubject from "./teacherRelated/ChooseSubject";

const AdminDashboard = () => {
   const [open, setOpen] = useState(false);
   const toggleDrawer = () => {
      setOpen(!open);
   };

   return (
      <>
         <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar open={open} position='absolute'>
               <Toolbar sx={{ pr: "24px" }}>
                  <IconButton
                     edge='start'
                     color='inherit'
                     aria-label='open drawer'
                     onClick={toggleDrawer}
                     sx={{
                        marginRight: "36px",
                        ...(open && { display: "none" }),
                     }}>
                     <MenuIcon />
                  </IconButton>
                  <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
                     Admin Dashboard
                  </Typography>
                  <AccountMenu />
               </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
               <Toolbar sx={styles.toolBarStyled}>
                  <IconButton onClick={toggleDrawer}>
                     <ChevronLeftIcon />
                  </IconButton>
               </Toolbar>
               <Divider />
               <List component='nav'>
                  <SideBar />
               </List>
            </Drawer>
            <Box component='main' sx={styles.boxStyled}>
               <Toolbar />
               <Routes>
                  <Route path='/' element={<AdminHomePage />} />
                  <Route path='*' element={<Navigate to='/' />} />
                  <Route path='/Admin/dashboard' element={<AdminHomePage />} />
                  <Route path='/Admin/profile' element={<AdminProfile />} />
                  <Route path='/Admin/complains' element={<SeeComplains />} />

                  <Route path='/Admin/addevent/:id' element={<SubjectForm />} />
                  <Route path='/Admin/house/event/:classID/:subjectID' element={<ViewSubject />} />

                  {/* Notice */}
                  <Route path='/Admin/addnotice' element={<AddNotice />} />
                  <Route path='/Admin/notices' element={<ShowNotices />} />
                  {/* Class */}
                  <Route path='/Admin/addhouse' element={<AddClass />} />
                  <Route path='Admin/houses' element={<ShowClasses />} />
                  <Route path='Admin/houses/house/:id' element={<ClassDetails />} />
                  <Route path='/Admin/house/addhousemembers/:id' element={<AddStudent situation='Class' />} />
                  {/* Student */}
                  <Route path='/Admin/addhousemembers' element={<AddStudent situation='Student' />} />
                  <Route path='/Admin/housemembers' element={<ShowStudents />} />
                  <Route path='/Admin/housemembers/hmember/:id' element={<ViewStudent />} />
                  <Route path='/Admin/housemembers/hmember/attendance/:id' element={<StudentAttendance situation='Student' />} />
                  <Route path='/Admin/hleaders' element={<ShowTeachers />} />
                  <Route path='/Admin/hleaders/hleader/:id' element={<TeacherDetails />} />
                  <Route path='/Admin/hleaders/choosehouse' element={<ChooseClass situation='Teacher' />} />
                  <Route path='/Admin/hleaders/choose-event/:id' element={<ChooseSubject situation='Norm' />} />
                  <Route path='/Admin/hleaders/choose-event/:houseID/:hLeaderID' element={<ChooseSubject situation='Teacher' />} />
                  <Route path='/Admin/hleaders/addhLeader/:id' element={<AddTeacher />} />
                  <Route path='/logout' element={<Logout />} />
               </Routes>
            </Box>
         </Box>
      </>
   );
};

export default AdminDashboard;

const styles = {
   boxStyled: {
      backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
   },
   toolBarStyled: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      px: [1],
   },
   drawerStyled: {
      display: "flex",
   },
   hideDrawer: {
      display: "flex",
      "@media (max-width: 600px)": {
         display: "none",
      },
   },
};
