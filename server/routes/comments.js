import express from 'express';
import { get } from 'mongoose';
import{test,addComment, deleteComment, getComment} from '../controllers/comments.js'
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

router.post('/',verifyToken,addComment)
router.post('/:id',verifyToken,deleteComment)
router.post('/:videoId',getComment)

export default router;  