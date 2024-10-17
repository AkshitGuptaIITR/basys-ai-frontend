import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import authorizationRequestsAPI from "../../api/authorizationRequestsAPI";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",

  "& .fields": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    maxWidth: "420px",

    "& .flex-box": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",

      "& label": {
        color: "black",
      },

      "& input": {
        padding: "8px 16px",
        background: "white",
        fontSize: "14px",
        borderRadius: "4px",
      },
      "& input:hover": {
        backgroundColor: "#F8F8F8",
      },
      "& .MuiInputBase-multiline": {
        padding: "8px 16px",
        background: "white",
        fontSize: "14px",
      },
    },
  },
}));

const CreateRequestForm = () => {
  const [requestState, setRequestState] = useState({
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
    status: "pending",
    doctorNotes: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { patientId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setRequestState((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !requestState.treatmentType ||
      !requestState.insurancePlan ||
      !requestState.dateOfService ||
      !requestState.diagnosisCode ||
      requestState.treatmentType === "" ||
      requestState.insurancePlan === "" ||
      requestState.dateOfService === "" ||
      requestState.diagnosisCode === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      setIsLoading(true);
      await authorizationRequestsAPI.createAuthorizationRequest(
        {
          treatmentType: requestState.treatmentType,
          insurancePlan: requestState.insurancePlan,
          dateOfService: requestState.dateOfService,
          diagnosisCode: requestState.diagnosisCode,
          status: requestState.status,
          doctorNotes: requestState.doctorNotes,
        },
        patientId
      );
      toast.success("Request created successfully");
      navigate(`/request`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box className="fields">
        <Box className="flex-box">
          <FormLabel>Treatment type</FormLabel>
          <TextField
            placeholder="Treatment type"
            value={requestState.treatmentType}
            type="text"
            name="treatmentType"
            onChange={handleInputChange}
          />
        </Box>
        <Box className="flex-box">
          <FormLabel>Date of service</FormLabel>
          <TextField
            placeholder="Date of service"
            value={requestState.dateOfService}
            name="dateOfService"
            type="date"
            onChange={handleInputChange}
          />
        </Box>
        <Box className="flex-box">
          <FormLabel>Insurance plan</FormLabel>
          <TextField
            placeholder="Insurance plan"
            value={requestState.insurancePlan}
            name="insurancePlan"
            type="text"
            onChange={handleInputChange}
          />
        </Box>
        <Box className="flex-box">
          <FormLabel>Diagnosis code</FormLabel>
          <TextField
            placeholder="Diagnosis code"
            value={requestState.diagnosisCode}
            name="diagnosisCode"
            type="text"
            onChange={handleInputChange}
          />
        </Box>
        <Box className="flex-box">
          <FormLabel>Status</FormLabel>
          <Select
            value={requestState.status}
            sx={{
              padding: 0,
              "& .MuiSelect-select": {
                padding: "8px 16px",
              },
            }}
            name="status"
            onChange={handleInputChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="denied">Denied</MenuItem>
          </Select>
        </Box>
        <Box className="flex-box">
          <FormLabel>Doctor notes</FormLabel>
          <TextField
            placeholder="Doctor notes"
            value={requestState.doctorNotes}
            name="doctorNotes"
            type="text"
            onChange={handleInputChange}
          />
        </Box>
      </Box>
      <Button
        sx={{ width: "120px", background: "black" }}
        onClick={handleFormSubmit}
        variant="contained"
        disabled={isLoading}
      >
        {isLoading && (
          <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
        )}
        Submit
      </Button>
    </Container>
  );
};

export default CreateRequestForm;
