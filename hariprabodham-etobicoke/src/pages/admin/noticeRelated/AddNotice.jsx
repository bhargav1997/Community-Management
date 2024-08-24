import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/user/userHandle";
import { underControl } from "../../../redux/user/userSlice";
import { Box, Button, CircularProgress, Container, TextField, Typography, Paper } from "@mui/material";
import Popup from "../../../components/Popup";

const AddNotice = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { status, response, error } = useSelector((state) => state.user);
   const { currentUser } = useSelector((state) => state.user);

   const [title, setTitle] = useState("");
   const [details, setDetails] = useState("");
   const [date, setDate] = useState("");
   const adminID = currentUser._id;

   const [loader, setLoader] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [message, setMessage] = useState("");

   const fields = { title, details, date, adminID };
   const address = "Notice";

   const submitHandler = (event) => {
      event.preventDefault();
      setLoader(true);
      dispatch(addStuff(fields, address));
   };

   useEffect(() => {
      if (status === "added") {
         navigate("/Admin/notices");
         dispatch(underControl());
      } else if (status === "error") {
         setMessage("Network Error");
         setShowPopup(true);
         setLoader(false);
      }
   }, [status, navigate, error, response, dispatch]);

   return (
      <Container maxWidth='sm'>
         <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
            <Typography variant='h4' component='h1' align='center' gutterBottom>
               Add Notice
            </Typography>
            <Box component='form' onSubmit={submitHandler} sx={{ mt: 2 }}>
               <TextField
                  label='Title'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
               />
               <TextField
                  label='Details'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  required
               />
               <TextField
                  label='Date'
                  fullWidth
                  type='date'
                  variant='outlined'
                  margin='normal'
                  InputLabelProps={{ shrink: true }}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
               />
               <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Button type='submit' variant='contained' color='primary' disabled={loader} sx={{ minWidth: 120 }}>
                     {loader ? <CircularProgress size={24} color='inherit' /> : "Add"}
                  </Button>
               </Box>
            </Box>
         </Paper>
         <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Container>
   );
};

export default AddNotice;
