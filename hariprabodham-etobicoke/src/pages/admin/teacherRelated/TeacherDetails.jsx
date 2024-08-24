import React, { useEffect } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography, CircularProgress, Box, Alert, Paper } from "@mui/material";

const TeacherDetails = () => {
   const navigate = useNavigate();
   const { id: teacherID } = useParams();
   const dispatch = useDispatch();
   const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

   useEffect(() => {
      dispatch(getTeacherDetails(teacherID));
   }, [dispatch, teacherID]);

   const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

   const handleAddSubject = () => {
      navigate(`/Admin/hleaders/choose-event/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
   };

   return (
      <Container sx={{ mt: 4 }}>
         {loading ? (
            <Box display='flex' justifyContent='center' alignItems='center' height='50vh'>
               <CircularProgress />
            </Box>
         ) : error ? (
            <Alert severity='error' sx={{ mt: 4 }}>
               {error}
            </Alert>
         ) : (
            <Paper elevation={3} sx={{ p: 3 }}>
               <Box sx={{ textAlign: "center" }}>
                  <Typography variant='h4' align='center' gutterBottom>
                     House Leader Details
                  </Typography>
                  <Box sx={{ my: 2 }}>
                     <Typography variant='h6'>
                        <strong>House Leader Name:</strong> {teacherDetails?.name}
                     </Typography>
                     <Typography variant='h6'>
                        <strong>House Name:</strong> {teacherDetails?.teachSclass?.sclassName}
                     </Typography>
                  </Box>
                  {isSubjectNamePresent ? (
                     <Box sx={{ my: 2 }}>
                        <Typography variant='h6'>
                           <strong>Event Name:</strong> {teacherDetails?.teachSubject?.subName}
                        </Typography>
                        <Typography variant='h6'>
                           <strong>Event Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                        </Typography>
                     </Box>
                  ) : (
                     <Button variant='contained' color='primary' onClick={handleAddSubject} sx={{ mt: 2 }}>
                        Add Event
                     </Button>
                  )}
               </Box>
            </Paper>
         )}
      </Container>
   );
};

export default TeacherDetails;
