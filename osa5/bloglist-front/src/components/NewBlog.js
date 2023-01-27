import React, { useState } from 'react'

const NewBlog = ({ newBlogObject }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    newBlogObject({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const addBlogForm =()=>(
  <form onSubmit={handleSubmit}>

      <div>
        Title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>Submit</button>
    </form>

  )

  return ( addBlogForm()
  )
}

export default NewBlog;