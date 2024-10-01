import { Request, Response } from 'express';
import {
  getAllAirports,
  getAirportByIATA_code,
  deleteAllAirports
} from './airports.models';
import { IAirportData } from '../../utils/interfaces';

export const getAirportsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const airports: IAirportData[] | null = await getAllAirports();
  res.status(200).json({ airports });
};

export const getAirportByIATA_codeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const airport: IAirportData | null = await getAirportByIATA_code(req.params.iata);

  if (airport) {
    res.status(200).json({ airport });
  } else {
    res.status(404).json({ message: 'Airport not found' });
  }
};

export const deleteAllAirportsController = (): void => {
  deleteAllAirports();
};
