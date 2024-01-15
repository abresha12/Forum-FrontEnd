import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Answer.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Display from "../Display/Display";
import UserContext from "../../context/UserContext";

function Answer() {
  const [userData,setuserData] = useContext(UserContext)
  const [searchparams] = useSearchParams();
  const [getQuestion, setQuestion] = useState([]);
  const [form, setForm] = useState({});
  const [allAnswers, setAllAnswers] = useState([]);

  const navigate = useNavigate();
  let question_id = searchparams.get("id");
  // console.log(question_id)
  useEffect(() => {
    async function fetchData() {
      const request = await axios.post (`${import.meta.env.VITE_REACT_APP_base_url}/api/question/id`, {
        question_id: question_id,
      });
  // console.log(question_id)
      // console.log(request);
      setQuestion(request.data.data);
      return request;
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const questionAddRes = await axios.post(`${import.meta.env.VITE_REACT_APP_base_url}/api/answer`, {
        answer: form.answer,
        answer_code_block: "...",
        user_id: userData.user.id,
        question_id: question_id,
      });

      alert(questionAddRes.data.msg);
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.post(`${import.meta.env.VITE_REACT_APP_base_url}/api/answer/question_id`, {
        question_id: question_id,
    });
      // console.log(request)
      setAllAnswers(request.data.data);
      return request;
    }
    fetchData();
  }, [question_id, handleSubmit]);
  // console.log(allAnswers);

  return (
    <div className="answer">
      <div className="answer__allContainer">
        <div className="answer__container">
          {getQuestion.map((items) => (
            <div>
              <div className="answer__question">
                <h1>Questions</h1>
                <h3>{items.question}</h3>
                <p>🤔 {items.question_description}</p>
              </div>
            </div>
          ))}
          <div className="answer_title">
            <h2>Answer From The Community</h2>
            <div className="answer__view">
              {allAnswers.map((items) => (
                <Display
                  key={items.answer_id}
                  data={items.answer}
                  question_id={items.question_id}
                  user_id={items.user_id}
                  answer_view
                />
              ))}
            </div>
          </div>
        </div>
        <div className="answer__form">
          <h1>Answer The Top Question</h1>
          <Link to="/">Go to Question page</Link>
          <form onSubmit={handleSubmit}>
            <textarea
              name="answer"
              onChange={handleChange}
              id=""
              cols="60"
              rows="10"
              placeholder="Your Answer..."
            ></textarea>
            <br />
            <button>Post Your Answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
