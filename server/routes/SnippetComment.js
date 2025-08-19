import express from 'express';
import { createComment, getSnippetComments, deleteComment, userComments } from '../controllers/SnippetComment.js';

const SnippetCommentRouter = express.Router();

SnippetCommentRouter.post('/create', createComment);
SnippetCommentRouter.get('/getall', getSnippetComments);
SnippetCommentRouter.get('/user/:userId', userComments);
SnippetCommentRouter.delete('/delete/:commentId', deleteComment);

export default SnippetCommentRouter;