import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import classes from "./home.module.css";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { AppState } from "../App";
import { VscAccount } from "react-icons/vsc";


function Home() {
  const [questions, setQuestions] = useState([]);
  const [showDescription, setShowDescription] = useState({});
  const { user } = useContext(AppState);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get("/questions", config); 
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const toggleDescription = (index) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.header}>
        <Link to="/ask-question" className={classes.askQuestionLink}>
          Ask a Question
        </Link>
        <div className={classes.welcome}>
          <h2>Welcome {user.username}</h2>
        </div>
      </div>
      <div className={classes.questionsList}>
        {questions.map((question, index) => (
          <div key={index} className={classes.question}>
            <h3>
              <Link to={`/answers/${question.questionid}`}>
                {question.title}
              </Link>
            </h3>
            <div className={classes.questionHeader}>
              <Link
                to={`/answers/${question.questionid}`}
                className={classes.usernameLink}
              >
                <VscAccount className={classes.icon} />
                {question.username}
              </Link>
              <button
                className={classes.toggleButton}
                onClick={() => toggleDescription(index)}
              >
                {showDescription[index] ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </button>
            </div>
            {showDescription[index] && <p>{question.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
