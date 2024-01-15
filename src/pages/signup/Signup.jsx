import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import './Signup.css'

function Signup() {
  const [userData,setuserData] = useContext(UserContext)
  const [form, setform] = useState({})
  const navigate = useNavigate()
  const handelChange = (e) => {
     setform({...form,[e.target.name]:e.target.value})
   }
   const handelSubmit = async (e) => {
     e.preventDefault()
    try {
       
     const regiUser = await axios.post(`${import.meta.env.VITE_REACT_APP_base_url}/api/users`, {
      firstName: form.firstName,
      lastName: form.lastName,
      userName: form.userName||`${form.fName}.${form.lName}`,
      email: form.email,
      password:form.password
    })

    setuserData({
      token: regiUser.data.token,   
      user:  regiUser.data.user
    })
      localStorage.setItem('auth-token', regiUser.data.token)
      navigate('/')
    } catch (error) {
      alert(error.response.data.msg)
      
    }

   } 

  return (

    <div className="signup">
    <div className="signup_container">
      <div className="signup__top">
        <h3 className="signup__title">Join the network</h3>
        <p>
          Already have an account?
          <Link className="login__link clear_link" to="/login">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="email"
          onChange={handelChange}
          placeholder="Email Address"
        />
        <br />
        <div className="signup__name">
          <input
            type="text"
            name="firstName"
            onChange={handelChange}
            placeholder="First Name"
          />
          <br />
          <input
            type="text"
            name="lastName"
            onChange={handelChange}
            placeholder="Last Name"
          />
        </div>
        <br />
        <input
          type="text"
          name="userName"
          onChange={handelChange}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          onChange={handelChange}
          placeholder="Password"
        />
        <br />
        <p>
          I agree to the <Link to="/">privacy policy</Link> and{" "}
          <Link to="/"> terms of service</Link>.
        </p>
        <br />
        <button>Agree and Join</button>
      </form>
    </div>
    <div className="signup__about">
      <p className="signup__about--title">About</p>
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
  )
}

export default Signup;
