import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/user/userHandle";
import { underControl } from "../../../redux/user/userSlice";
import Popup from "../../../components/Popup";

const SubjectForm = () => {
   const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id: sclassName } = useParams();

   const { status, currentUser, response, error } = useSelector((state) => state.user);

   const adminID = currentUser._id;
   const address = "Subject";

   const [showPopup, setShowPopup] = useState(false);
   const [message, setMessage] = useState("");
   const [loader, setLoader] = useState(false);

   const handleInputChange = (index, field) => (event) => {
      const newSubjects = [...subjects];
      newSubjects[index][field] = event.target.value;
      setSubjects(newSubjects);
   };

   const handleAddSubject = () => {
      setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
   };

   const handleRemoveSubject = (index) => () => {
      setSubjects(subjects.filter((_, i) => i !== index));
   };

   const fields = {
      sclassName,
      subjects: subjects.map((subject) => ({
         subName: subject.subName,
         subCode: subject.subCode,
         sessions: subject.sessions,
      })),
      adminID,
   };

   const submitHandler = (event) => {
      event.preventDefault();
      setLoader(true);
      dispatch(addStuff(fields, address));
   };

   useEffect(() => {
      if (status === "added") {
         navigate("/Admin/subjects");
         dispatch(underControl());
         setLoader(false);
      } else if (status === "failed" || status === "error") {
         setMessage(status === "failed" ? response : "Network Error");
         setShowPopup(true);
         setLoader(false);
      }
   }, [status, navigate, response, dispatch]);

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
            Add Upcoming Events
         </Typography>
         <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
               {subjects.map((subject, index) => (
                  <React.Fragment key={index}>
                     <TextField
                        fullWidth
                        label='Event Name'
                        variant='outlined'
                        margin='normal'
                        value={subject.subName}
                        onChange={handleInputChange(index, "subName")}
                        sx={styles.inputField}
                        required
                     />

                     <TextField
                        fullWidth
                        label='Event Code'
                        variant='outlined'
                        margin='normal'
                        value={subject.subCode}
                        onChange={handleInputChange(index, "subCode")}
                        sx={styles.inputField}
                        required
                     />

                     <TextField
                        fullWidth
                        label='Sessions'
                        variant='outlined'
                        type='number'
                        margin='normal'
                        inputProps={{ min: 0 }}
                        value={subject.sessions}
                        onChange={handleInputChange(index, "sessions")}
                        sx={styles.inputField}
                        required
                     />
                     <Box display='flex' alignItems='flex-end' justifyContent={index === 0 ? "flex-start" : "flex-end"}>
                        {index === 0 ? (
                           <Button variant='outlined' color='primary' onClick={handleAddSubject}>
                              Add Event
                           </Button>
                        ) : (
                           <Button variant='outlined' color='error' onClick={handleRemoveSubject(index)}>
                              Remove
                           </Button>
                        )}
                     </Box>
                  </React.Fragment>
               ))}
               <Grid item xs={12}>
                  <Box display='flex' justifyContent='center'>
                     <Button variant='contained' color='primary' type='submit' disabled={loader}>
                        {loader ? <CircularProgress size={24} color='inherit' /> : "Save"}
                     </Button>
                  </Box>
               </Grid>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
         </form>
      </Box>
   );
};

export default SubjectForm;

const styles = {
   inputField: {
      "& .MuiInputLabel-root": {
         color: "#838080",
      },
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: "#838080",
      },
   },
};
