const logger = require("./logger");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.map((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  if (blogs === null) {
    logger.info("Empty blog list");
    return;
  }
  let favorite = blogs[0];
  blogs.map((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });
  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
