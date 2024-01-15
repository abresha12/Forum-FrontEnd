import { useContext, useEffect } from "react";
import UserContext  from "../../context/UserContext";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header({ Logout }) {
  const [userData,setuserData] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user]);
  return (
    <div className="header">
      <img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-home.png"alt="Evangadi logo" className="header__logo" />
      <div className="header__link">
        <Link to="" className="header__link--text clear_link">
          Home
        </Link>
        <Link to="" className="header__link--text clear_link">
          How it Works
        </Link>
        {userData.user && userData.user !== "signup" ? (
          <Link className="header__link--text clear_link" onClick={Logout}>
            Log out
          </Link>
        ) : (
          <button
            className="header__link--btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGN IN
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
