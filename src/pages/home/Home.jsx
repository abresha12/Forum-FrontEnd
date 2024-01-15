import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import Display from "../Display/Display";
import axios from "axios";

import './Home.css'

function Home({Logout}) {
  const [userData, setuserData] = useContext(UserContext);
  const [allQuestions, setallQuestions] = useState([])
  const [search, setsearch] = useState('')
  const navigate=useNavigate()

  useEffect(() => {
    if (!userData.user) {
      navigate('/login')
    } 
  
  }, [userData, navigate, Logout])
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${import.meta.env.VITE_REACT_APP_base_url}/api/question`);
      // console.log(request.data.data)
      setallQuestions(request.data.data);
      return request;
    }
    fetchData();
  }, []);
  
  return (
    <div className="home">
      <div className="home__container">
      <h2>Welcome {userData.user?.display_name}</h2>
        <div className="home__header">
          <Link to="/question">Ask Question</Link>
        <div className="home__search">
          <form >
            <input type="text" name="search" onChange={(e)=> setSearch(e.target.value)} placeholder="Search questions"/>
          </form>
        </div>
        </div>

        <div className="home__questions">
          <h2>Questions</h2>
          <div className="question_content">
            {allQuestions.filter((items)=>{
              return search.toLowerCase() === '' ? items : items.question.toLowerCase().includes(search.toLowerCase());
            }).map((items)=>(
              <Display 
              key={items.question_id}
              data={items.question}
              question_id={items.question_id}
              user_id={items.user_id}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Home
