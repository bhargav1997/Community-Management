import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/user/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/user/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { Box, Button, CircularProgress, MenuItem, Select, TextField, Typography, FormControl, InputLabel } from "@mui/material";

const AddStudent = ({ situation }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   const userState = useSelector((state) => state.user);
   const { status, currentUser, response, error } = userState;
   const { sclassesList } = useSelector((state) => state.sclass);

   const [name, setName] = useState("");
   const [rollNum, setRollNum] = useState("");
   const [password, setPassword] = useState("");
   const [className, setClassName] = useState("");
   const [sclassName, setSclassName] = useState("");

   const adminID = currentUser._id;
   const role = "Student";
   const attendance = [];

   useEffect(() => {
      if (situation === "Class") {
         setSclassName(params.id);
      }
   }, [params.id, situation]);

   const [showPopup, setShowPopup] = useState(false);
   const [message, setMessage] = useState("");
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      dispatch(getAllSclasses(adminID, "Sclass"));
   }, [adminID, dispatch]);

   const changeHandler = (event) => {
      if (event.target.value === "Select Class") {
         setClassName("Select Class");
         setSclassName("");
      } else {
         const selectedClass = sclassesList.find((classItem) => classItem.sclassName === event.target.value);
         setClassName(selectedClass.sclassName);
         setSclassName(selectedClass._id);
      }
   };

   const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

   const submitHandler = (event) => {
      event.preventDefault();
      if (sclassName === "") {
         setMessage("Please select a class");
         setShowPopup(true);
      } else {
         setLoader(true);
         dispatch(registerUser(fields, role));
      }
   };

   useEffect(() => {
      if (status === "added") {
         dispatch(underControl());
         navigate(-1);
      } else if (status === "failed") {
         setMessage(response);
         setShowPopup(true);
         setLoader(false);
      } else if (status === "error") {
         setMessage("Network Error");
         setShowPopup(true);
         setLoader(false);
      }
   }, [status, navigate, error, response, dispatch]);

   return (
      <Box
         sx={{
            maxWidth: 500,
            margin: "50px auto",
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
         }}>
         <Typography variant='h4' component='h1' align='center' gutterBottom>
            Add House Member
         </Typography>
         <form onSubmit={submitHandler}>
            <TextField
               label='Name'
               variant='outlined'
               fullWidth
               margin='normal'
               value={name}
               onChange={(event) => setName(event.target.value)}
               required
            />
            {situation === "Student" && (
               <FormControl fullWidth variant='outlined' margin='normal' required>
                  <InputLabel id='class-label'>House Name</InputLabel>
                  <Select labelId='class-label' label='Class' value={className} onChange={changeHandler}>
                     <MenuItem value='Select Class'>Select House Name</MenuItem>
                     {sclassesList.map((classItem, index) => (
                        <MenuItem key={index} value={classItem.sclassName}>
                           {classItem.sclassName}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            )}
            <TextField
               label='Phone Number'
               variant='outlined'
               fullWidth
               margin='normal'
               type='number'
               value={rollNum}
               onChange={(event) => setRollNum(event.target.value)}
               required
            />
            <TextField
               label='Password'
               variant='outlined'
               fullWidth
               margin='normal'
               type='password'
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               required
            />
            <Box sx={{ textAlign: "center", mt: 2 }}>
               <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={loader}
                  startIcon={loader && <CircularProgress size={20} color='inherit' />}>
                  {loader ? "Adding..." : "Add House Member"}
               </Button>
            </Box>
         </form>
         <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Box>
   );
};

export default AddStudent;
