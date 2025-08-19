import express from 'express';
import { createSnippet, getAllSnippets, deleteSnippet, getSnippetById, updateStarCount, getUserStarredSnippets, getStarCount } from '../controllers/Snippets.js';

const SnippetRouter = express.Router();

SnippetRouter.post('/create', createSnippet);
SnippetRouter.get('/getall', getAllSnippets);
SnippetRouter.delete('/delete/:sId', deleteSnippet);
SnippetRouter.get('/get/:sId', getSnippetById);
SnippetRouter.post('/star/:snippetId', updateStarCount);
SnippetRouter.get('/user/:userId/starred', getUserStarredSnippets);
SnippetRouter.get('/starcount/:snippetId', getStarCount);


export default SnippetRouter;