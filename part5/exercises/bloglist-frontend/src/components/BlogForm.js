import React from 'react'

export const BlogForm = ({handleSubmit, title, author, url,handleTitleChange, handleAuthorChange, handleUrlChange}) => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
          <div> title:   
            <input 
              type='text'
              value={title}
              name='title'
              onChange={handleTitleChange}
            />
          </div>
          <div> author:   
            <input 
              type='author'
              value={author}
              name='author'
              onChange={handleAuthorChange}
            />
          </div>
          <div> url:   
            <input 
              type='text'
              value={url}
              name='url'
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
    )