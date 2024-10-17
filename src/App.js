import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import authAPI from "./api/authAPI";
import Login from "./Components/Login/Login";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import NavBar from "./Components/NavBar/NavBar";
import Requests from "./Components/Requests/Requests";
import { Box, CircularProgress } from "@mui/material";
import CreateRequestForm from "./Components/CreateRequestForm/CreateRequestForm";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await authAPI.getLoggedInUser();
        setUser(response?.data || {});
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const Loader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "95vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        toastClassName="react-toastify-style"
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <Router>
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<NavBar user={user} />}>
                <Route index element={<Dashboard />} />
                <Route path={"request"} element={<Requests />} />
                <Route
                  path="create-request/:patientId"
                  element={<CreateRequestForm />}
                />
                <Route path={"*"} element={<Dashboard />} />
              </Route>
            </>
          ) : (
            <Route
              path="/"
              element={isLoading ? <Loader /> : <Login setUser={setUser} />}
            />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
