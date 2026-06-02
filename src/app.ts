import express from 'express';
import cors from 'cors';
import usersRoutes from './modules/users/routes/users.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);

export default app;