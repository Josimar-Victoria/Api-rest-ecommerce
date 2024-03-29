const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongoDbId')
const fs = require('fs')

// Craete un Blog  ------------------------------
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body)

    res.json({
      msg: 'successfully created Blog',
      newBlog
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Update un Blog  ------------------------------
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true
    })

    res.json({
      msg: 'successfully updated Blog',
      updateBlog
    })
  } catch (error) {
    throw new Error(error)
  }
})

// Get a Blog  ------------------------------
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)

  try {
    const getBlog = await Blog.findById(id)
      .populate('likes')
      .populate('dislikes')

    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 }
      },
      { new: true }
    )

    res.json(getBlog)
  } catch (error) {
    throw new Error(error)
  }
})

// Get all Blog  ------------------------------
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find()
    res.json(getBlogs)
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a Blog  ------------------------------
const deleteBlogs = asyncHandler(async (req, res) => {
  const { id } = req.params

  validateMongoDbId(id)
  try {
    const delteBlog = await Blog.findByIdAndDelete(id)
    res.json({ msg: 'successfully deleted blog', delteBlog })
  } catch (error) {
    throw new Error(error)
  }
})

// Like the Blog
const liketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body
  validateMongoDbId(blogId)
  // Encuentra el blog que quieres que te guste
  const blog = await Blog.findById(blogId)
  // encontrar el usuario de inicio de sesión
  const loginUserId = req?.user?._id
  // averiguar si al usuario le ha gustado el blog
  const isLiked = blog?.isLiked

  // Encuentra si al usuario no le ha gustado el blog.
  const alreadyDisliked = blog?.dislikes?.find(
    userId => userId?.toString() === loginUserId?.toString()
  )

  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false
      },
      { new: true }
    )
    res.json(blog)
  }

  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false
      },
      { new: true }
    )

    res.json(blog)
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true
      },
      { new: true }
    )

    res.json(blog)
  }
})

// Dis like the Blog
const disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body
  validateMongoDbId(blogId)
  // Encuentra el blog que quieres que te guste
  const blog = await Blog.findById(blogId)
  // encontrar el usuario de inicio de sesión
  const loginUserId = req?.user?._id
  // averiguar si al usuario le ha gustado el blog
  const isDisLiked = blog?.isDisliked
  // Encuentra si al usuario no le ha gustado el blog
  const alreadyLiked = blog?.likes?.find(
    userId => userId?.toString() === loginUserId?.toString()
  )

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false
      },
      { new: true }
    )
    res.json(blog)
  }

  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false
      },
      { new: true }
    )
    res.json(blog)
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true
      },
      { new: true }
    )
    res.json(blog)
  }
})

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  console.log(req.files)

  try {
    const uploader = path => cloudinaryUploadImg(path, 'images')
    const urls = []
    const files = req.files
    for (const file of files) {
      const { path } = file
      const newpath = await uploader(path)
      console.log(newpath)
      urls.push(newpath)
      fs.unlinkSync(path)
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map(file => {
          return file
        })
      },
      {
        new: true
      }
    )
    res.json(findBlog)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlogs,
  liketheBlog,
  disliketheBlog,
  uploadImages
}

