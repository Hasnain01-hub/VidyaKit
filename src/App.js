/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { VideoListing } from "./VideoListing";
import { Blogs } from './Blogs';
import { Header } from "./Header";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";
import { PlayList } from "./Playlist";
import Video from "./Videos/Video";
import { History } from "./History";
import "./App.css";
import { Quiz } from "./Quizs/Quiz";
import { Home } from "./Home/Home";
import React, { useEffect } from "react";
import FlutterQuiz from "./Quizs/flutterQuiz";
import AngularQuiz from "./Quizs/angularQuiz";
import ReactQuiz from "./Quizs/reactQuiz";
import LaravelQuiz from "./Quizs/laravelQuiz";
import VueQuiz from "./Quizs/vueQuiz";
import { Link } from "react-scroll";
import Login from "./login/Login";
import Signup from "./login/register/Register";
import { db, auth } from "./Firebase";
function App() {
  const dispatch = useDispatch();
  var separatedString1;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await db
          .collection("users")
          // .where('uid', '==', user.email)
          .doc(user.email)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              separatedString1 = doc.data();
              // console.log("hello data", doc.data());
              //use separatedString1
            }
            dispatch({
              type: "LOGGEDIN_USER",
              payload: {
                name: separatedString1.name,
                email: separatedString1.email,
                token: idTokenResult.token,
                role: separatedString1.role,
                id: separatedString1.email,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App" id="top">
      <Header />
      <div className="main">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/courses' element={<VideoListing />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='courses/video/:videoId' element={<Video />}></Route>
          <Route path='/playlist' element={<PlayList />}></Route>
          <Route path='/quizes' element={<Quiz />}></Route>
          <Route path='/history' element={<History />}></Route>
          <Route path='/liked-videos' element={<LikedVideos />}></Route>
          <Route path='/saved-videos' element={<SavedVideos />}></Route>
          <Route path='quizes/Flutter' element={<FlutterQuiz />}></Route>
          <Route path='quizes/AngularJS' element={<AngularQuiz />}></Route>
          <Route path='quizes/React' element={<ReactQuiz />}></Route>
          <Route path='quizes/Laravel-6' element={<LaravelQuiz />}></Route>
          <Route path='quizes/VueJS' element={<VueQuiz />}></Route>
          <Route path="/login-register" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
        </Routes>
        <Link to="top" smooth={true} duration={500}>
          <div className="btn-top badge-av">
            <div className="avatar avatar-top av-pink">
              <i className="fas fa-lg  fa-arrow-up"></i>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default App;
