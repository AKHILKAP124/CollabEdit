import express from 'express';
import { createUser, getUserData, updateUserToProUser } from '../controllers/User.js';

const UserRouter = express.Router();

UserRouter.post('/register', createUser);
UserRouter.post('/getdata', getUserData);
UserRouter.post('/updateToProUser', updateUserToProUser);


export default UserRouter;