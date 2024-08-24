import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate } from "react-router-dom";
import { PurpleButton } from "../../../styled-components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";

const ChooseClass = ({ situation }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
   const { currentUser } = useSelector((state) => state.user);

   useEffect(() => {
      dispatch(getAllSclasses(currentUser._id, "Sclass"));
   }, [currentUser._id, dispatch]);

   if (error) {
      console.log(error);
   }

   const navigateHandler = (classID) => {
      console.log("situation", situation);

      if (situation === "Teacher") {
         navigate("/Admin/hleaders/choose-event/" + classID);
      } else if (situation === "Subject") {
         navigate("/Admin/addevent/" + classID);
      }
   };

   const sclassColumns = [{ id: "name", label: "House Name", minWidth: 170 }];

   const sclassRows =
      sclassesList &&
      sclassesList.length > 0 &&
      sclassesList.map((sclass) => {
         return {
            name: sclass.sclassName,
            id: sclass._id,
         };
      });

   const SclassButtonHaver = ({ row }) => {
      return (
         <>
            <PurpleButton variant='contained' onClick={() => navigateHandler(row.id)}>
               Choose
            </PurpleButton>
         </>
      );
   };

   return (
      <>
         {loading ? (
            <CircularProgress color='primary' />
         ) : (
            <>
               {getresponse ? (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                     <Button variant='contained' onClick={() => navigate("/Admin/addhouse")}>
                        Add House Name
                     </Button>
                  </Box>
               ) : (
                  <>
                     <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                           <Typography variant='h6' gutterBottom component='div'>
                              Choose a House
                           </Typography>
                           {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                              <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                           )}
                        </Grid>
                     </Container>
                  </>
               )}
            </>
         )}
      </>
   );
};

export default ChooseClass;
