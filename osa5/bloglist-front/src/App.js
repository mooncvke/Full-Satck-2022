import { useState, useEffect } from "react";
import "./App.css";
import BlogForm from "./components/BlogForm";
import NewBlog from "./components/NewBlog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  //Sort the blogs by most likes
  blogs.sort((a, b) => b.likes - a.likes);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogsListUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (expection) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    console.log("logging with ", username, password);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      await blogService.post(blogObject);
      blogService.getAll().then((blogs) => setBlogs(blogs));
      setMessage(
        `A new blog "${blogObject.title}" by ${blogObject.author} was added`
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Invalid blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const newBlogForm = () => {
    const hideWhenVisible = { display: createVisible ? "none" : "" };
    const showWhenVisible = { display: createVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>
            create a new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <NewBlog newBlogObject={addBlog} />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const changeBlog = (id, blogObject) => {
    try {
      blogService.update(id, blogObject);
      console.log("updated: ", blogObject.title);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (expection) {
      console.log("Error updating blog! Error:", expection);
    }
  };

  const deleteBlog = async (id) => {
    await blogService.remove(id);
    console.log("blog deleted: ", id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification message={message} />
        <ErrorMessage message={errorMessage} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2 className="Title">Blogs</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={message} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h3>Add blog</h3>
      {newBlogForm()}
      <br />
      {blogs.sort}
      {blogs.map((blog) => (
        <BlogForm
          key={blog.id}
          blog={blog}
          username={user.username}
          changedBlog={changeBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
