import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./login.module.css";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      alert("Please provide all required information.");
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("Login successful.");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "An error occurred. Please try again.";
      alert(errorMessage);
      console.log(error);
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.formContainer}>
        <h3>Login to your account</h3>
        <div className={classes.register_new}>
          <small>
            Don't have an account?{" "}
            <button
              className={classes.register}
              onClick={() => navigate("/register")}
            >
              Create a new account
            </button>
          </small>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Your Email" ref={emailDom} />
          </div>
          <br />
          <div>
            <input
              type="password"
              placeholder="Your Password"
              ref={passwordDom}
            />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className={classes.aboutContainer}>
        <div className={classes.about}>About</div>
        <div className={classes.evangadi}>
          <h1>Evangadi Networks Q&A</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            urna eu libero dapibus cursus. Nullam nec enim lacus. Duis
            imperdiet, nisi eget ullamcorper vehicula, eros leo facilisis mi,
            sed dapibus metus est eget risus. 
          </p>
          <p>
            Phasellus euismod ligula at mauris ullamcorper, vel sagittis velit
            lacinia. Nulla facilisi. Aliquam erat volutpat. Ut ut ex odio.
            Mauris placerat, libero a tincidunt pretium, ligula nisl tincidunt
            nunc, at fringilla elit magna nec dolor. 
          </p>
          <p>
            Nam consectetur libero eu urna tincidunt, a iaculis massa
            pellentesque. Suspendisse potenti. Sed in orci sed orci tempor
            bibendum ac et odio. Proin vel justo non libero vehicula tempor id
            sit amet libero.
          </p>
        </div>
        <div className={classes.how_it_works}>
          <Link to="/how-it-works">
            <button>How It Works</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
