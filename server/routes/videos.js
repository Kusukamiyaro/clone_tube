import express from 'express';
import{addVideo,  deletevideo,  getvideo, updateVideo,addView, trends, random, sub, getByTag, searchByTitle} from '../controllers/videos.js'
import { verifyToken } from '../verifyToken.js';
const router = express.Router();

//create video 
router.get('/trend',trends)
router.get('/random',random)
router.get('/sub',verifyToken,sub)
router.get('/tags',getByTag)
router.get('/search',searchByTitle)
router.post('/',verifyToken,addVideo)
router.delete('/:id',verifyToken,deletevideo)
router.get('/:id',verifyToken,getvideo)
router.put('/find/:id',verifyToken,updateVideo)
router.put('/view/:id',addView)


export default router;  