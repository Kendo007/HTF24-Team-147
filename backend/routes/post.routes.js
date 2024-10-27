import { Router } from 'express';
import { findAllPosts, createPost, findOnePost, updatePost, deletePost, findAllByUserPosts} from '../controllers/post.cont.js';
import { verifyToken } from '../utils/verifyToken.js';

const PostRouter = Router();

PostRouter.route('/')
	.get(findAllPosts)
	.post(verifyToken, createPost);

PostRouter.route('/:id')
	.get(findOnePost)
	.put(verifyToken, updatePost)
	.delete(verifyToken, deletePost);

PostRouter.route('/:userId')
	.get(verifyToken, findAllByUserPosts);

export default PostRouter;