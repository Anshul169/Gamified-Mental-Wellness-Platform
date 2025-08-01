import {Router} from "express"
import {updateBadgeCount,updateScore,register,login,logout,getCurrentUser,createMeditate,getMeditate} from '../controllers/user.controller.js'
const router = Router()

// handling requests
router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.post("/update/badge-count",updateBadgeCount)
router.get("/current",getCurrentUser)
router.put("/score/update",updateScore);
router.post("/meditate/create",createMeditate);
router.post("/meditate/get",getMeditate);

export default router