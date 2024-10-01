import { Router } from 'express';
import airportRouter from './airport/airports.routes';
import flightsRouter from './flight/flights.routes';

const router = Router();

router.use('/airports', airportRouter);
router.use('/flights', flightsRouter);

export default router;
