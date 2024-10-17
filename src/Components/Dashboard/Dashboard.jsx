import { Box, Button, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import patientAPI from "../../api/patientsAPI";
import PatientIcon from "../../assets/patients-icon.webp";

const Container = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",

  "& .card": {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "8px",
    width: "calc(100% - 64px)",
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

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await patientAPI.getAllPatients();
        setPatients(response?.data || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
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
        <Button
          sx={{
            border: "1px solid black",
            textTransform: "none",
            color: "black",
          }}
          variant="outlined"
        >
          Add patient
        </Button>
      </Box>
      <Container>
        {patients.map((patient) => (
          <Box key={patient._id} className="card">
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
                <Typography sx={{ fontSize: "12px", color: "grey", ml: "4px" }}>
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
              >
                View Details
              </Button>
              <Button
                variant="contained"
                sx={{ color: "white", background: "black", fontSize: "12px" }}
              >
                Create Request
              </Button>
            </Box>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
