import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { Paper, Box, IconButton, CircularProgress, Container, Grid, Menu } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { BlackButton, BlueButton, GreenButton } from "../../../styled-components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popup from "../../../components/Popup";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";

const ShowStudents = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { studentsList, loading, error, response } = useSelector((state) => state.student);
   const { currentUser } = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(getAllStudents(currentUser._id));
   }, [currentUser._id, dispatch]);

   if (error) {
      console.log(error);
   }

   const [showPopup, setShowPopup] = React.useState(false);
   const [message, setMessage] = React.useState("");

   const deleteHandler = (deleteID, address) => {
      console.log(deleteID);
      console.log(address);
      setMessage("Sorry the delete function has been disabled for now.");
      setShowPopup(true);

      // dispatch(deleteUser(deleteID, address))
      //     .then(() => {
      //         dispatch(getAllStudents(currentUser._id));
      //     })
   };

   const studentColumns = [
      { id: "name", label: "Name", minWidth: 170 },
      { id: "rollNum", label: "Phone Number", minWidth: 100 },
      { id: "sclassName", label: "Class", minWidth: 170 },
   ];

   const studentRows =
      studentsList &&
      studentsList.length > 0 &&
      studentsList.map((student) => {
         return {
            name: student.name,
            rollNum: student.rollNum,
            sclassName: student.sclassName.sclassName,
            id: student._id,
         };
      });

   const StudentButtonHaver = ({ row }) => {
      const options = ["Take Attendance", "Provide Marks"];

      const [open, setOpen] = React.useState(false);
      const anchorRef = React.useRef(null);
      const [selectedIndex, setSelectedIndex] = React.useState(0);

      const handleClick = () => {
         console.info(`You clicked ${options[selectedIndex]}`);
         if (selectedIndex === 0) {
            handleAttendance();
         } else if (selectedIndex === 1) {
            handleMarks();
         }
      };

      const handleAttendance = () => {
         navigate("/Admin/housemembers/hmember/attendance/" + row.id);
      };
      const handleMarks = () => {
         navigate("/Admin/housemembers/hmember/marks/" + row.id);
      };

      const handleMenuItemClick = (event, index) => {
         setSelectedIndex(index);
         setOpen(false);
      };

      const handleToggle = () => {
         setOpen((prevOpen) => !prevOpen);
      };

      const handleClose = (event) => {
         if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
         }

         setOpen(false);
      };
      return (
         <>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}>
               <PersonRemoveIcon color='error' />
            </IconButton>
            <BlueButton variant='contained' onClick={() => navigate("/Admin/housemembers/hmember/" + row.id)}>
               View
            </BlueButton>
            <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button' sx={{ m: 2 }}>
               <Button onClick={handleClick}>{options[selectedIndex]}</Button>
               {/* <BlackButton
                  size='small'
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label='select merge strategy'
                  aria-haspopup='menu'
                  onClick={handleToggle}>
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
               </BlackButton> */}
               {/* <Menu id='split-button-menu' anchorEl={anchorRef.current} open={open} onClose={() => setOpen(false)}>
                  {options.map((option, index) => (
                     <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                        {option}
                     </MenuItem>
                  ))}
               </Menu> */}
            </ButtonGroup>
         </>
      );
   };

   const actions = [
      {
         icon: <PersonAddAlt1Icon color='primary' />,
         name: "Add New Student",
         action: () => navigate("/Admin/addhousemembers"),
      },
      {
         icon: <PersonRemoveIcon color='error' />,
         name: "Delete All Students",
         action: () => deleteHandler(currentUser._id, "Students"),
      },
   ];

   return (
      <>
         {loading ? (
            <CircularProgress color='primary' />
         ) : (
            <>
               {response ? (
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                     <GreenButton variant='contained' onClick={() => navigate("/Admin/addhousemembers")}>
                        Add House Members
                     </GreenButton>
                  </Box>
               ) : (
                  <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                     <Grid container spacing={3}>
                        <SpeedDialTemplate actions={actions} />

                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                           {Array.isArray(studentsList) && studentsList.length > 0 && (
                              <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                           )}
                        </Paper>
                     </Grid>
                  </Container>
               )}
            </>
         )}
         <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </>
   );
};

export default ShowStudents;
