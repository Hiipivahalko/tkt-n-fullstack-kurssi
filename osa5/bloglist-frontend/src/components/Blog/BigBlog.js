import React from 'react'

const canYouRemove = ( blog, author, deleteThis ) => {
  const isUser = blog.user._id === author._id

  return (
    isUser ?
      <button
        onClick={deleteThis}
        value={JSON.stringify(blog)}>
        delete
      </button>
      :
      null
  )
}

const BigBlog = ({ blog, onClick, doLike, deleteThis, author }) => {


  return (
    <div onClick={onClick}>
      <p>{blog.title}</p>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} 
        <button 
          onClick={doLike}
          value={JSON.stringify(blog)} 
        >
          like
        </button>
      </p>
      <p>added by {blog.author}</p>
      
      <button
        onClick={deleteThis}
        value={JSON.stringify(blog)}>
        delete
      </button>
    </div>
  )
}

export default BigBlog