// Layout.js
import React from "react";
import Footer from "./Footer";
import classes from "./layout.module.css"

const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
    
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
