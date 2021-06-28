const blog = require('../models/blog')

const dummy = blogs => 1

const totalLikes = blogs => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}
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
const mostBlogs = blogs => {
  if (blogs.length === 0) return {}
  let mostBlogsAuthor
  const reducer = (blogsPerAuthor, blog) => {
    const author = blog.author
    if (!blogsPerAuthor[author]) {
      blogsPerAuthor[author] = 1
      mostBlogsAuthor = { author: author, blogs: blogsPerAuthor[author] }
    } else {
      blogsPerAuthor[author]++
      if (blogsPerAuthor[author] > mostBlogsAuthor.blogs) {
        mostBlogsAuthor = { author: author, blogs: blogsPerAuthor[author] }
      }
    }
    return blogsPerAuthor
  }
  blogs.reduce(reducer, {})
  return mostBlogsAuthor
}

const mostLikes = blogs => {
  if (blogs.length === 0) return {}
  let mostLikesBlog
  const reducer = (likesPerAuthor, blog) => {
    const author = blog.author
    if (!likesPerAuthor[author]) {
      likesPerAuthor[author] = blog.likes
      mostLikesBlog = { author: author, likes: blog.likes }
    } else {
      likesPerAuthor[author] += blog.likes
      if (likesPerAuthor[author] > mostLikesBlog.likes) {
        mostLikesBlog = { author: author, likes: likesPerAuthor[author] }
      }
    }
    return likesPerAuthor
  }
  blogs.reduce(reducer, {})
  return mostLikesBlog
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
