import { toast } from 'react-toastify';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import "../login.css";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../Firebase";

const eye = <FontAwesomeIcon icon={faEye} />;
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  let history = useHistory();
  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history.push("/");
      }
    }
  }, [user, history]);

  let dispatch = useDispatch();
  const registerWithEmailAndPassword = async () => {
    try {

        if(!email && password.length < 6){
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      const idTokenResult = await user.getIdTokenResult();
      var separatedString;

      await db
        .collection("users")
        .doc(user.email)
        .set({
          name: user.email.split("@")[0],
          role: "user",
          email: user.email,
        })
        .then(async () => {
          await db
            .collection("users")
            // .where('uid', '==', user.email)
            .doc(user.email)
            .get()
            .then((doc) => {
              if (doc && doc.exists) {
                separatedString = doc.data();
                //use separatedString
              }
            })
            .catch((error) => {
              console.log(error);
            });
          dispatch({
            type: "LOGGEDIN_USER",
            payload: {
              name: user.email.split("@")[0],
              email: user.email,
              token: idTokenResult.token,
              role: separatedString.role,
              id: user.email,
              // id: res.data.id,
            },
          });
        })
        .catch();
      // history.push("/");
      console.log("hello", user);
      alert("successfully Register");
      history.push("/");
    }
    else{
        alert("Password must contained atleast 6 character");
    }
    } catch (err) {
      console.error(err);
      alert("Register Failed");
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div id="card">
          <div id="card-content">
            <div id="card-title">
              <span className="register">Register</span>
              <div class="underline-title1"></div>
            </div>
            <form  class="form">
              <label for="user-email" style={{ paddingTop: "13px" }}>
                &nbsp;Email
              </label>
              <input
                id="user-email"
                class="form-content"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <div class="form-border"></div>
              <div class="form-border"></div>
              <label for="user-email1" style={{ paddingTop: "13px" }}>
                &nbsp;Password
              </label>
              <div className="flex">
                <input
                  id="user-email1"
                  className="form-content"
                  name="email"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  autoFocus
                  type={passwordShown ? "text" : "password"}
                />
                <i
                  style={{
                    marginLeft: "auto",
                  }}
                  onClick={togglePasswordVisiblity}
                >
                  {" "}
                  {eye}
                </i>
              </div>
              <div class="form-border"></div>

              <div class="form-border"></div>
              <Button
                id="submit-btn"
                onClick={registerWithEmailAndPassword}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<SendOutlined />}
                
                size="large"
              >
                &nbsp;Register
              </Button>
              <div>
                <br />
                <span className="sig">Do you have an account? </span> &nbsp;
                <Link to="/login-register" id="signup">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Signup;
