import express from 'express';
import 'dotenv/config';
import { connectDB } from './db/connect.js';
import cors from 'cors';

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

import UserRouter from './routes/user.routes.js';
import ProjectRouter from './routes/project.routes.js';
import PostRouter from './routes/post.routes.js';
import cookieParser from 'cookie-parser';

app.use("/api/users", UserRouter);
app.use("/api/projects", ProjectRouter);
app.use("/api/posts", PostRouter);


app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});
