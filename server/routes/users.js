import express from 'express';
import{deleteUser, update, getUser, subscribe, like, unSubscribe, dislike} from '../controllers/users.js'
import { verifyToken } from '../verifyToken.js';
const router = express.Router();
//update user
router.put("/:id",verifyToken,update)
//delete
router.delete("/:id",verifyToken,deleteUser)
//get user
router.get("/find/:id",getUser)
//subscribe
router.put("/sub/:id",verifyToken,subscribe)
//unsubscribe
router.put("/unsub/:id",verifyToken,unSubscribe)

//like
router.put("/like/:videoId",verifyToken,like)
//dislike
router.put("/dislike/:id",verifyToken,dislike)












export default router;  

