import {Router} from "express";
import {createUserData, fetchUserData, updateUserData} from "../controller/api";
import {authMiddleware} from "../middleware/authMiddleware";

const router = Router();

/**
 * Route to fetch user data
 * @method POST
 * @access Protected
 */
router.post("/create-user-data", authMiddleware, createUserData);

/**
 * Route to fetch user data
 * @method GET
 * @access Protected
 */
router.get("/fetch-user-data", authMiddleware, fetchUserData);

/**
 * Route to update user data
 * @method PUT
 * @route /api/users/update-user-data
 * @access Protected (requires authMiddleware)
 */
router.put("/update-user-data", authMiddleware, updateUserData);

export default router;
