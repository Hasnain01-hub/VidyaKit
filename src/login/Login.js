import { motion } from "framer-motion";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase/compat/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  var separatedString;

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let history = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    let intended = history;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        history("/");
      }
    }
  }, [user, history]);
  let dispatch = useDispatch();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const idTokenResult = await user.getIdTokenResult();
      //   await db.collection('users')
      //   // .where('uid', '==', user.email)
      //   .doc(user.email)
      //  .get()
      //  .then(doc => {
      //     if (doc && doc.exists) {
      //         separatedString = doc.data();
      //        //use separatedString
      //     }
      //  }).catch((error) => {
      //       console.log(error);
      //     });

      // var obj=JSON.stringify(separatedString.role);
      // const ad= obj.localeCompare("admin")===0?"admin":"user";
      //   var ad;
      //   if(obj=="admin"){
      //     ad=1;
      //   }
      // console.log("one is herw",ad)

      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            separatedString = doc.data();
            console.log("already hee", separatedString);
          } else {
            await db
              .collection("users")
              .doc(user.email)
              .set({
                name: user.email.split("@")[0],
                email: user.email,
                role: "user",
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .then(() => {
          // window.location.reload();
          alert("successfully login");
        });
      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            var separatedString1 = doc.data();
          }
          dispatch({
            type: "LOGGEDIN_USER",
            payload: {
              name: user.email.split("@")[0],
              email: user.email,
              token: idTokenResult.token,
              role: await separatedString1.role,
              id: user.email,
            },
          });
        });
    } catch (err) {
      console.error(err);
      // alert(err.message);
    }
  };
  const signInWithEmailAndPassword = async () => {
    try {
      await db
        .collection("users")
        // .where('uid', '==', user.email)
        .doc(email)
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
      var obj = JSON.stringify(separatedString.role);
      console.log("obj us hee", obj);
      const ad = "";

      console.log("ad is here", ad);

      await auth.signInWithEmailAndPassword(email, password).then((res) => {
        dispatch({
          type: "LOGGEDIN_USER",
          payload: {
            name: email.split("@")[0],
            email: email,
            // token: idTokenResult.token,
            role: obj,
            id: email,
          },
        });
      });
      alert("successfully login");
      history.push("/");
    } catch (err) {
      console.error(err);
      // alert("could'nt login");
    }
  };

  const LoginForm = () => (
    <form onSubmit={signInWithEmailAndPassword} class="form">
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
      <label for="user-password" style={{ paddingTop: "22px" }}>
        &nbsp;Password
      </label>
      <div className="flex">
        <input
          id="user-password"
          class="form-content"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={passwordShown ? "text" : "password"}
        />{" "}
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
      {/* <Link to="/forgot/password" id="signup" >
    
            <legend id="forgot-pass">Forgot password?</legend>
          </Link> */}
      <Button
        id="submit-btn"
        onClick={signInWithEmailAndPassword}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
      >
        &nbsp;Login
      </Button>
      <br />
      <div>
        <span className="sig">Don't have an account? </span> &nbsp;
        <br />
        <br />
        <Link to="/register" id="signup">
          Register
        </Link>
      </div>
      <br />
    </form>
  );
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
              <h3>Login</h3>
              <div class="underline-title"></div>
            </div>
            {LoginForm()}
            <Button
              onClick={signInWithGoogle}
              type="danger"
              className="bt1 mb-3"
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
            >
              &nbsp;Login with Google
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default Login;
