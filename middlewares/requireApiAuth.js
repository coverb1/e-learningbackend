import { getAuth } from '@clerk/express'

// check if user is logged in
export const requireApiAuth = (req, res, next) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please send a valid Clerk Bearer token.'
    })
  }

  next()
}