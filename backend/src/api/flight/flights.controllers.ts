import { Request, Response } from 'express';
import {
  getAllFlights,
  getFlightsByOrigin,
  getFlightsByDestination,
  getFlightsByAirline
} from './flights.models';
import { IFlightData } from '../../utils/interfaces';

export const getFlightsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const flights: IFlightData[] | null = await getAllFlights();
  res.status(200).json({ flights });
};

export const getFlightsByOriginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const flight: IFlightData[] | [] = await getFlightsByOrigin(req.params.iata);

  if (flight.length > 0) {
    res.status(200).json({ flight });
  } else {
    res.status(404).json({ message: 'Flights not found' });
  }
};

export const getFlightsByDestinationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const flight: IFlightData[] | [] = await getFlightsByDestination(req.params.iata);

  if (flight.length > 0) {
    res.status(200).json({ flight });
  } else {
    res.status(404).json({ message: 'Flights not found' });
  }
};

export const getFlightsByAirlineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const flight: IFlightData[] | [] = await getFlightsByAirline(req.params.airline);

  if (flight.length > 0) {
    res.status(200).json({ flight });
  } else {
    res.status(404).json({ message: 'Flights not found' });
  }
};
