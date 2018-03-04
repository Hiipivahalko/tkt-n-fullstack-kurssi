import React from 'react'

const NewBlog = ({ handleSubmit, handleChange, title, author, url }) => (
  <div>
    <h2>Create new blog</h2>

    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="newTitle"
          onChange={handleChange}
        />
        <div>
          author
          <input
            type="text"
            value={author}
            name="newAuthor"
            onChange={handleChange}
          />
        </div>
        
        url
        <input
          type="text"
          value={url}
          name="newUrl"
          onChange={handleChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default NewBlog
