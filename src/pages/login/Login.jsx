import { useContext, useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import axios from 'axios';
import './login.css'


function Login() {
  const navigate = useNavigate()
  const [form, setform] = useState({});
  const [userData, setuserData] = useContext(UserContext); 
  const handelchange = (e) => {
    setform({...form,[e.target.name]:e.target.value})
  }
  const handelSubmit = async (e) => {
    e.preventDefault()
    try { 
      const loginUser = await axios.post('http://localhost:4000/api/users/login', {
        email: form.email,
        password:form.password
      })

      setuserData({
        token: loginUser.data.token,
        user: loginUser.data.user
      })
      localStorage.setItem('auth-token', loginUser.data.token)
      navigate('/')
      
    } catch (error) {
      alert(error.response.data.msg)
    } 
  }
  useEffect(() => {
    if (userData.user) {
      navigate('/')
    } 
  
  }, [userData, navigate])

  return (
            <div className="login">
              <div className="login_container">
                <div className="login__top">
                  <h3 className="login__title">Login to your account</h3>
                  <p>
                    Don’t have an account?
                    <Link className="login__link clear_link" to="/signup">
                      Create a new account
                    </Link>
                  </p>
                </div>
                <form onSubmit={handelSubmit}>
                  <input
                    type="text"
                    name="email"
                    onChange={handelchange}
                    placeholder="Email Address"
                  />
                  <br />
                  <input
                    type="password"
                    name="password"
                    onChange={handelchange}
                    placeholder="Password"
                  />
                  <br />
                  <Link className="forgot__link" to="/">
                    Forgot password?
                  </Link>
                  <button>Login</button>
                </form>
                <div className="login__bottom--link">
                  <Link className="login__link link-style clear_link" to="/signup">
                    Create a new account
                  </Link>
                </div>
              </div>
              <div className="login__about">
                <p className="login__about--title">About</p>
                <div className="about__detail">
                  <h1>Evangadi Newtorks Q&A</h1>
                  <p>
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a Fortune 500
                    company, you have much to offer to those who are trying to follow in
                    your footsteps.
                    <br />
                    <br />
                    Wheather you are willing to share your knowledge or you are just
                    looking to meet mentors of your own, please start by joining the
                    network here.
                  </p>
                </div>
                <button className="">HOW IT WORKS</button>
              </div>
            </div>
  );
}

export default Login
