import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import { registerUser } from "../../../redux/user/userHandle";
import { underControl } from "../../../redux/user/userSlice";
import { Container, Box, TextField, Button, Typography, CircularProgress, Grid, Paper } from "@mui/material";
import Popup from "../../../components/Popup";

const AddTeacher = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const subjectID = params.id;

   const { status, response, error } = useSelector((state) => state.user);
   const { subjectDetails } = useSelector((state) => state.sclass);

   useEffect(() => {
      dispatch(getSubjectDetails(subjectID, "Subject"));
   }, [dispatch, subjectID]);

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [showPopup, setShowPopup] = useState(false);
   const [message, setMessage] = useState("");
   const [loader, setLoader] = useState(false);

   const role = "Teacher";
   const school = subjectDetails?.school;
   const teachSubject = subjectDetails?._id;
   const teachSclass = subjectDetails?.sclassName?._id;

   const fields = { name, email, password, role, school, teachSubject, teachSclass };

   const submitHandler = (event) => {
      event.preventDefault();
      setLoader(true);
      dispatch(registerUser(fields, role));
   };

   useEffect(() => {
      if (status === "added") {
         dispatch(underControl());
         navigate("/Admin/hleaders");
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
      <Container maxWidth='sm'>
         <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
            <Typography variant='h5' gutterBottom>
               Add House Leader
            </Typography>

            <Typography variant='subtitle1' color='textSecondary' gutterBottom>
               Event: {subjectDetails?.subName}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary' gutterBottom>
               House: {subjectDetails?.sclassName?.sclassName}
            </Typography>

            <form onSubmit={submitHandler}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        fullWidth
                        label='Name'
                        variant='outlined'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete='name'
                        required
                        sx={styles.inputField}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        fullWidth
                        label='Email'
                        variant='outlined'
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete='email'
                        required
                        sx={styles.inputField}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <TextField
                        fullWidth
                        label='Password'
                        variant='outlined'
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete='new-password'
                        required
                        sx={styles.inputField}
                     />
                  </Grid>

                  <Grid item xs={12}>
                     <Box display='flex' justifyContent='center' mt={2}>
                        <Button variant='contained' color='primary' type='submit' disabled={loader} sx={styles.submitButton}>
                           {loader ? <CircularProgress size={24} color='inherit' /> : "Register"}
                        </Button>
                     </Box>
                  </Grid>
               </Grid>
            </form>
         </Paper>
         <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Container>
   );
};

export default AddTeacher;

const styles = {
   inputField: {
      "& .MuiInputLabel-root": {
         color: "#555",
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "#ccc",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "#1976d2",
      },
   },
   submitButton: {
      minWidth: 150,
   },
};
