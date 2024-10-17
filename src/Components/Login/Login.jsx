import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import authAPI from "../../api/authAPI";

const Container = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "95vh",

  "& .login": {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    height: "360px",
    border: "1px solid black",
    padding: "32px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "space-around",
    alignItems: "center",

    "& .fields": {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      width: "100%",

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

    "& .button": {
      width: "100%",
      backgroundColor: "#181C14",
    },

    "& .button:disabled": {
      width: "100%",
      backgroundColor: "#181C14",
      color: "white",
      opacity: "0.75",
    },
  },
}));

const Login = ({ setUser }) => {
  const [loginState, setLoginState] = useState({ email: null, password: null });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setLoginState((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await authAPI.login(loginState);
      setUser(response?.data || {});
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box className="login">
        <Typography sx={{ color: "black", fontSize: "32px" }}>Login</Typography>
        <Box className="fields">
          <Box className="flex-box">
            <FormLabel>Email</FormLabel>
            <TextField
              placeholder="Email"
              value={loginState.email}
              type="email"
              name="email"
              onChange={handleInputChange}
            />
          </Box>
          <Box className="flex-box">
            <FormLabel>Password</FormLabel>
            <TextField
              placeholder="Password"
              value={loginState.password}
              name="password"
              type="password"
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Button
          className="button"
          disabled={isLoading}
          variant="contained"
          onClick={handleLogin}
        >
          {isLoading && (
            <CircularProgress sx={{ mr: "12px" }} color="white" size="12px" />
          )}
          Sign in
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
