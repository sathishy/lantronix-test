const models = require('../../models/index.js')
const bcrypt = require('bcryptjs')

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 5
 *                 description: At least one number and one letter
 *             example:
 *               username: demouser
 *               firstName: Sathish
 *               lastname: Y
 *               email: demouser@lantronix.com
 *               password: sathishy@123
 *     responses:
 *       "201":
 *         description: Created
 */
module.exports = async (req, res, next) => {
  try {

    const { username, password, email, firstName, lastName } = req.body //Request body from client

    const salt = bcrypt.genSaltSync(10)

    const passwordHash = bcrypt.hashSync(password, salt) //encrypted Hash code generation on password

    const newUser = {
      username: username,
      password: passwordHash,
      email: email,
      firstName: firstName,
      lastName: lastName
    }

    await models.User.create(newUser)
    
    //send an email here once registration has successfully completed

    return res.status(201).json({
      message: 'A verification mail has been sent to your registered mail.'
    })
  } catch (e) {
    next(e)
  }
}
