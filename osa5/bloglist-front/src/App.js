import { useState, useEffect } from "react";
import "./App.css"
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage"
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
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

  const addBlog = async blogObject => {
    try {
      await blogService.post(blogObject)
      console.log("add blog: ", blogObject.title)
      blogService.getAll().then(blogs => setBlogs(blogs))
      setMessage(`A new blog "${blogObject.title}" by ${blogObject.author} was added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Invalid blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
  const newBlogForm = () => <NewBlog newBlogObject={addBlog} />

  const blogsForm = () => (
    <div>
      <h2 className='Title'>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h3>Add blog</h3>
      {newBlogForm()}
<br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
   
    </div>
  );

  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <Notification message={message} />
      {user === null ? loginForm() : blogsForm()}
    </div>
  );
};

export default App;
