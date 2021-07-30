import blogService from '../services/blogs'

export const initializeBlogList = () => {
  return async (dispatch) => {
    const blogList = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogList
    })
  }
}

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlogCreated = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlogCreated
    })
  }
}

export const updateBlog = ({ id, ...blog }) => {
  return async (dispatch) => {
    const blogUpdated = await blogService.update(id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { ...blogUpdated, user: blog['user'] }
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const blogReducer = (state=[], { type, data }) => {
  switch (type) {
  case 'INIT_BLOGS': {
    return data
  }
  case 'NEW_BLOG': {
    return [...state, data]
  }
  case 'UPDATE_BLOG': {
    return state.map(
      blog => blog.id === data.id
        ? data
        : blog
    )
  }
  case 'DELETE_BLOG': {
    return state.filter(blog => blog.id !== data.id)
  }
  default:
    return state
  }
}