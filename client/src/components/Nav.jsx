import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Nav() {

  //state management for navbar 
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  //state management for login 
  const [logged, status] = useState(false);
  const [user, setUser] = useState("");

  //state management for control if the user is logged in
  //this is called every time the page is loaded
  useEffect(() => {
    fetch("/api/isLogged")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          status(true);
          setUser(data.user);
        } else status(false);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-md mt-2 mx-2">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
         Notes
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${
            isNavCollapsed
              ? "navbar-collapse collapse "
              : "navbar-collapse collapse show"
          } `}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                Home
              </Link>
            </li>
            {logged ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">{user}</span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    onClick={() =>
                      fetch("/api/logout")
                        .then((res) => res.text())
                        .then((data) => document.location.replace("/login"))
                    }
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link ">
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
