import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import useAuthContext from "../context/AuthContext";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const { user, logout } = useAuthContext();
  const handleLogoutClick = () => {
    logout({ user });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(128, 128, 128, 0.5)",
            zIndex: 100,
            padding: "100px",
          }}
        ></div>
      )}
      {isOpen === false ? (
        <div className={isSticky ? "nav-container-sticky" : "nav-container"}>
          <div className="background"></div>
          <div className="container">
            <div
              style={{
                zIndex: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link to="/" className="logo">
                TechBlog
              </Link>

              {user ? (
                <div className="nav-menu">
                  {user.role === "admin" && (
                    <Link to="/dashboard" className="nav-link btn-2">
                      Dashboard
                    </Link>
                  )}

                  <p
                    onClick={handleLogoutClick}
                    className="nav-link btn cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <div className="nav-menu">
                  <Link to="/sign-in" className="nav-link btn-2">
                    Login
                  </Link>
                  <p to="/sign-up" className="nav-link btn">
                    Sign Up
                  </p>
                </div>
              )}
              {/* <div className="nav-menu">
                <Link to="/sign-in" className="nav-link btn-2">
                  Login
                </Link>
                <Link to='/sign-up' className="nav-link btn">
                  Sign Up
                </Link>
              </div> */}

              <div className="nav-icon">
                <i
                  className="ri-menu-2-line"
                  onClick={() => setOpen(!isOpen)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mobile-open"
          style={{
            backgroundColor: "#fff",
            position: "fixed",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "20px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link to="/" className="logo">
              TechBlog
            </Link>
            <div className="nav-icon" onClick={() => setOpen(!isOpen)}>
              <i className="ri-close-line"></i>
            </div>
          </div>
          <div className="nav-menus" style={{ padding: "20px" }}>
            {user ? (
              <>
                <div>
                  {user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      style={{ color: "#111111", fontWeight: 500 }}
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="line-2"></div>
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#f1f1f1",
                    marginTop: "20px",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <p
                    onClick={handleLogoutClick}
                    style={{ color: "#111111", fontWeight: 500 }}
                  >
                    Logout
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link
                    to="/sign-in"
                    style={{ color: "#111111", fontWeight: 500 }}
                  >
                    Login
                  </Link>
                  <div className="line-2"></div>
                </div>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#f1f1f1",
                    marginTop: "20px",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <Link
                    to="/sign-up"
                    style={{ color: "#111111", fontWeight: 500 }}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
