import axios from 'axios';
import './App.css'

import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import UserContext from './context/UserContext'
import { useContext, useEffect } from 'react'
import Question from './pages/Question/Question';
import Answer from './pages/Answer/Answer';
import Header from './pages/Header/Header';

function App() {

  const [userData, setuserData] = useContext(UserContext)
 

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token')
    if (token === null) {
      localStorage.setItem('auth-token', '')
      token=''
    }
    else {
      let userRes = await axios.get('http://localhost:4000/api/users', { headers: { 'x-auth-token': token } })
      setuserData({
        token,
        user: {
          id: userRes.data.data.id,
          display_name:userRes.data.data.user_name
        }
      })
    }
  }
  const logout = () => {
    setuserData(
      {
        token: undefined,
        user:undefined,
      }
    )
    localStorage.setItem('auth-token', '')
  }

  
  useEffect(() => {
    checkLoggedIn();
  })

  return (
    <Router>
      <>
        <Header Logout={ logout}  />
        
        <Routes>
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/question' element={<Question />} />
          <Route exact path='/answer' element={<Answer />} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </>
    </Router>

  )
}

export default App
