const dummy = blogs => 1

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) { return {} }
  const reducer = (mostLikedBlog, blog) => {
    return blog.likes >= mostLikedBlog.likes
      ? {
          title: blog.title,
          author: blog.author,
          likes: blog.likes
        }
      : mostLikedBlog
  }

  return blogs.reduce(reducer, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
