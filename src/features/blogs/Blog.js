import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectBlogById } from "./blogsApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Blog = ({ blogId }) => {
  const navigate = useNavigate();
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const handleEdit = () => navigate(`/blogs/${blogId}`);
  const { username, role } = useAuth();

  const [expanded, setExpanded] = useState(false);

  if (blog) {
    const { title, body, createdAt, user } = blog;

    // Check if blog content exceeds 200px height
    const isContentTooTall = () => {
      const contentElement = document.getElementById(`blogContent_${blogId}`);
      return contentElement && contentElement.scrollHeight > 200;
    };

    return (
      <div className="blog_wrapper box_wrapper">
        <div className="box_contents">
          <h3>{title}</h3>
          <div
            id={`blogContent_${blogId}`}
            className={expanded ? "" : "blog_content_truncate"}
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
          {isContentTooTall() && (
            <button
              className="continue_reading_button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Continue Reading..."}
            </button>
          )}
          <div className="blog_details">
            <div>
              <p>{new Date(createdAt).toLocaleDateString("en-GB")}</p>
              <p className="written_by">By: {user}</p>
            </div>
            <p>
              {(role == "Admin" || role == "Moderator") && (
                <img
                  src="edit.svg"
                  className="edit_icon"
                  onClick={handleEdit}
                />
              )}
            </p>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Blog;
