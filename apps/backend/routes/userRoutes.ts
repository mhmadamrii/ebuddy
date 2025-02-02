import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import {
  createUserData,
  deleteUserData,
  fetchUserData,
  updateUserData,
} from '../controller/api'

const router = Router()

/**
 * Route to fetch user data
 * @method POST
 * @access Protected
 */
router.post('/create-user-data', authMiddleware, createUserData)

/**
 * Route to fetch user data
 * @method GET
 * @access Protected
 */
router.get('/fetch-user-data', authMiddleware, fetchUserData)

/**
 * Route to update user data
 * @method PUT
 * @route /api/users/update-user-data
 * @access Protected (requires authMiddleware)
 */
router.put('/update-user-data/:id', authMiddleware, updateUserData)

/**
 * Route to update user data
 * @method DELETE
 * @route /api/users/update-user-data
 * @access Protected (requires authMiddleware)
 */
router.delete('/delete-user-data/:id', authMiddleware, deleteUserData)

export default router
