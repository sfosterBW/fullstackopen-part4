const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "donkey",
        "author": "me",
        "url": "www.news.com",
        "likes": 1276,
    },
    {
        "title": "donkey",
        "author": "me",
        "url": "www.news.com",
        "likes": 1276,
    }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willdelete',
    author: 'me',
    url: 'www',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb }