import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { VideoListing } from "./VideoListing";
import { Header } from "./Header";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";
import { PlayList } from "./Playlist";
import  Video  from "./Videos/Video";
import { History } from "./History";
import "./App.css";
import { Quiz } from "./Quizs/Quiz";
import { Home } from "./Home/Home";
import React, { useEffect} from "react";
import FlutterQuiz from "./Quizs/flutterQuiz";
import AngularQuiz from "./Quizs/angularQuiz";
import ReactQuiz from "./Quizs/reactQuiz";
import LaravelQuiz from "./Quizs/laravelQuiz";
import VueQuiz from "./Quizs/vueQuiz";
import { Link } from "react-scroll";
import Login from "./login/Login";
import Signup from "./login/register/Register";
import { db ,auth} from "./Firebase";
function App() {
  const dispatch = useDispatch();
  var separatedString1;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        await db.collection("users")
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
              type: "LOGGED_IN_USER2",
              payload: {
                name: separatedString1.name,
                email: separatedString1.email,
                token: idTokenResult.token,
                role: separatedString1.role,
                id: separatedString1.email,
              },

            })
          }).catch((error) => {
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
        <Switch>
          <Route exact path="/" component={Home }></Route>
          <Route exact path="/courses" component={VideoListing }></Route>
          <Route exact path="/courses/video/:videoId" component={Video }/>
          <Route exact path="/playlist" component={PlayList }></Route>
          <Route exact path="/quizes" component={Quiz }></Route>
          <Route exact path="/history" component={History }></Route>
          <Route exact path="/liked-videos" component={LikedVideos }></Route>
          <Route exact path="/saved-videos" component={SavedVideos }></Route>
          <Route exact path="quizes/Flutter" component={FlutterQuiz }></Route>
          <Route exact path="quizes/AngularJS" component={AngularQuiz }></Route>
          <Route exact path="quizes/React" component={ReactQuiz }></Route>
          <Route exact path="/register" component={Signup }></Route>
          <Route exact path="/login-register" component={Login }></Route>
          <Route exact path="quizes/Laravel-6" component={LaravelQuiz }></Route>
          <Route exact path="quizes/VueJS" component={VueQuiz }></Route>
        </Switch>
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
