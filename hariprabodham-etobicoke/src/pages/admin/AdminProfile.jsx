import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../../redux/user/userHandle";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../redux/user/userSlice";
import { Button, Collapse, Box, TextField, Typography, Paper, IconButton, Container } from "@mui/material";

const AdminProfile = () => {
   const [showTab, setShowTab] = useState(false);
   const buttonText = showTab ? "Cancel" : "Edit profile";

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { currentUser, response, error } = useSelector((state) => state.user);
   const address = "Admin";

   const [name, setName] = useState(currentUser.name);
   const [email, setEmail] = useState(currentUser.email);
   const [password, setPassword] = useState("");
   const [schoolName, setSchoolName] = useState(currentUser.schoolName);

   const fields = password === "" ? { name, email, schoolName } : { name, email, password, schoolName };

   const submitHandler = (event) => {
      event.preventDefault();
      dispatch(updateUser(fields, currentUser._id, address));
   };

   const deleteHandler = () => {
      try {
         dispatch(deleteUser(currentUser._id, "Students"));
         dispatch(deleteUser(currentUser._id, address));
         dispatch(authLogout());
         navigate("/");
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Container maxWidth='sm' sx={{ mt: 4 }}>
         <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant='h5' component='h2' gutterBottom>
               Admin Profile
            </Typography>
            <Typography variant='body1'>
               Name: {currentUser.name}
               <br />
               Email: {currentUser.email}
               <br />
               School: {currentUser.schoolName}
            </Typography>
            <Box sx={{ mt: 2 }}>
               <Button variant='contained' color='error' onClick={deleteHandler} sx={{ mr: 2 }}>
                  Delete
               </Button>
               <IconButton color='primary' onClick={() => setShowTab(!showTab)} sx={{ ...styles.showButton }}>
                  {showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  {buttonText}
               </IconButton>
            </Box>
            <Collapse in={showTab} timeout='auto' unmountOnExit>
               <Box component='form' onSubmit={submitHandler} sx={{ mt: 3 }}>
                  <TextField
                     label='Name'
                     fullWidth
                     variant='outlined'
                     margin='normal'
                     value={name}
                     onChange={(event) => setName(event.target.value)}
                     required
                  />
                  <TextField
                     label='School'
                     fullWidth
                     variant='outlined'
                     margin='normal'
                     value={schoolName}
                     onChange={(event) => setSchoolName(event.target.value)}
                     required
                  />
                  <TextField
                     label='Email'
                     fullWidth
                     variant='outlined'
                     margin='normal'
                     type='email'
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                     required
                  />
                  <TextField
                     label='Password'
                     fullWidth
                     variant='outlined'
                     margin='normal'
                     type='password'
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     autoComplete='new-password'
                  />
                  <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 2 }}>
                     Update
                  </Button>
               </Box>
            </Collapse>
         </Paper>
      </Container>
   );
};

export default AdminProfile;

const styles = {
   showButton: {
      display: "flex",
      alignItems: "center",
      margin: 1,

      fontSize: "1rem",

      "&:hover": {
         cursor: "pointer",
      },
   },
};
