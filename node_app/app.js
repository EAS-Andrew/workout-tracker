import express from 'express'

import { initialiseDB } from './db';
import registerRoutes from './routes'

const app = express()
app.use(express.json())
registerRoutes(app)
app.listen(3001)

initialiseDB();
