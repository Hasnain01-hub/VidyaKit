import { blogdata } from "../blogData";
import { motion } from "framer-motion";
import "./Blogs.css";

export const Blogs = () => {


  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="filters">
          <div>
            <ul className="categories">

              <li>All Blogs</li>

            </ul>
          </div>
        </div>
        <div className="blogs">
          {blogdata.map((blog) => {
            return (
              <a href={`${blog.url}`}>
                <div className="card">
                  <img
                    className="thumbnail"
                    src={blog.thumbnail}
                    alt={blog.name}
                  />
                  <h4>Name: {blog.name}</h4>
                  <div className="card-actions">
                    <p>Published Date: {blog.date}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};
