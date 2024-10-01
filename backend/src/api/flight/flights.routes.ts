import { Router } from 'express';
import {
  getFlightsController,
  getFlightsByOriginController,
  getFlightsByDestinationController,
  getFlightsByAirlineController
} from './flights.controllers';

const router = Router();

router.get('/', getFlightsController);
router.get('/origin/:iata', getFlightsByOriginController);
router.get('/destination/:iata', getFlightsByDestinationController);
router.get('/airline/:airline', getFlightsByAirlineController);

export default router;
