import { useState } from "react";
import firebase from 'firebase/compat/app';
import { useData } from "../Context";
import { NavLink,useHistory, Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';

export const Header = () => {
  const { dispatch, searchString } = useData();
  let dispath = useDispatch();
  let history = useHistory();
  const [inputSearch, setInputSearch] = useState("");
  const [toggle, setToggle] = useState(true);
  const logout = () => {
    firebase.auth().signOut();
    dispath({
      type: "LOGOUT_USER",
      payload: null,
    });
    alert("Successfully Logout");
    history.push("/");
  };
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
    <div>
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <img
              src="https://w7.pngwing.com/pngs/515/606/png-transparent-life-insurance-higher-education-school-course-company-life-purple-angle-violet.png"
              alt="Logo"
            />
            <Link to="/">
              <p className="logo-txt">VidyaKit</p>
            </Link>
          </div>
          <ul className={toggle ? "nav-menu" : "nav-menu active"}>
            <li className="nav-item">
              <NavLink
                to="/"
                end
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                className="nav-link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/courses"
                end
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                className="nav-link"
              >
                Courses
              </NavLink>
            </li>
            <div className="search">
              <div className="search-input">
                <input
                  type="text"
                  className="search-txt"
                  required
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  placeholder="Search..."
                />
                <button
                  className="flt-icon"
                  onClick={() => {
                    dispatch({ type: "SEARCH", payload: inputSearch });
                  }}
                >
                  <span>
                    <i className="fas fa-lg fa-search"></i>
                  </span>
                </button>
              </div>
              {searchString && (
                <button
                  className="btn clr-search"
                  onClick={() => {
                    setInputSearch("");
                    dispatch({ type: "CLEAR_SEARCH" });
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                to="/playlist"
              >
                PlayLists
              </NavLink>
            </li>

            {user&&  <li className="nav-item">
              <NavLink
                className="nav-link"
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
                to="/history"
              >
                History
              </NavLink>
            </li>
}
            {user&& <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/liked-videos"
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Liked Videos
              </NavLink>
            </li>
            }

{user &&   <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/saved-videos"
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Watch Later
              </NavLink>
            </li>
}
            {!user && <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/login-register'
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Login
              </NavLink>
            </li>
            }
            {user && ( <li className='nav-item' onClick={logout}>
              <NavLink
                className='nav-link'
                to='/login-register'
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Logout
              </NavLink>
            </li>
            )}

            <li className='nav-item'>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/quizes"
                activeStyle={{
                  color: "var(--dk-pink)",
                }}
              >
                Quizes
              </NavLink>
            </li>
          </li>
          </ul>
          <div
            onClick={() => setToggle(!toggle)}
            className={toggle ? "hamburger" : "hamburger active"}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
    </>
  );
};
