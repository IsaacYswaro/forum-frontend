import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { AppState } from "../App";


function Header() {
  const { user, handleLogout } = useContext(AppState);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img
            src={require("./image/10001.png")}
            alt="Evangadi Networks Logo"
          />
        </Link>
      </div>
      <nav className={classes.nav}>
        <Link to="/" className={classes.navLink}>
          Home
        </Link>
        <Link
          to="https://www.evangadi.com/explained/"
          className={classes.navLink}
        >
          How it Works
        </Link>
        {user.username ? (
          <button onClick={handleLogout} className={classes.logout_navLink}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={classes.login_navLink}>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
