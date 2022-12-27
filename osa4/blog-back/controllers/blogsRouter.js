const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  logger.info(request);
  const blog = await Blog.findById(request.params.id);
  response.json(blog.toJSON());
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  var likes = 0;
  if (body.likes != undefined) {
    likes = body.likes;
  }

  const blog = new Blog({
    user: user._id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON);
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };
  await Blog.findById(request.params.id);

  await Blog.findByIdAndUpdate(request.params.id, blog);
  const savedBlog = await Blog.findById(request.params.id);
  console.log("blog: ", Blog);
  console.log("savedBlog: ", savedBlog);
  console.log("requestparansid: ", request.params.id);
  response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  await Blog.findById(request.params.id);
  console.log("bloguserb", blog.user);
  if (user.id !== decodedToken.id) {
    return response
      .status(401)
      .json({ error: "Cant't delete blogs if not signed in" });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
