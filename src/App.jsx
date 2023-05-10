import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import MainInfoModule from "./components/MainInfoModule";
import NotFound from "./components/NotFound";
import AllSubmissions from "./components/allSubmissions";
import Details from "./components/Details";
import useToken from "./helper/useToken";
import { useState } from "react";
import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
import SignUp from "./components/Register";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
function App() {
  const { token, role, setToken, clearToken } = useToken();
  let [submissions, setSubmissions] = useState([]);
  let [selectedSubmission, setSelectedSubmission] = useState();

  const [prevPath, setPrevPath] = useState();

  if (!token) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<SignIn setToken={setToken} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <div className="App">
          <Navbar isAdmin={role === "Admin"} Logout={clearToken} />
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/mainInfo/*" element={<MainInfoModule />} />
            <Route
              path="/mySubmissions"
              element={
                <AllSubmissions
                  isAdmin={false}
                  submissions={submissions}
                  setSelectedSubmission={setSelectedSubmission}
                  setSubmissions={setSubmissions}
                  setPrevPath={setPrevPath}
                />
              }
            />
            {role === "Admin" ? (
              <Route
                path="/allSubmissions"
                element={
                  <AllSubmissions
                    isAdmin={true}
                    submissions={submissions}
                    setSelectedSubmission={setSelectedSubmission}
                    setSubmissions={setSubmissions}
                    setPrevPath={setPrevPath}
                  />
                }
              />
            ) : null}
            <Route
              path="/details/"
              element={
                <Details
                  {...submissions.filter(
                    (sub) => sub.key === parseInt(selectedSubmission)
                  )[0]}
                  prevPath={prevPath}
                />
              }
            />
            <Route exact path="/" element={<Navigate to="/mainInfo" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
