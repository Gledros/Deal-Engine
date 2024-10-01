import { Router } from 'express';
import airportRouter from './airport/airports.routes';

const router = Router();

router.use('/airports', airportRouter);

export default router;
