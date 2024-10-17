import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import patientAPI from "../../api/patientsAPI";

const Container = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",

  "& .card": {
    padding: "16px",
    border: "1px solid black",
    borderRadius: "8px",
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
    <Container>
      {patients.map((patient) => (
        <Box key={patient._id} className="card">
          {patient.name}
        </Box>
      ))}
    </Container>
  );
};

export default Dashboard;
