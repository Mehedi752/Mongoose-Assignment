import express, { Application, Request, Response } from 'express';
import { borrowRoutes } from './app/controllers/borrow.controller';
import { bookRoutes } from './app/controllers/books.controller';


const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to Library Management Server!');  
});


export default app; 