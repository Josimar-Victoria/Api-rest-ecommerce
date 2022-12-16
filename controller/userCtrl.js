const { generateToken } = require('../config/jwtToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// Create a User ----------------------------------------------
const createUser = asyncHandler(async (req, res) => {
  /**
   * TODO: Obtener el correo electrónico de req.body
   */
  const email = req.body.email
  /**
   * TODO: Con la ayuda del correo electrónico, encuentre si el usuario existe o no.
   */
  const findUser = await User.findOne({ email: email })

  if (!findUser) {
    /**
     * TODO: si el usuario no encuentra el usuario, cree un nuevo usuario
     */

    const newUser = await User.create(req.body)

    res.json({ msg: 'User successfully', success: true, newUser })
  } else {
    /**
     * TODO: si el usuario lo encuentra, muestra un error: el usuario ya existe
     */
    throw new Error('User Already Exists')
  }
})

// Login a User ----------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Verificar si el usuario existe o no
  const findUser = await User.findOne({ email: email })

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id)
    })
  } else {
    throw new Error('Invalid Credentials')
  }
})

// Update a user ----------------------------------------------
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile
      },
      {
        new: true
      }
    )

    res.json(updateUser)
  } catch (error) {
    throw new Error(error)
  }
})

// Get All Users ----------------------------------------------
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find()

    res.json(getUsers)
  } catch (error) {
    throw new Error(error)
  }
})

// Get a Single user ----------------------------------------------
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const getaUser = await User.findById(id)

    res.json({ getaUser })
  } catch (error) {
    throw new Error(error)
  }
})

// delete a User ----------------------------------------------
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params)
  const { id } = req.params
  try {
    const deleteUser = await User.findByIdAndDelete(id)

    res.json({ deleteUser })
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteUser,
  updateUser
}
