const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  logger.info(request);
  const blog = await Blog.findById(request.params.id);
  if (blog === null) {
    response.json("no content");
  } else {
    response.json(blog.toJSON());
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  const savedBlog = await Blog.findById(request.params.id);
  response.json(savedBlog.toJSON());
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.likes) {
    body.likes = 0;
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog.toJSON);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const savedBlog = await Blog.findById(request.params.id);

  if (savedBlog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: "Cant't delete blogs if not signed in" });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
