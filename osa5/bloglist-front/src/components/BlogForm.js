import React, { useState } from "react";

const BlogForm = ({ blog, changedBlog, deleteBlog, username }) => {
  const blogStyle = {
    color: "black",
    border: "solid 2px",
    padding: "5px",
    margin: "10px",
  };
  const [blogVisible, setBlogVisible] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("View");

  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };

  var showIfLogged = {
    display: blog.user[0].username === username ? "" : "none",
  };

  const toggelVisibility = () => {
    setBlogVisible(!blogVisible);
    buttonLabel === "View" ? setButtonLabel("Hide") : setButtonLabel("View");
  };

  const handleLike = () => {
    changedBlog(blog.id, {
      user: blog.user[0].id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });
  };

  const handleRemove = () => {
    if (
      window.confirm(
        `Are you sure you want to remove blog ${blog.title} by ${blog.author}?`
      )
    ) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div>
      {console.log("username: ", username)}
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author} {}
          <button onClick={toggelVisibility}>{buttonLabel}</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author} {}
          <button onClick={toggelVisibility}>{buttonLabel}</button>
          <br />
          {blog.url}
          <br />
          {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.user[0].username}
          <br />
          <div style={showIfLogged}>
            <button onClick={handleRemove}>remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
