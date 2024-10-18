import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Grid2,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import patientAPI from "../../api/patientsAPI";
import PatientIcon from "../../assets/patients-icon.webp";
import { useNavigate } from "react-router-dom";

const Container = styled(Grid2)(() => ({
  // display: "grid",
  // gridTemplateColumns: "repeat(4, 1fr)",
  // gap: "16px",

  "& .card": {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
    alignItems: "center",

    "& img": {
      // height: "32px",
      width: "50%",
    },

    "& .flex-box": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100%",
      alignItems: "flex-start",
    },
  },
}));

const DialoagContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "16px 24px",
  maxWidth: "360px",
  width: "90%",
  maxHeight: "520px",
  overflowY: "auto",
  overflowX: "hidden",
}));

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await patientAPI.getAllPatients();
        setPatients(response?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Dialog
        open={selectedPatient}
        title={selectedPatient?.name}
        onClose={() => setSelectedPatient(null)}
      >
        <DialoagContainer>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {selectedPatient?.name}
            <Typography sx={{ color: "grey", fontWeight: "500" }}>
              ({selectedPatient?.age})
            </Typography>
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            {selectedPatient?.condition || "Hypertension"}
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontWeight: "500",
              fontSize: "16px",
              mt: "8px",
            }}
          >
            Medical history:
          </Typography>
          {selectedPatient?.medicalHistory?.map((history, index) => (
            <Box
              sx={{
                color: "black",
                fontSize: "12px",
                mt: "8px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                Condition: {history?.condition}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Treatment: {history?.treatment}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Medication: {history?.medication}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Start date: {new Date(history?.date).toDateString()}
              </Typography>
            </Box>
          ))}
          <Typography
            sx={{
              color: "black",
              fontWeight: "500",
              fontSize: "16px",
              mt: "8px",
            }}
          >
            Health records:
          </Typography>
          {selectedPatient?.healthRecords?.map((history, index) => (
            <Box
              sx={{
                color: "black",
                fontSize: "12px",
                mt: "8px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                Lab results: {history?.labResults}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Treatment plan: {history?.treatmentPlan}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Diagnosis code: {history?.diagnosisCode}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Start date: {new Date(history?.date).toDateString()}
              </Typography>
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "16px" }}>
            <Button
              sx={{
                fontSize: "14px",
                color: "black",
                textTransform: "none",
              }}
              onClick={() => setSelectedPatient(null)}
            >
              Close
            </Button>
            <Button
              sx={{
                ml: "8px",
                fontSize: "14px",
                background: "black",
                textTransform: "none",
              }}
              variant="contained"
              onClick={() =>
                navigate(`/create-request/${selectedPatient?._id}`)
              }
            >
              Create request
            </Button>
          </Box>
        </DialoagContainer>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "8px",
        }}
      >
        <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
          Patients
        </Typography>
      </Box>
      {isLoading ? (
        <Box
          className="loading"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100%",
          }}
        >
          <CircularProgress color="black" />
        </Box>
      ) : (
        <>
          <Container container spacing={2}>
            {patients.map((patient) => (
              <Grid2 xs={12} sm={1} md={1} key={patient._id} className="card">
                <img src={PatientIcon} alt="patient-icon" />
                <Box className="flex-box">
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {patient.name}{" "}
                    <Typography
                      sx={{ fontSize: "12px", color: "grey", ml: "4px" }}
                    >
                      ({patient.age})
                    </Typography>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "100%",
                    mt: "4px",
                  }}
                >
                  <Typography sx={{ color: "grey", fontSize: "14px" }}>
                    {patient?.condition || "Hypertension"}
                  </Typography>
                </Box>
                <Box
                  className={"flex-box"}
                  sx={{
                    justifyContent: "space-between !important",
                    width: "100%",
                    mt: "16px",
                  }}
                >
                  <Button
                    sx={{
                      color: "black",
                      fontSize: "12px",
                      textTransform: "none",
                      border: "1px solid black",
                    }}
                    variant="outlined"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      background: "black",
                      fontSize: "12px",
                    }}
                    onClick={() => navigate(`/create-request/${patient?._id}`)}
                  >
                    Create Request
                  </Button>
                </Box>
              </Grid2>
            ))}
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
