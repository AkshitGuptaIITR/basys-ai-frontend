import { Avatar, Box, styled, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NavBarContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  padding: "20px 32px",
  justifyContent: "space-between",
  boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.2)",

  "& .links": {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    alignItems: "center",

    "& a": {
      textDecoration: "none",
      color: "black",
      fontSize: "14px",
      fontWeight: "500",
    },

    "& .selected": {
      borderBottom: "1px solid black",
      paddingBottom: "4px",
    },
  },
}));

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <NavBarContainer>
        <Typography
          component={"h3"}
          sx={{ fontWeight: "700", fontSize: "20px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Typography>
        <Box className="links">
          <Link
            to={"/"}
            className={window.location.pathname === "/" && "selected"}
          >
            Patients
          </Link>
          <Link
            to={"/request"}
            className={window.location.pathname === "/request" && "selected"}
          >
            Requests
          </Link>
          <Avatar
            id="avatar"
            size="normal"
            alt={user?.name || "User"}
            name={user?.name || "User"}
            isClickable={true}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            sx={{
              width: 32,
              height: 32,
              fontSize: 16,
              ml: "32px",
              cursor: "pointer",
            }}
          />
        </Box>
      </NavBarContainer>
      <Box sx={{ padding: "32px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavBar;
