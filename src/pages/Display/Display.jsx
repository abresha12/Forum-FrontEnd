import axios from "axios";
import "./Display.css";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

function Display({data, question_id, user_id,answer_view}) {
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`http://localhost:4000/api/users/${user_id}`);
      // console.log(user_id)
      // console.log(request);
      setName(request.data.data.user_name);
      return request;
    }
    fetchData();
  }, []);

  const openAnswersPage = (id) => {
    navigate({
      pathname: "/answer",
      search: createSearchParams({
        id: question_id,
      }).toString(),
    });
  };
  return (
    <div className="display" onClick={()=>openAnswersPage(question_id)}>
      <div className="display__container">
        <div className="avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="user"
          />
          <h4>{name }</h4>
        </div>
        <div className="question">
          {!answer_view ? <h3>{data}</h3> : <p>{data}</p>}
          
        </div>
      </div>
      {!answer_view ? <button className="right__arrow" >see answer</button> : ""}
      {/* <ArrowForwardIosIcon  /> */}
    </div>
  );
}

export default Display;
