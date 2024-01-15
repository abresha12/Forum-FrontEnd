import { useContext, useState } from 'react';
import './Question.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import UserContext from '../../context/UserContext';


function Question() {

  const [userData,setuserData] = useContext(UserContext)
  
    const navigate = useNavigate();
    const [form, setForm] = useState({});
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          //sending user data to database to be logged in
          const questionAddRes = await axios.post(
            "http://localhost:4000/api/question",
            {
                question: form.title,
                question_description: form.question,
                question_code_block: "....",
                tags: "...",
                user_id:userData.user.id
            }
          );
  
          alert(questionAddRes.data.msg)
          //navigate user to homepage
          navigate("/");

        } catch (err) {
          console.log("problem", err.response.data.msg);
          alert(err.response.data.msg);
        }
      };

  return (
    <div className='question'>
        <div className="question__description">
            <h1>Steps to write a good question</h1>
            <ul>
                <li>Summarize your problem in a one-line title.</li>
                <li>Describe your problem in more detail.</li>
                <li>Describe what you tried and what you expected to happen.</li>
                <li>Review your question and post it to the site.</li>
            </ul>
        </div>
        <div className="question__form">
            <h1>Ask a public question</h1>
            <Link to="/">Go to Question page</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' onChange={handleChange} placeholder="Question Title"/><br />
                <textarea name="question" onChange={handleChange} id="" cols="60" rows="10" placeholder='Question Description...'></textarea><br />
                <button>Post Your Question</button>
            </form>
        </div>
    </div>
  )
}

export default Question;