import React from 'react'
const Blog = ({ blog, username }) => {
  return (
    <div>
      {blog.title}, {blog.author}
    </div>
  )
}

export default Blog