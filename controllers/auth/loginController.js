const models = require('../../models/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//To generate JWT token with user info
const createAuthToken = (user) => {
  return jwt.sign(
    {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        username: user.username
      }
    },
    process.env.JWT_PRIVATEKEY,
    {
      algorithm: 'HS256'
    })
}

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: username
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               username: demouser
 *               password: sathishy@123
 *     responses:
 *       "200":
 *         description: OK
 */
module.exports = async (req, res, next) => {
  try {
    const { username, password } = req.body

    //Finding the user in users table by username - i.e select * from users where username="username"
    const user = await models.User.findOne({
      where: { username: username }
    })

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            param: 'username',
            msg: 'Invalid Username!'
          }
        ]
      })
    }
    // Comparing the entered password with existing password of login user by using bcrypt module.
    if (!bcrypt.compareSync(password, user.password || '')) {
      return res.status(400).json({
        errors: [
          {
            param: 'password',
            msg: 'Invalid password!'
          }
        ]
      })
    }

    const token = createAuthToken(user)

    return res.json({
      token: token,
      user: {id: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email}
    })
  } catch (e) {
    next(e)
  }
}
