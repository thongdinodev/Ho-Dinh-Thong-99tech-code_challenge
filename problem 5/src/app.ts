import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';

import userRouter from './routes/userRoutes';

const app = express();

const mongoDBUrl = 'mongodb://localhost:27017/testUserDB';

mongoose.connect(mongoDBUrl).then(() => {
    console.log('Success connect to monogoDB');
    
}).catch((err) => {
    console.log(err);
});

app.use(json());

app.use('/api/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(3000, () => {
    console.log('Server is running on port: 3000');
});