import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import classes from "./ask.module.css";
import { TiArrowRight } from "react-icons/ti";


function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
const token = localStorage.getItem("token");
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description) {
      alert("Please provide all required information.");
      return;
    }

    try {
      
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post("/questions/ask", { title, description }, config);
      alert("Question submitted successfully.");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }

  return (
    <section className={classes.askQuestion}>
      <div>
        <h1>Steps to write a good question</h1>
        <br />
        <div>
          <ul>
            <TiArrowRight />
            Summarize your problem in a one-line title
            <br />
            <TiArrowRight />
            Describe your problem in more detail
            <br />
            <TiArrowRight />
            Describe what you tried and what you expected to happen
            <br />
            <TiArrowRight />
            Review your question and post it to the site
          </ul>
          <br />
        </div>
      </div>
      <h1>Ask a Public Question</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Question title"
          />
        </div>
        <div className={classes.text_area}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Question Description..."
          />
        </div>
        <button type="submit">Post Your Question</button>
      </form>
    </section>
  );
}

export default AskQuestion;
