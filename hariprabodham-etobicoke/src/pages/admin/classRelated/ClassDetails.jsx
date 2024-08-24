import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { Box, Container, Typography, Tab, IconButton, CircularProgress } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BlueButton, GreenButton, PurpleButton } from "../../../styled-components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";

const ClassDetails = () => {
   const params = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

   const classID = params.id;

   useEffect(() => {
      dispatch(getClassDetails(classID, "Sclass"));
      dispatch(getSubjectList(classID, "ClassSubjects"));
      dispatch(getClassStudents(classID));
   }, [dispatch, classID]);

   if (error) {
      console.log(error);
   }

   const [value, setValue] = useState("1");

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const [showPopup, setShowPopup] = useState(false);
   const [message, setMessage] = useState("");

   const deleteHandler = (deleteID, address) => {
      console.log(deleteID);
      console.log(address);
      setMessage("Sorry the delete function has been disabled for now.");
      setShowPopup(true);
      // dispatch(deleteUser(deleteID, address))
      //     .then(() => {
      //         dispatch(getClassStudents(classID));
      //         dispatch(resetSubjects())
      //         dispatch(getSubjectList(classID, "ClassSubjects"))
      //     })
   };

   const subjectColumns = [
      { id: "name", label: "Subject Name", minWidth: 170 },
      { id: "code", label: "Subject Code", minWidth: 100 },
   ];

   const subjectRows =
      subjectsList &&
      subjectsList.length > 0 &&
      subjectsList.map((subject) => {
         return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
         };
      });

   const SubjectsButtonHaver = ({ row }) => {
      return (
         <>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
               <DeleteIcon color='error' />
            </IconButton>
            <BlueButton
               variant='contained'
               onClick={() => {
                  navigate(`/Admin/house/event/${classID}/${row.id}`);
               }}>
               View
            </BlueButton>
         </>
      );
   };

   const subjectActions = [
      {
         icon: <PostAddIcon color='primary' />,
         name: "Add New Event",
         action: () => navigate("/Admin/addevent/" + classID),
      },
      {
         icon: <DeleteIcon color='error' />,
         name: "Delete All Event",
         action: () => deleteHandler(classID, "SubjectsClass"),
      },
   ];

   const ClassSubjectsSection = () => {
      return (
         <>
            {response ? (
               <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                  <GreenButton variant='contained' onClick={() => navigate("/Admin/addevent/" + classID)}>
                     Add Events
                  </GreenButton>
               </Box>
            ) : (
               <>
                  <Typography variant='h5' gutterBottom>
                     House Members List:
                  </Typography>

                  <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                  <SpeedDialTemplate actions={subjectActions} />
               </>
            )}
         </>
      );
   };

   const studentColumns = [
      { id: "name", label: "Name", minWidth: 170 },
      { id: "rollNum", label: "Phone Number", minWidth: 100 },
   ];

   const studentRows = sclassStudents.map((student) => {
      return {
         name: student.name,
         rollNum: student.rollNum,
         id: student._id,
      };
   });

   const StudentsButtonHaver = ({ row }) => {
      return (
         <>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}>
               <PersonRemoveIcon color='error' />
            </IconButton>
            <BlueButton variant='contained' onClick={() => navigate("/Admin/housemembers/hmember/" + row.id)}>
               View
            </BlueButton>
            <PurpleButton variant='contained' onClick={() => navigate("/Admin/housemembers/hmember/attendance/" + row.id)}>
               Attendance
            </PurpleButton>
         </>
      );
   };

   const studentActions = [
      {
         icon: <PersonAddAlt1Icon color='primary' />,
         name: "Add New Event",
         action: () => navigate("/Admin/house/addhousemembers/" + classID),
      },
      {
         icon: <PersonRemoveIcon color='error' />,
         name: "Delete All House Members",
         action: () => deleteHandler(classID, "StudentsClass"),
      },
   ];

   const ClassStudentsSection = () => {
      return (
         <>
            {getresponse ? (
               <>
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                     <GreenButton variant='contained' onClick={() => navigate("/Admin/house/addhousemembers/" + classID)}>
                        Add House Members
                     </GreenButton>
                  </Box>
               </>
            ) : (
               <>
                  <Typography variant='h5' gutterBottom>
                     House Members List:
                  </Typography>

                  <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                  <SpeedDialTemplate actions={studentActions} />
               </>
            )}
         </>
      );
   };

   const ClassTeachersSection = () => {
      return <>Teachers</>;
   };

   const ClassDetailsSection = () => {
      const numberOfSubjects = subjectsList.length;
      const numberOfStudents = sclassStudents.length;

      return (
         <>
            <Typography variant='h4' align='center' gutterBottom>
               House Details
            </Typography>
            <Typography variant='h5' gutterBottom>
               This is House {sclassDetails && sclassDetails.sclassName}
            </Typography>
            <Typography variant='h6' gutterBottom>
               Number of Events: {numberOfSubjects}
            </Typography>
            <Typography variant='h6' gutterBottom>
               Number of House Members: {numberOfStudents}
            </Typography>
            {getresponse && (
               <GreenButton variant='contained' onClick={() => navigate("/Admin/house/addhousemembers/" + classID)}>
                  Add House Members
               </GreenButton>
            )}
            {response && (
               <GreenButton variant='contained' onClick={() => navigate("/Admin/addevent/" + classID)}>
                  Add Events
               </GreenButton>
            )}
         </>
      );
   };

   return (
      <>
         {loading ? (
            <CircularProgress size={24} color='inherit' />
         ) : (
            <>
               <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                     <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} sx={{ position: "fixed", width: "100%", bgcolor: "background.paper", zIndex: 1 }}>
                           <Tab label='Details' value='1' />
                           <Tab label='Subjects' value='2' />
                           <Tab label='Students' value='3' />
                           <Tab label='Teachers' value='4' />
                        </TabList>
                     </Box>
                     <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                        <TabPanel value='1'>
                           <ClassDetailsSection />
                        </TabPanel>
                        <TabPanel value='2'>
                           <ClassSubjectsSection />
                        </TabPanel>
                        <TabPanel value='3'>
                           <ClassStudentsSection />
                        </TabPanel>
                        <TabPanel value='4'>
                           <ClassTeachersSection />
                        </TabPanel>
                     </Container>
                  </TabContext>
               </Box>
            </>
         )}
         <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </>
   );
};

export default ClassDetails;
