import React from "react";
import { Link } from "react-router-dom";
import classes from "./footer.module.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";



const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.left}>
        <img
          src={require("./image/download.png")}
          alt="Evangadi Networks Logo"
        />
        <div className={classes.icons}>
          <ul>
            <li>
              <a href="">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FiYoutube />
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.middle}>
        <h3>Useful Links</h3>
        <ul>
          <li>
            <Link to="/how-it-works">How it works</Link>
          </li>
          <li>
            <Link to="/terms">Terms of Condition</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className={classes.right}>
        <h3>Contact Info</h3>
        <ul>
          <li>
            <Link to="/">Evangadi Networks</Link>
          </li>
          <li>
            <a href="mailto:support@evangadi.com">support@evangadi.com</a>
          </li>
          <li>
            <a href="tel:+123456789">+123456789</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
