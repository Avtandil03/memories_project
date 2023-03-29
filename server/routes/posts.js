import express from "express";
import {getPosts, createPosts, updatePost, deletePost, likePost, getPostBySearch} from '../controller/posts.js'

import auth from "../middlewear/auth.js";
const router  = express.Router()

router.get('/', getPosts)
router.get('/search', getPostBySearch)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)


export default router