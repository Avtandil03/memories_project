import express from "express";
import {getPosts, createPosts, updatePost, deletePost, likePost, getPostBySearch, getPostById, commentPost} from '../controller/posts.js'

import auth from "../middlewear/auth.js";
const router  = express.Router()


router.get('/', getPosts)
router.get('/search', getPostBySearch)
router.get('/:id', getPostById)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', commentPost)


export default router