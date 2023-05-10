import { NavLink } from "react-router-dom";
import Classes from "../styles/NavBar.module.css";

const Navbar = ({ isAdmin, Logout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid ">
        <img
          className={`col-2 ${Classes.logoSpad}`}
          src={require("../helper/img/LOGO.png")}
          alt="S-SPaD Logo"
        ></img>
        {Logout ? (
          <>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 pt-5">
              <li className="nav-item">
                <NavLink className="nav-link" to="/mainInfo">
                  <p className="navbarText">MetaData</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mySubmissions">
                  <p className="navbarText">My Submissions</p>
                </NavLink>
              </li>
              {isAdmin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/AllSubmissions">
                    <p className="navbarText">All Submissions</p>
                  </NavLink>
                </li>
              ) : null}
            </ul>
            <button
              className="btn nav-item btn-outline btn-sm pt-5 signOut"
              onClick={Logout}
            >
              <p className="navbarText">Log Out</p>
            </button>
          </>
        ) : null}

        <a
          href="http://gopp.gov.eg/"
          target="_blank"
          rel="noreferrer"
          className="col-3 m-0 p-0 py-2"
        >
          <img
            className={`"d-flex w-100 m-0" ${Classes.logoGopp}`}
            src="http://gopp.gov.eg/wp-content/uploads/2014/08/gopp-logo3.png"
            alt="Logo"
          ></img>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
