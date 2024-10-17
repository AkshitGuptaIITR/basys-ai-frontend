import {
  Box,
  Chip,
  CircularProgress,
  Grid2,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import authorizationRequestsAPI from "../../api/authorizationRequestsAPI";
import { capitalizeStringFirst } from "../../helper/functions";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",

  "& .request-card": {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    padding: "8px 16px",
    borderRadius: "8px",
    "& .flex-box": {
      display: "flex",
      flexDirection: "row",
    },
  },

  "& .loading": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
}));

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response =
          await authorizationRequestsAPI.getAllAuthorizationRequests();
        setRequests(response?.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Container>
      <Typography
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        Prior Authorization Requests
      </Typography>
      {isLoading ? (
        <Box className="loading">
          <CircularProgress color="black" />
        </Box>
      ) : (
        <>
          {requests.map((data) => {
            return (
              <Box className="request-card">
                <Box className="flex-box">
                  <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                    Request ID:
                  </Typography>{" "}
                  <Typography
                    sx={{ fontSize: "12px", color: "grey", ml: "8px" }}
                  >
                    {data._id}
                  </Typography>
                </Box>
                <Box
                  className="flex-box"
                  sx={{ justifyContent: "space-between", mt: "4px" }}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                    {data?.patient?.name}
                  </Typography>
                  <Chip
                    color={
                      data?.status === "pending"
                        ? "warning"
                        : data?.status === "approved"
                        ? "success"
                        : "error"
                    }
                    size="small"
                    label={capitalizeStringFirst(data?.status)}
                  />
                </Box>
                <Box
                  className={"flex-box"}
                  sx={{ justifyContent: "space-between", mt: "8px" }}
                >
                  <Grid2 container gap={2}>
                    <Grid2 xs={12} md={6}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Patient ID:
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "12px", color: "grey" }}>
                        {data?.patient?._id}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Treatment type:
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "12px", color: "grey" }}>
                        {data?.treatmentType}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Requested By:
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "12px", color: "grey" }}>
                        {data?.provider?.name}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Requested at:
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "12px", color: "grey" }}>
                        {new Date(data?.createdAt)?.toLocaleString()}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Date of service:
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "12px", color: "grey" }}>
                        {new Date(data?.dateOfService)?.toLocaleString()}
                      </Typography>
                    </Grid2>
                    <Grid2 xs={12} md={6}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Diagnosis code:
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "12px", color: "grey" }}>
                        {data?.diagnosisCode}
                      </Typography>
                    </Grid2>
                  </Grid2>
                </Box>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: "500", mt: "8px" }}
                >
                  Doctor's notes:
                </Typography>{" "}
                <Typography sx={{ fontSize: "14px", color: "grey" }}>
                  {data?.doctorNotes}
                </Typography>
              </Box>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default Requests;
