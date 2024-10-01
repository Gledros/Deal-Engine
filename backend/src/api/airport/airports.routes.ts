import { Router } from 'express';
import {
  getAirportsController,
  getAirportByIATA_codeController,
  deleteAllAirportsController
} from './airports.controllers';

const router = Router();

router.get('/', getAirportsController);
router.get('/:iata', getAirportByIATA_codeController);
router.delete('/', deleteAllAirportsController);

export default router;
