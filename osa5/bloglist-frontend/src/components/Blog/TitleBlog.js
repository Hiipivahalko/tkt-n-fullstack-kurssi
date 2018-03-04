import React from 'react'
const TitleBlog = ({ blog, klik }) => (
  <div onClick={klik}>
    {blog.title} {blog.author}
  </div>  
)

export default TitleBlog