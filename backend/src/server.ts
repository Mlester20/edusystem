//server configuration
import cookieParser from 'cookie-parser';
import express, { type Application, type Request, type Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import userRoutes from './routes/user';
import LogsRouter from './routes/activitieslog';
import { academicYearRouter } from './routes/academicYear';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


//log http requests to the console
//NODE_ENV is set to 'development' in development mode, so we only log requests in development

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)

//health check route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({status: 'OK', message: 'Server is healthy' });
});

//routes
app.use('/api/users', userRoutes);
app.use("/api/activities", LogsRouter)
app.use('/api/academic-years', academicYearRouter);

//global error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

