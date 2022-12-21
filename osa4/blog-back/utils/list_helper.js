const blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;

  blogs.map((blog) => (likes += blog.likes));

  return likes;
};

const mostLikes = (blogs) => {
  var likes = 0;

  blogs.map((blog) => {
    if (blog.likes > likes) {
      likes = blog.likes;
    }
  });
  const blogMostLikes = blogs.find((blog) => blog.likes === likes);

  return blogMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
};
