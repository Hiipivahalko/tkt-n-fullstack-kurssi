import React from 'react'
import TitleBlog from './TitleBlog'
import BigBlog from './BigBlog'
/*const Blog = ({blog}) => (
  <div>
    <TitleBlog blog={blog}/>
  </div>  
)*/

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bigBlog: false
    }
  }

  makeItBig = () => {
    this.setState({ bigBlog: !this.state.bigBlog })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle} >
        {this.state.bigBlog ?
          <BigBlog
            blog={this.props.blog}
            onClick={this.makeItBig}
            doLike={this.props.doLike}
            deleteThis={this.props.deleteThis}
            author={this.props.author}
          />
          :
          <TitleBlog
            blog={this.props.blog}
            klik={this.makeItBig} />}
      </div>
    )
  }
}

export default Blog