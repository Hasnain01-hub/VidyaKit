/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { motion } from "framer-motion";

export const Home = () => {
  const [img, setImg] = useState("img1");
  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="banner">
        {img === "img1" && (
          <div className="sliding-img img1">
            <h2 className="slogan">
              Exciting courses are waiting for you!!
              <br />
              What are you waiting for?
            </h2>
            <Link to="/courses">
              <button className="btn-main btn">Enroll Now</button>
            </Link>
          </div>
        )}
        {img === "img2" && (
          <div className="sliding-img img2">
            <h2 className="slogan">
              Get the modern tech across your brain,
              <br />
              Explore series of blogs and articles here!
            </h2>
            <Link
              to="/blogs"
            >
              <button className="btn-main btn">Read Now</button>
            </Link>
          </div>
        )}
        <button
          style={
            img === "img1"
              ? { backgroundColor: "#f50057" }
              : { backgroundColor: "#fbcfe8" }
          }
          className="btn-img"
          onClick={() => setImg("img1")}
        ></button>
        <button
          style={
            img === "img2"
              ? { backgroundColor: "#f50057" }
              : { backgroundColor: "#fbcfe8" }
          }
          className="btn-img"
          onClick={() => setImg("img2")}
        ></button>
      </div>

      <h2 className="center-txt">Explore More!!</h2>
      <div className="categories-home">
        <Link
          to="/blogs"
        >
          <div className="card-category cat-img1">
            <h3>View Latest Articles & Blogs</h3>
          </div>
        </Link>
        <Link to="/courses">
          <div className="card-category cat-img2">
            <h3>View Courses</h3>
          </div>
        </Link>
      </div>

      <footer className="main-footer">
        <p>
          ?? | 2022 | <span className="pink-txt">VidyaKit</span>
        </p>
        <p className="pink-txt">VidyaKit by Dark Coders</p>

        <ul className="footer-list">
          <li>
            <a className="links" target="_blank" href="#">
              <i className="far fa-envelope"></i>
            </a>
          </li>

          <li>
            <a className="links" target="_blank" href="#">
              <i className="fab fa-github"></i>
            </a>
          </li>

          <li>
            <a className="links" target="_blank" href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              className="links"
              target="_blank"
              href="#"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </footer>
    </motion.div>
  );
};
