import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"



export const getPosts = async (req, res ) => {
  try {
    const postMessage = await PostMessage.find()
    res.status(200).json(postMessage)
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const createPosts = async (req, res ) => {
  const post = req.body
  const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})

  try {
    await newPostMessage.save()
    res.status(201).json(newPostMessage)
  } catch (error) {
    res.status(409).json({message: error.message})
    
  }
}

export const updatePost = async (req, res) => {
  const post = req.body
  const {id: _id} = req.params
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id:')

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
  res.json(updatedPost)
  try {
    
  } catch (error) {
    if(error){
      console.log(error);
    }
  }
}

export const deletePost = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id:')
  await PostMessage.findByIdAndRemove(id)

  res.json({message: 'Post was deleted successfully'})
}

export const likePost = async(req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id:')

  if(!req.userId) return res.json({message: 'Unauthenticated'})

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId))

  if(index === -1){
    //like post 
    post.likes.push(req.userId)
  }else{
    //dislike post
    post.likes = post.likes.filter((id) => id !== String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true})

  res.json(updatedPost)
}

