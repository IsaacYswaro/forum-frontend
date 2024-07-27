import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./answer.module.css";

function Answer() {
  const { questionid } = useParams();
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (questionid) {
      fetchQuestion();
      fetchAnswers();
    }
  }, [questionid]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        `/questions/questions/${questionid}`,
        config
      );
      setQuestion(response.data[0]); // Access the first element of the array
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`/answers/${questionid}`, config);
      setAnswers(response.data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answer) {
      alert("Please provide an answer.");
      return;
    }

    try {
      await axios.post(
        `/answers/${questionid}`,
        { questionid, answer },
        config
      );
      alert("Answer submitted successfully.");
      setAnswer("");
      fetchAnswers();
    } catch (error) {
      alert(error?.response?.data?.msg || "Something went wrong.");
      console.error(error.response?.data);
    }
  };

  return (
    <section className={classes.answerQuestion}>
      {question ? (
        <div className={classes.questionDetails}>
          <div>
            <h1 className={classes.question_title}>Question</h1>
            <h2>{question.title}</h2>
            <p>{question.description}</p>
          </div>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
      <div className={classes.answersList}>
        <h2>Answers from the Community</h2>
        {answers.length > 0 ? (
          answers.map((ans, index) => (
            <div key={index} className={classes.answer}>
              <p>{ans.answer}</p>
              <p>
                <strong>Answered by:</strong> {ans.username}
              </p>
            </div>
          ))
        ) : (
          <p>No answers yet. Be the first to answer!</p>
        )}
      </div>
      <h1>Answer the top question</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.text_area}>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
          />
        </div>
        <button type="submit">Post Your Answer</button>
      </form>
      <Link to="/ask-question" className={classes.askQuestionLink}>
        Ask a New Question
      </Link>
    </section>
  );
}

export default Answer;
