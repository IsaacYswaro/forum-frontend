import axios from "../axiosConfig";
import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./register.module.css";

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information.");
      return;
    }
    try {
      await axios.post("/api/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.join_login}>
          <h3>Join the network</h3>
          <p>Already have an account?</p>
          <Link className={classes.login} to={"/login"}>
            Sign in
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="username" ref={userNameDom} />
          </div>
          <br />
          <div>
            <input type="text" placeholder="First Name" ref={firstNameDom} />
            <input type="text" placeholder="Last Name" ref={lastNameDom} />
          </div>
          <br />
          <div>
            <input type="text" placeholder="Email" ref={emailDom} />
          </div>
          <br />
          <div>
            <input type="password" placeholder="Password" ref={passwordDom} />
          </div>
          <div className={classes.terms}>
            I agree to the&nbsp;<a href="#">privacy policy</a>&nbsp;and
            <a href="#">&nbsp;terms of service</a>
          </div>
          <br />
          <button type="submit">Agree and Join</button>
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
            sed dapibus metus est eget risus. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Integer ac
            egestas velit.
          </p>
          <p>
            Phasellus euismod ligula at mauris ullamcorper, vel sagittis velit
            lacinia. Nulla facilisi. Aliquam erat volutpat. Ut ut ex odio.
            Mauris placerat, libero a tincidunt pretium, ligula nisl tincidunt
            nunc, at fringilla elit magna nec dolor. Praesent ac neque lorem.
            Vivamus imperdiet sapien non ipsum egestas, ac luctus mi varius.
          </p>
          <p>
            Nam consectetur libero eu urna tincidunt, a iaculis massa
            pellentesque. Suspendisse potenti. Sed in orci sed orci tempor
            bibendum ac et odio. Proin vel justo non libero vehicula tempor id
            sit amet libero. Donec tincidunt nisl vitae nulla vehicula, id
            cursus arcu fermentum.
          </p>
        </div>
        <div className={classes.how_it_works}>
          <Link to="/how-it-works">
            <button>How It Works</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
